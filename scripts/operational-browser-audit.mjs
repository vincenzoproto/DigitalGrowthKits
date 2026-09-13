import assert from 'node:assert/strict';
import { spawn, execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { mkdir, appendFile } from 'node:fs/promises';
import { setTimeout as delay } from 'node:timers/promises';

// Candidate browser tests: no real provider credentials, requests or payments.
const require = createRequire(import.meta.url);
const origin = 'http://127.0.0.1:3999';
const session = 'guestflow-operational-qa';
let output = '';
let failures = 0;
const app = spawn(process.execPath, [require.resolve('next/dist/bin/next'), 'start', '-H', '127.0.0.1', '-p', '3999'], {
  env: { ...process.env, STRIPE_SECRET_KEY: '', RESEND_API_KEY: '', RESEND_FROM: '', SETUP_REQUEST_WEBHOOK_URL: '', NEXT_TELEMETRY_DISABLED: '1' },
  stdio: ['ignore', 'pipe', 'pipe'],
});
app.stdout.on('data', (data) => { output = (output + data).slice(-12000); });
app.stderr.on('data', (data) => { output = (output + data).slice(-12000); });
function browser(...args) {
  const text = execFileSync('agent-browser', ['--session', session, ...args], { encoding: 'utf8', timeout: 45000 });
  console.log(text.trim());
  return text;
}
async function record(message) {
  console.log(`PASS: ${message}`);
  await appendFile('reports/guestflow-browser-audit.md', `- PASS: ${message}\n`);
}
async function check(name, fn) {
  try { await fn(); } catch (error) {
    failures++;
    console.error(`BLOCKED ${name}: ${error.message}`);
    await appendFile('reports/guestflow-browser-audit.md', `- BLOCKED ${name}: ${error.message}\n`);
    for (const command of ['snapshot', 'errors', 'console']) {
      try { browser(command); } catch {}
    }
  }
}
async function waitFor(expression, description) {
  const deadline = Date.now() + 5000;
  do {
    if (browser('eval', `Boolean(${expression}) ? 'GF_READY' : 'GF_WAIT'`).includes('GF_READY')) return;
    await delay(200);
  } while (Date.now() < deadline);
  throw new Error(description);
}
async function clickVisible(selector) {
  // Avoid racing the site's smooth page scroll with the browser's coordinate
  // click. This changes only the viewport, not React state or event handlers.
  browser('eval', `document.querySelector(${JSON.stringify(selector)}).scrollIntoView({behavior:'instant',block:'center'})`);
  await delay(250);
  browser('snapshot', '-i');
  browser('click', selector);
}
try {
  await mkdir('reports', { recursive: true });
  await appendFile('reports/guestflow-browser-audit.md', '# Candidate build: browser checks\n\nOnly local credentials-free rendering and interactions are checked. This is not a live payment or email/CRM test. Browser states are awaited; screenshots require visual review.\n\n');
  let ready = false;
  for (let i = 0; i < 60; i++) {
    if (app.exitCode !== null) throw new Error(`Local app exited: ${app.exitCode}`);
    try { const res = await fetch(origin, { signal: AbortSignal.timeout(1000) }); if (res.ok) { ready = true; break; } } catch {}
    await delay(500);
  }
  assert.ok(ready, 'Local build did not become ready');
  browser('--version');
  for (const [label, width, height] of [['desktop', 1440, 1000], ['mobile', 390, 844]]) {
    browser('set', 'viewport', String(width), String(height));
    for (const path of ['/', '/it', '/request-setup', '/it/request-setup', '/it/partner']) {
      await check(`${label} ${path}`, async () => {
        browser('open', `${origin}${path}`);
        browser('wait', '--load', 'networkidle');
        browser('snapshot', '-i');
        const expectedLang = path.startsWith('/it') ? 'it' : 'en';
        browser('eval', `(() => { if(document.documentElement.lang !== '${expectedLang}') throw new Error('Wrong document language'); if(!document.querySelector('h1')?.textContent.trim()) throw new Error('Missing H1'); if(document.documentElement.scrollWidth > innerWidth + 1) throw new Error('Page overflows viewport: '+document.documentElement.scrollWidth+' > '+innerWidth); return 'Language, heading and viewport checks passed'; })()`);
        await record(`${label} ${path}: rendered heading, correct language, no document-wide horizontal overflow`);
        if (path === '/it') {
          browser('screenshot', `reports/guestflow-${label}-it.png`, '--full');
          for (const expected of [2, 3, 1]) {
            await clickVisible('.guided-demo-next');
            await waitFor(`document.querySelector('.guided-demo-step:nth-child(${expected})')?.getAttribute('aria-pressed') === 'true'`, `Demo did not reach step ${expected} within 5 seconds`);
            browser('snapshot', '-i');
          }
          await record(`${label}: Italian guided demo advances 1-2-3 and restarts after real button clicks`);
        }
      });
    }
  }
  await check('Local form submission with no providers', async () => {
    browser('open', `${origin}/request-setup`);
    browser('wait', '--load', 'networkidle');
    browser('snapshot', '-i');
    browser('fill', 'input[placeholder="Hotel / B&B name"]', 'Local synthetic QA property');
    browser('fill', 'input[placeholder="Name and role"]', 'Local QA only');
    browser('fill', '.setup-form input[type="email"]', 'qa@example.invalid');
    browser('check', '.form-consent input');
    await clickVisible('.setup-form button[type="submit"]');
    await waitFor(`document.querySelector('.setup-status.fallback')`, 'Form did not show fallback within 5 seconds');
    browser('eval', `(() => { const status = document.querySelector('.setup-status.fallback')?.textContent || ''; if(!status.includes('not been sent')) throw new Error('Missing truthful failure message'); if(document.querySelector('.setup-form button[type="submit"]').disabled) throw new Error('Submit button remained disabled'); return 'Missing provider produces a truthful manual-email fallback'; })()`);
    await record('Local form without credentials shows NOT SENT, restores submit button, does not silently open email');
    browser('screenshot', 'reports/guestflow-mobile-fallback.png', '--full');
  });
  if (failures) process.exitCode = 1;
} catch (error) {
  console.error(error);
  console.error(output);
  await mkdir('reports', { recursive: true });
  await appendFile('reports/guestflow-browser-audit.md', `\nBLOCKED: ${error.message}\n`);
  process.exitCode = 1;
} finally {
  try { browser('close'); } catch {}
  if (app.exitCode === null) {
    app.kill('SIGTERM');
    await Promise.race([new Promise((resolve) => app.once('exit', resolve)), delay(3000)]);
    if (app.exitCode === null) app.kill('SIGKILL');
  }
}
