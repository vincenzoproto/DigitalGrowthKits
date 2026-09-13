import { mkdir, writeFile, appendFile } from 'node:fs/promises';

// This audit NEVER creates checkout sessions, charges, refunds, customers or
// subscriptions. All external requests are restricted to the user's website.
const origin = 'https://www.guestflowsystems.com';
const auditId = `GF-QA-${process.env.GITHUB_RUN_ID || Date.now()}`;
const sendLead = process.env.GF_AUDIT_SEND_TEST_LEAD === 'true';
const results = [];
function record(name, state, evidence) {
  results.push({ name, state, evidence });
  console.log(`${state}: ${name} | ${evidence}`);
}
async function request(path, options = {}) {
  if (!path.startsWith('/') || path.startsWith('//')) throw new Error('Only same-site paths are permitted');
  return fetch(`${origin}${path}`, {
    ...options,
    redirect: 'manual',
    signal: AbortSignal.timeout(20000),
    headers: { 'user-agent': 'GuestFlow-authorized-operational-audit/1.0', ...options.headers },
  });
}
async function check(name, fn) {
  try { await fn(); } catch (error) { record(name, 'BLOCKED', error.message); }
}
const heading = (html) => (html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1] || '').replace(/<[^>]*>/g, '').trim();
for (const path of ['/', '/it', '/request-setup', '/it/request-setup', '/it/partner', '/repeat-guest-engine/demo']) {
  await check(`Public page ${path}`, async () => {
    const response = await request(path);
    const html = await response.text();
    record(`Public page ${path}`, response.status === 200 && Boolean(heading(html)) ? 'PASS' : 'BLOCKED', `HTTP ${response.status}; H1: ${heading(html)}`);
    if (path === '/it') {
      const language = html.match(/<html\b[^>]*\blang=["']([^"']+)/i)?.[1];
      record('Published Italian document language', language === 'it' ? 'PASS' : 'BLOCKED', `lang=${language || 'missing'}; this checks production, not PR #4`);
    }
  });
}
const links = {
  'guest-inbox-pro': 'https://book.stripe.com/8x27sL4jzdLu0T24cOabK02',
  'digital-guest-concierge': 'https://book.stripe.com/6oU7sLaHX6j231a5gSabK03',
  'repeat-guest-engine': 'https://book.stripe.com/28E6oH5nD36Q7hqdNoabK04',
  'direct-booking-engine': 'https://book.stripe.com/00w9AT03jgXG8lu8t4abK05',
  'repeat-guest-engine-founder': 'https://book.stripe.com/aFafZheYd6j28lu38KabK06',
};
for (const [product, expected] of Object.entries(links)) {
  await check(`Checkout routing ${product}`, async () => {
    const response = await request(`/buy/${product}?ref=qa_operational`);
    const target = new URL(response.headers.get('location') || '/', origin);
    const matches = `${target.origin}${target.pathname}` === expected && target.searchParams.get('client_reference_id') === 'qa_operational';
    record(`Checkout routing ${product}`, response.status === 307 && matches ? 'PASS' : 'BLOCKED', `HTTP ${response.status}; expected link and referral=${matches}; redirect NOT followed`);
    await response.arrayBuffer();
  });
}
for (const [session, label] of [['invalid', 'Invalid payment reference'], ['cs_live_GuestFlowAuditNotARealSession20260909', 'Server-side payment verification']]) {
  await check(label, async () => {
    const response = await request(`/success?lang=it&session_id=${session}`);
    const title = heading(await response.text());
    const falselyConfirmed = /^(Pagamento confermato|Ordine confermato|Payment confirmed|Your order is confirmed)/i.test(title);
    const unavailable = /non disponibile|unavailable/i.test(title);
    const invalid = /non troviamo|couldn.t find|not found/i.test(title);
    record(label, response.status === 200 && !falselyConfirmed && invalid ? 'PASS' : 'BLOCKED', `HTTP ${response.status}; H1: ${title}; verification unavailable=${unavailable}`);
  });
}
if (sendLead) {
  await check('Synthetic setup request', async () => {
    // Reserved non-deliverable address, no real customer or guest data. This is
    // the ONE opted-in write; never retry automatically on a network timeout.
    const payload = {
      product: 'Repeat Guest Engine',
      goal: 'Operational QA only - no customer follow-up',
      propertyName: `TEST ONLY ${auditId}`,
      propertyType: 'Hotel',
      contactName: 'GuestFlow synthetic operational QA',
      email: 'guestflow-qa@example.invalid',
      rooms: '0',
      notes: `AUTHORIZED TECHNICAL TEST ${auditId}. Not a lead or customer. Do not contact, invoice, send marketing or start implementation. Keep separately from real CRM opportunities.`,
      companyWebsite: '',
    };
    const response = await request('/api/setup-request', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await response.json().catch(() => ({}));
    const accepted = response.status === 200 && data.ok === true && ['webhook', 'email'].includes(data.channel);
    record('Synthetic setup request', accepted ? 'PASS' : 'BLOCKED', `auditId=${auditId}; HTTP ${response.status}; ok=${data.ok}; channel=${data.channel || '-'}; code=${data.code || '-'}; provider acceptance is NOT proof of inbox/CRM receipt`);
  });
} else {
  record('Synthetic setup request', 'NOT_RUN', 'Write disabled. Opt in explicitly with GF_AUDIT_SEND_TEST_LEAD=true.');
}
record('Inbox and CRM receipt', 'NOT_VERIFIED', `Find exact auditId ${auditId} in the receiving inbox and dedicated GuestFlow CRM; do not infer from HTTP 200.`);
record('Stripe sandbox payment', 'NOT_RUN', 'A separately authorized Stripe test/sandbox context is required. No live payment attempted.');
record('Paid order to onboarding and delivery', 'NOT_VERIFIED', 'Requires a verified sandbox payment, durable order/CRM record, and manual implementation acceptance.');
const report = {
  auditId,
  checkedAt: new Date().toISOString(),
  origin,
  leadWriteOptedIn: sendLead,
  safeToRelease: false,
  note: 'This HTTP audit alone never certifies end-to-end delivery or authorizes deployment.',
  results,
};
await mkdir('reports', { recursive: true });
await writeFile('reports/guestflow-operational-audit.json', JSON.stringify(report, null, 2));
const summary = ['# GuestFlow operational audit', '', `Audit: ${auditId}`, '', ...results.map((r) => `- **${r.state}** ${r.name}: ${r.evidence}`), '', '**Release gate remains CLOSED until inbox/CRM, sandbox payment and delivery acceptance are independently verified.**', ''].join('\n');
await writeFile('reports/guestflow-operational-audit.md', summary);
if (process.env.GITHUB_STEP_SUMMARY) await appendFile(process.env.GITHUB_STEP_SUMMARY, summary);
if (results.some((r) => r.state === 'BLOCKED')) process.exitCode = 1;
