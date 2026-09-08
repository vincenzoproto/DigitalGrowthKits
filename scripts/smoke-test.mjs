import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createServer } from "node:http";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { setTimeout as delay } from "node:timers/promises";

// Run after `npm run build`. All requests stay on loopback; no real email,
// payment session, or CRM record is created.
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(import.meta.url);
const capturedRequests = [];
let webhookStatus = 200;
let app;
let appFailure;
let appOutput = "";

const webhook = createServer(async (request, response) => {
  try {
    let body = "";
    for await (const chunk of request) body += chunk;
    capturedRequests.push(JSON.parse(body));
    response.writeHead(webhookStatus, { "content-type": "application/json" });
    response.end(JSON.stringify({ ok: webhookStatus === 200 }));
  } catch {
    response.writeHead(400);
    response.end();
  }
});

async function listen(server) {
  await new Promise((resolveListen, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolveListen);
  });
  return server.address().port;
}

async function close(server) {
  if (!server.listening) return;
  server.closeAllConnections();
  await new Promise((resolveClose) => server.close(resolveClose));
}

async function stopApp() {
  if (!app?.pid || app.exitCode !== null || app.signalCode !== null) return;
  await new Promise((resolveStop) => {
    const timeout = setTimeout(() => app.kill("SIGKILL"), 3_000);
    app.once("exit", () => {
      clearTimeout(timeout);
      resolveStop();
    });
    app.kill("SIGTERM");
  });
}

try {
  const webhookPort = await listen(webhook);
  const portReservation = createServer();
  const appPort = await listen(portReservation);
  await close(portReservation);
  const origin = `http://127.0.0.1:${appPort}`;

  app = spawn(process.execPath, [require.resolve("next/dist/bin/next"), "start", "-H", "127.0.0.1", "-p", String(appPort)], {
    cwd: root,
    env: {
      ...process.env,
      NODE_ENV: "production",
      NEXT_TELEMETRY_DISABLED: "1",
      STRIPE_SECRET_KEY: "",
      RESEND_API_KEY: "",
      RESEND_FROM: "",
      SETUP_REQUEST_WEBHOOK_URL: `http://127.0.0.1:${webhookPort}/setup-request`,
    },
    stdio: ["ignore", "pipe", "pipe"],
  });
  for (const stream of [app.stdout, app.stderr]) {
    stream.on("data", (chunk) => { appOutput = (appOutput + chunk).slice(-8_000); });
  }
  app.on("error", (error) => { appFailure = error; });
  app.on("exit", (code, signal) => {
    appFailure = new Error(`Next exited (${signal || code})`);
  });

  async function request(path, options = {}) {
    assert.ok(path.startsWith("/") && !path.startsWith("//"), "Only local paths are allowed");
    return fetch(`${origin}${path}`, { ...options, redirect: "manual", signal: AbortSignal.timeout(5_000) });
  }

  const deadline = Date.now() + 30_000;
  let ready = false;
  while (Date.now() < deadline) {
    if (appFailure) throw appFailure;
    try {
      const response = await fetch(`${origin}/audit`, {
        redirect: "manual",
        signal: AbortSignal.timeout(Math.min(1_000, deadline - Date.now())),
      });
      await response.arrayBuffer();
      if (response.status === 200) { ready = true; break; }
    } catch {
      // The listening socket may not be ready yet.
    }
    await delay(Math.min(200, Math.max(0, deadline - Date.now())));
  }
  assert.ok(ready, "Next did not become ready within 30 seconds");

  for (const path of ["/audit", "/it/audit", "/it/partner"]) {
    const response = await request(path);
    assert.equal(response.status, 200, `${path} must render successfully`);
    await response.arrayBuffer();
  }
  console.log("PASS: English/Italian audit and public partner pages render");

  const referral = "smoke_partner-42";
  const landing = await request(`/audit?ref=${referral}`);
  const savedCookie = landing.headers.getSetCookie().find((value) => value.startsWith("guestflow-ref="));
  assert.ok(savedCookie, "The referral landing must save an attribution cookie");
  assert.equal(savedCookie.split(";")[0], `guestflow-ref=${referral}`);
  assert.match(savedCookie, /HttpOnly/i);
  assert.match(savedCookie, /SameSite=Lax/i);
  await landing.arrayBuffer();
  const cookie = savedCookie.split(";")[0];

  for (const product of ["guest-inbox-pro", "digital-guest-concierge", "repeat-guest-engine", "direct-booking-engine", "repeat-guest-engine-founder"]) {
    const response = await request(`/buy/${product}`, { headers: { cookie } });
    assert.equal(response.status, 307, `${product} should redirect to its Payment Link`);
    const destination = new URL(response.headers.get("location"));
    assert.equal(destination.origin, "https://book.stripe.com");
    assert.equal(destination.searchParams.get("client_reference_id"), referral);
    assert.match(response.headers.get("cache-control") || "", /no-store/);
    await response.arrayBuffer();
  }
  for (const suffix of ["", "?ref=bad%20ref", `?ref=${"x".repeat(41)}`]) {
    const response = await request(`/buy/repeat-guest-engine-founder${suffix}`);
    const destination = new URL(response.headers.get("location"));
    assert.equal(destination.searchParams.has("client_reference_id"), false, "Direct or invalid codes must not reach Stripe");
    await response.arrayBuffer();
  }
  const explicit = await request("/buy/repeat-guest-engine-founder?ref=new_partner", { headers: { cookie } });
  assert.equal(new URL(explicit.headers.get("location")).searchParams.get("client_reference_id"), "new_partner");
  await explicit.arrayBuffer();
  console.log("PASS: Partner attribution survives navigation and checkout redirects, including Founder");

  const syntheticLead = {
    product: "Repeat Guest Engine",
    propertyName: "Synthetic smoke-test property",
    propertyType: "Hotel",
    contactName: "Automated local test",
    email: "smoke@example.invalid",
    notes: "Synthetic data for the local mock webhook only.",
  };
  const submit = (data) => request("/api/setup-request", {
    method: "POST",
    headers: { "content-type": "application/json", cookie },
    body: JSON.stringify(data),
  });
  const submitted = await submit(syntheticLead);
  assert.equal(submitted.status, 200);
  const delivered = await submitted.json();
  assert.equal(delivered.ok, true);
  assert.equal(delivered.channel, "webhook");
  assert.equal(delivered.referral, referral);
  assert.equal(capturedRequests.length, 1);
  assert.equal(capturedRequests[0].email, syntheticLead.email);
  assert.equal(capturedRequests[0].referral, referral, "Saved attribution must reach lead delivery");

  const invalid = await submit({ product: syntheticLead.product });
  assert.equal(invalid.status, 400);
  assert.equal((await invalid.json()).ok, false);
  assert.equal(capturedRequests.length, 1, "Invalid leads must not reach the delivery provider");

  webhookStatus = 503;
  const failed = await submit(syntheticLead);
  assert.equal(failed.status, 502);
  const failure = await failed.json();
  assert.equal(failure.ok, false);
  assert.equal(failure.code, "DELIVERY_FAILED");
  assert.equal(failure.referral, referral, "Manual fallback needs the saved partner code");
  assert.equal(capturedRequests.length, 2);
  console.log("PASS: Lead validation, mock delivery, attribution and truthful delivery failures");

  for (const [sessionId, expected] of [["invalid", /find this payment/i], ["cs_live_smokeTestOnly123", /verification is unavailable/i]]) {
    const response = await request(`/success?session_id=${sessionId}`);
    assert.equal(response.status, 200);
    const html = await response.text();
    const heading = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1] || "";
    assert.match(heading, expected);
    assert.doesNotMatch(heading, /booked|payment confirmed|order is confirmed/i);
  }
  console.log("PASS: Invalid or unverifiable sessions never confirm a booking");
  console.log("Production HTTP smoke test passed. No external services were called.");
} catch (error) {
  console.error(error);
  if (appOutput) console.error(appOutput);
  process.exitCode = 1;
} finally {
  await stopApp();
  await close(webhook);
}
