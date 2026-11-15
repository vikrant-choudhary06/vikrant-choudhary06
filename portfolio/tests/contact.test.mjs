import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

const code = ts.transpileModule(fs.readFileSync(new URL('../src/lib/contact.ts', import.meta.url), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
test('Pages contact validates input and routes Resend messages without sending real email', async () => {
  let sent;
  const context = { exports: {}, require: () => ({ PERSONAL_INFO: { email: 'owner@example.com' } }), Request, Response, URL, AbortSignal, Map, Date, fetch: async (_url, options) => { sent = JSON.parse(options.body); return new Response('{}', { status: 200 }); } };
  vm.runInNewContext(code, context);
  const call = (body, env = {}) => context.exports.handleContact(new Request('https://vikrant.sbs/api/contact', { method: 'POST', headers: { 'content-type': 'application/json', origin: 'https://vikrant.sbs' }, body: JSON.stringify(body) }), env);
  const valid = { name: 'Test User', email: 'test@example.com', message: 'A test message for the contact form.' };
  assert.equal((await call({})).status, 400);
  assert.equal((await call(valid)).status, 503);
  assert.equal((await call({ website: 'bot' })).status, 200);
  assert.equal(sent, undefined);
  const env = { RESEND_API_KEY: 'test-only', CONTACT_FROM_EMAIL: 'contact@vikrant.sbs' };
  assert.equal((await call(valid, env)).status, 200);
  assert.equal(sent.reply_to, valid.email);
  assert.equal(sent.to, 'owner@example.com');
  context.fetch = async () => new Response('{}', { status: 429 });
  assert.equal((await call(valid, env)).status, 502);
});
