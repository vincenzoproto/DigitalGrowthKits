import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createServer } from "node:http";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { setTimeout as delay } from "node:timers/promises";
import { INDEXABLE_PATHS, languageAlternates } from "../lib/seo.ts";

// Run after `npm run build`. All requests stay on loopback; no real email,
// payment session, or CRM record is created.
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(import.meta.url);
const capturedRequests = [];
let webhookStatus = 200;
let app;
let appFailure;
let appOutput = "";

function decodeHtml(value) {
  const named = { amp: "&", quot: '"', apos: "'", lt: "<", gt: ">" };
  return value.replace(/&(#x[\da-f]+|#\d+|amp|quot|apos|lt|gt);/gi, (entity, code) => {
    if (code.startsWith("#x")) return String.fromCodePoint(parseInt(code.slice(2), 16));
    if (code.startsWith("#")) return String.fromCodePoint(parseInt(code.slice(1), 10));
    return named[code.toLowerCase()] || entity;
  });
}

function attributes(tag) {
  return Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*(["'])(.*?)\2/g)]
    .map(([, name, , value]) => [name.toLowerCase(), decodeHtml(value)]));
}

function metadataFrom(html) {
  const links = [...html.matchAll(/<link\b[^>]*>/gi)].map(([tag]) => attributes(tag));
  const meta = [...html.matchAll(/<meta\b[^>]*>/gi)].map(([tag]) => attributes(tag));
  return {
    title: decodeHtml(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || ""),
    description: meta.find((item) => item.name === "description")?.content || "",
    canonicals: links.filter((link) => link.rel === "canonical").map((link) => link.href),
    languages: Object.fromEntries(links.filter((link) => link.rel === "alternate" && link.hreflang)
      .map((link) => [link.hreflang, link.href])),
    openGraph: Object.fromEntries(meta.filter((item) => item.property?.startsWith("og:"))
      .map((item) => [item.property, item.content])),
    robots: meta.find((item) => item.name === "robots")?.content || "",
    htmlLang: attributes(html.match(/<html\b[^>]*>/i)?.[0] || "").lang,
  };
}

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

  const publicOrigin = "https://www.guestflowsystems.com";
  // Next serializes the origin-only homepage without the optional trailing
  // slash. Compare parsed absolute URLs while retaining path/query checks.
  const absoluteUrl = (url) => new URL(url).href;
  const absoluteAlternates = (values) => Object.fromEntries(Object.entries(values || {}).map(([language, url]) => [language, absoluteUrl(url)]));
  const pageTitles = [];
  const pageDescriptions = [];
  let homeHtml = "";
  for (const path of INDEXABLE_PATHS) {
    const response = await request(path, { headers: { "accept-language": "en" } });
    assert.equal(response.status, 200, `${path} must render successfully without a redirect`);
    const html = await response.text();
    if (path === "/") homeHtml = html;
    const metadata = metadataFrom(html);
    const expectedCanonical = `${publicOrigin}${path}`;
    assert.deepEqual(metadata.canonicals.map(absoluteUrl), [expectedCanonical], `${path} must have exactly one self canonical`);
    assert.ok(metadata.title.trim().length > 8, `${path} needs a page title`);
    assert.ok(metadata.description.trim().length > 25, `${path} needs a page description`);
    pageTitles.push(metadata.title);
    pageDescriptions.push(metadata.description);
    assert.equal(absoluteUrl(metadata.openGraph["og:url"]), expectedCanonical, `${path} needs its own social URL`);
    assert.equal(metadata.openGraph["og:title"], metadata.title, `${path} needs its own social title`);
    assert.equal(metadata.openGraph["og:description"], metadata.description, `${path} needs its own social description`);
    assert.equal(metadata.htmlLang, path === "/it" || path.startsWith("/it/") ? "it" : "en", `${path} must use the correct document language`);
    assert.deepEqual(absoluteAlternates(metadata.languages), absoluteAlternates(languageAlternates(path)), `${path} must declare only its real reciprocal translations`);
    assert.doesNotMatch(metadata.robots, /noindex/i, `${path} is a public indexable page`);
  }
  assert.equal(new Set(pageTitles).size, INDEXABLE_PATHS.length, "Public pages must not inherit duplicate homepage titles");
  assert.equal(new Set(pageDescriptions).size, INDEXABLE_PATHS.length, "Public pages need distinct descriptions");

  const sitemapResponse = await request("/sitemap.xml");
  assert.equal(sitemapResponse.status, 200);
  const sitemap = await sitemapResponse.text();
  const sitemapUrls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(([, url]) => decodeHtml(url));
  assert.deepEqual(sitemapUrls.sort(), INDEXABLE_PATHS.map((path) => `${publicOrigin}${path}`).sort());
  assert.ok(sitemapUrls.includes(`${publicOrigin}/it/partner`), "The Italian partner page must be discoverable");
  assert.doesNotMatch(sitemap, /\/founder|\/success/, "Private checkout flows must stay out of the sitemap");
  const robotsResponse = await request("/robots.txt");
  assert.equal(robotsResponse.status, 200);
  assert.match(await robotsResponse.text(), /Sitemap: https:\/\/www\.guestflowsystems\.com\/sitemap\.xml/);

  const structuredData = [...homeHtml.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)]
    .filter(([, tag]) => attributes(tag).type === "application/ld+json")
    .flatMap(([, , json]) => JSON.parse(json));
  const organization = structuredData.find((item) => item["@type"] === "Organization");
  assert.ok(organization, "The homepage must identify the GuestFlow organization");
  assert.equal(organization.name, "GuestFlow Systems");
  assert.equal(organization.email, "info@vincenzoproto.com");
  assert.equal(organization.contactPoint.email, "info@vincenzoproto.com");
  const logo = new URL(typeof organization.logo === "string" ? organization.logo : organization.logo.url);
  assert.equal(logo.origin, publicOrigin, "The organization logo must identify a public site asset");
  const logoResponse = await request(logo.pathname);
  assert.equal(logoResponse.status, 200, "The structured-data logo must exist");
  assert.match(logoResponse.headers.get("content-type") || "", /image\/svg\+xml/);
  assert.match(await logoResponse.text(), /<svg\b/);
  console.log(`PASS: ${INDEXABLE_PATHS.length} public pages, self canonicals, language metadata, sitemap and organization logo`);

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
