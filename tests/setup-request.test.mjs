import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';
import ts from 'typescript';

// Execute the actual route using isolated providers; NEVER use process.env or
// global fetch from the test host. No emails, CRM rows or payments are sent.
function load(file, dependencies, environment, fetch) {
  const { outputText } = ts.transpileModule(readFileSync(new URL(file, import.meta.url), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  });
  const module = { exports: {} };
  vm.runInNewContext(outputText, {
    module, exports: module.exports, process: { env: environment }, fetch, AbortSignal,
    require(name) {
      if (!(name in dependencies)) throw new Error(`Unexpected dependency: ${name}`);
      return dependencies[name];
    },
  });
  return module.exports;
}
const referrals = load('../lib/referrals.ts', {}, {}, undefined);
const lead = {
  product: 'Repeat Guest Engine', goal: 'Generate more repeat bookings',
  propertyName: 'Synthetic property', contactName: 'QA only',
  email: 'qa@example.invalid', notes: 'Local mock only',
};
function harness(environment = {}, outcomes = []) {
  const calls = [];
  const { POST } = load('../app/api/setup-request/route.ts', {
    'next/server': { NextResponse: { json: (data, init = {}) => Response.json(data, init) } },
    '@/lib/referrals': referrals,
  }, environment, async (url, init) => {
    calls.push({ url, data: JSON.parse(init.body) });
    const result = outcomes[calls.length - 1] ?? 200;
    if (result instanceof Error) throw result;
    return { ok: result >= 200 && result < 300 };
  });
  return {
    calls,
    submit: (payload = lead) => POST({ json: async () => payload, cookies: { get: () => ({ value: 'qa_partner' }) } }),
  };
}

test('primary goal and referral survive webhook delivery', async () => {
  const h = harness({ SETUP_REQUEST_WEBHOOK_URL: 'https://mock.invalid/lead' });
  const response = await h.submit();
  assert.equal(response.status, 200);
  assert.equal((await response.json()).channel, 'webhook');
  assert.equal(h.calls.length, 1);
  assert.equal(h.calls[0].data.goal, lead.goal);
  assert.match(h.calls[0].data.text, /Primary goal: Generate more repeat bookings/);
  assert.equal(h.calls[0].data.referral, 'qa_partner');
});

test('primary goal survives webhook timeout and email fallback', async () => {
  const h = harness({ SETUP_REQUEST_WEBHOOK_URL: 'https://mock.invalid/lead', RESEND_API_KEY: 'mock-only', RESEND_FROM: 'qa@example.invalid' }, [new Error('simulated timeout'), 200]);
  const response = await h.submit();
  assert.equal(response.status, 200);
  assert.equal((await response.json()).channel, 'email');
  assert.equal(h.calls.length, 2);
  assert.match(h.calls[1].data.text, /Primary goal: Generate more repeat bookings/);
  assert.equal(h.calls[1].data.reply_to, lead.email);
});

test('missing delivery configuration is an explicit 503, not a saved CRM lead', async () => {
  const h = harness();
  const response = await h.submit();
  assert.equal(response.status, 503);
  assert.equal((await response.json()).code, 'DELIVERY_NOT_CONFIGURED');
  assert.equal(h.calls.length, 0);
});

test('both failing delivery providers return 502 without false success', async () => {
  const h = harness({ SETUP_REQUEST_WEBHOOK_URL: 'https://mock.invalid/lead', RESEND_API_KEY: 'mock-only', RESEND_FROM: 'qa@example.invalid' }, [503, 500]);
  const response = await h.submit();
  assert.equal(response.status, 502);
  const data = await response.json();
  assert.equal(data.ok, false);
  assert.equal(data.code, 'DELIVERY_FAILED');
  assert.equal(data.referral, 'qa_partner');
});

test('invalid and missing fields never reach providers', async () => {
  const h = harness({ SETUP_REQUEST_WEBHOOK_URL: 'https://mock.invalid/lead' });
  for (const payload of [{}, { ...lead, email: 'not-an-email' }, null]) {
    assert.equal((await h.submit(payload)).status, 400);
  }
  assert.equal(h.calls.length, 0);
});

test('goal remains optional for existing Italian and legacy clients and is length-bounded', async () => {
  const h = harness({ SETUP_REQUEST_WEBHOOK_URL: 'https://mock.invalid/lead' });
  await h.submit({ ...lead, goal: undefined });
  assert.equal(h.calls[0].data.goal, '');
  await h.submit({ ...lead, goal: `  ${'a'.repeat(800)}  ` });
  assert.equal(h.calls[1].data.goal.length, 500);
});

test('honeypot cannot send a provider request', async () => {
  const h = harness({ SETUP_REQUEST_WEBHOOK_URL: 'https://mock.invalid/lead' });
  await h.submit({ ...lead, companyWebsite: 'bot-filled' });
  assert.equal(h.calls.length, 0);
});
