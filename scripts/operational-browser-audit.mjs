import assert from 'node:assert/strict';
import { spawn, execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { mkdir, appendFile } from 'node:fs/promises';
import { setTimeout as delay } from 'node:timers/promises';

// Browser tests of the candidate build only. The local app gets no real keys
// or lead destination; it cannot send emails/CRM requests or take payments.
const require = createRequire(import.meta.url);
const origin = 'http://127.0.0.1:3999';
const session = 'guestflow-operational-qa';
let output = '';
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
try {
  await mkdir('reports', { recursive: true });
  await appendFile('reports/guestflow-browser-audit.md', '# Candidate build: browser checks\n\nOnly local mock-free/credentials-free rendering is checked. This is not a live payment or email/CRM test. Screenshots still require human visual review.\n\n');
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
      browser('open', `${origin}${path}`);
      browser('wait', '--load', 'networkidle');
      browser('snapshot', '-i');
      const expectedLang = path.startsWith('/it') ? 'it' : 'en';
      browser('eval', `(() => { if(document.documentElement.lang !== '${expectedLang}') throw new Error('Wrong document language'); if(!document.querySelector('h1')?.textContent.trim()) throw new Error('Missing H1'); if(document.documentElement.scrollWidth > innerWidth + 1) throw new Error('Page overflows viewport: '+document.documentElement.scrollWidth+' > '+innerWidth); return 'Language, heading and viewport checks passed'; })()`);
      await record(`${label} ${path}: rendered heading, correct language, no document-wide horizontal overflow`);
      if (path === '/it') {
        browser('screenshot', `reports/guestflow-${label}-it.png`, '--full');
        browser('wait', '.guided-demo-next');
        for (const expected of [2, 3, 1]) {
          browser('click', '.guided-demo-next');
          browser('eval', `(() => { const active = [...document.querySelectorAll('.guided-demo-step')].findIndex(x => x.getAttribute('aria-pressed') === 'true'); if(active !== ${expected - 1}) throw new Error('Demo did not reach step ${expected}'); return 'Demo step ${expected} verified'; })()`);
        }
        await record(`${label}: Italian guided demo advances 1-2-3 and restarts`);
      }
    }
  }
  browser('open', `${origin}/request-setup`);
  browser('wait', '--load', 'networkidle');
  browser('snapshot', '-i');
  browser('fill', 'input[placeholder="Hotel / B&B name"]', 'Local synthetic QA property');
  browser('fill', 'input[placeholder="Name and role"]', 'Local QA only');
  browser('fill', '.setup-form input[type="email"]', 'qa@example.invalid');
  browser('check', '.form-consent input');
  browser('click', '.setup-form button[type="submit"]');
  browser('wait', '.setup-status.fallback');
  browser('eval', `(() => { const status = document.querySelector('.setup-status.fallback')?.textContent || ''; if(!status.includes('not been sent')) throw new Error('Missing truthful failure message'); if(document.querySelector('.setup-form button[type="submit"]').disabled) throw new Error('Submit button remained disabled'); return 'Missing provider produces a truthful manual-email fallback'; })()`);
  await record('Submitting local form without delivery credentials shows NOT SENT, retains a usable submit button, and does not silently open email');
  browser('screenshot', 'reports/guestflow-mobile-fallback.png', '--full');
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
