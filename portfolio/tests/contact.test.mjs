import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { DatabaseSync } from "node:sqlite";
import { webcrypto } from "node:crypto";
import ts from "typescript";

const code = ts.transpileModule(fs.readFileSync("functions/api/contact.ts", "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;

function fixture({ verification = {}, sendStatus = 200 } = {}) {
  const db = new DatabaseSync(":memory:");
  db.exec(fs.readFileSync("migrations/0001_contact_rate_limits.sql", "utf8"));
  const sends = [];
  const calls = [];
  const stub = { exports: {} };
  const fetch = async (url, options) => {
    calls.push(url);
    if (url.includes("siteverify")) {
      return Response.json({ success: true, hostname: "portfolio.example", action: "contact", ...verification });
    }
    sends.push(JSON.parse(options.body));
    return Response.json({}, { status: sendStatus });
  };
  new Function("exports", "module", "fetch", "crypto", code)(stub.exports, stub, fetch, webcrypto);
  const env = {
    RESEND_API_KEY: "test-only", TURNSTILE_SECRET_KEY: "test-only",
    CONTACT_RATE_LIMITS: { prepare: (sql) => ({ bind: (...values) => ({
      first: async () => db.prepare(sql).get(...values) ?? null,
      run: async () => db.prepare(sql).run(...values),
    }) }) },
  };
  const payload = { name: "<Visitor>", email: "visitor@example.com", message: "hello <script>", turnstileToken: "test-token" };
  const request = (body = payload, overrides = {}, headers = {}) => stub.exports.onRequestPost({
    request: new Request("https://portfolio.example/api/contact", {
      method: "POST", headers: { "Content-Type": "application/json", "CF-Connecting-IP": "192.0.2.1", ...headers },
      body: JSON.stringify(body),
    }), env: { ...env, ...overrides },
  });
  return { db, sends, calls, request, payload };
}

test("rejects null, arrays and scalar JSON without sending", async () => {
  const f = fixture();
  for (const value of [null, [], "string", 123, true, {}]) assert.equal((await f.request(value)).status, 400);
  assert.equal(f.calls.length, 0);
  f.db.close();
});

test("rejects invalid email and absent challenge tokens", async () => {
  const f = fixture();
  assert.equal((await f.request({ ...f.payload, email: "bad" })).status, 400);
  assert.equal((await f.request({ ...f.payload, turnstileToken: "" })).status, 400);
  assert.equal(f.calls.length, 0);
  f.db.close();
});

test("honeypot succeeds without calling external services", async () => {
  const f = fixture();
  assert.equal((await f.request({ website: "spam" })).status, 200);
  assert.equal(f.calls.length, 0);
  f.db.close();
});

test("missing protection configuration fails closed", async () => {
  const f = fixture();
  for (const key of ["TURNSTILE_SECRET_KEY", "CONTACT_RATE_LIMITS", "RESEND_API_KEY"]) {
    assert.equal((await f.request(f.payload, { [key]: undefined })).status, 503);
  }
  assert.equal(f.sends.length, 0);
  f.db.close();
});

test("rejects failed challenge, wrong hostname and wrong action", async () => {
  for (const verification of [{ success: false }, { hostname: "other.example" }, { action: "other" }]) {
    const f = fixture({ verification });
    assert.equal((await f.request()).status, 400);
    assert.equal(f.sends.length, 0);
    f.db.close();
  }
});

test("successful sends escape HTML and strip subject line breaks", async () => {
  const f = fixture();
  const response = await f.request({ ...f.payload, name: "<Visitor>\r\nBcc: fake", subject: "Hello\nWorld" });
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { success: true });
  assert.ok(f.sends[0].html.includes("&lt;script&gt;"));
  assert.ok(f.sends[0].html.includes("&lt;Visitor&gt;"));
  assert.ok(!/[\r\n]/.test(f.sends[0].subject));
  assert.equal(f.sends[0].reply_to, f.payload.email);
  f.db.close();
});

test("atomic SQL caps concurrent attempts and supplies Retry-After", async () => {
  const f = fixture();
  const responses = await Promise.all(Array.from({ length: 8 }, () => f.request()));
  assert.equal(responses.filter((r) => r.status === 200).length, 5);
  assert.equal(responses.filter((r) => r.status === 429).length, 3);
  assert.equal(f.sends.length, 5);
  assert.ok(Number(responses.find((r) => r.status === 429).headers.get("Retry-After")) > 0);
  const row = f.db.prepare("SELECT * FROM contact_rate_limits").get();
  assert.ok(!row.key.includes("192.0.2.1"));
  f.db.close();
});

test("expired counters reset and expired unrelated rows are removed", async () => {
  const f = fixture();
  await f.request();
  f.db.exec("UPDATE contact_rate_limits SET count = 99, expires_at = 0; INSERT INTO contact_rate_limits VALUES ('expired', 1, 0)");
  assert.equal((await f.request()).status, 200);
  assert.equal(f.db.prepare("SELECT count(*) AS total FROM contact_rate_limits").get().total, 1);
  assert.equal(f.db.prepare("SELECT count FROM contact_rate_limits").get().count, 1);
  f.db.close();
});

test("upstream email rejection is not reported as success", async () => {
  const f = fixture({ sendStatus: 502 });
  assert.equal((await f.request()).status, 502);
  f.db.close();
});

test("missing trusted client IP never sends email", async () => {
  const f = fixture();
  assert.equal((await f.request(f.payload, {}, { "CF-Connecting-IP": "" })).status, 503);
  assert.equal(f.calls.length, 0);
  f.db.close();
});

test("rate limit storage failure fails closed before external requests", async () => {
  const f = fixture();
  const unavailable = { prepare: () => { throw new Error("Database unavailable"); } };
  assert.equal((await f.request(f.payload, { CONTACT_RATE_LIMITS: unavailable })).status, 503);
  assert.equal(f.calls.length, 0);
  f.db.close();
});
