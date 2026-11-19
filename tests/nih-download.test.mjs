import { test } from 'node:test';
import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import { readFileSync, existsSync } from 'node:fs';
import { randomBytes, createHash, createHmac } from 'node:crypto';
import { handle, passwordVerifier, SHA256, OBJECT_KEY } from '../server/nih-download.mjs';
const password = randomBytes(24).toString('hex');
const salt = randomBytes(16).toString('hex');
const verifier = await passwordVerifier(password, salt);
function environment() {
  const db = new DatabaseSync(':memory:');
  db.exec(readFileSync(new URL('../server/nih-auth.sql', import.meta.url), 'utf8'));
  return {
    NIH_PASSWORD_SALT: salt, NIH_PASSWORD_VERIFIER: verifier,
    NIH_TOKEN_SECRET: randomBytes(32).toString('hex'),
    NIH_AUTH_DB: { prepare(sql) { return { bind(...args) { return { async first() { return db.prepare(sql).get(...args); }, async run() { return db.prepare(sql).run(...args); } }; } }; } },
    NIH_BUCKET: { async get() { return null; } },
  };
}
function auth(value, extra = {}) {
  return new Request('https://labagentworks.com/api/nih/authorize', { method: 'POST', headers: { Origin: 'https://labagentworks.com', 'Content-Type': 'application/json', 'CF-Connecting-IP': '192.0.2.1', ...extra }, body: JSON.stringify({ password: value }) });
}
function download(cookie = '') { return new Request('https://labagentworks.com/api/nih/download', { headers: { Cookie: cookie } }); }
async function grant(env) {
  const response = await handle(auth(password), env, 'authorize');
  assert.equal(response.status, 200);
  const cookie = response.headers.get('Set-Cookie');
  for (const flag of ['HttpOnly', 'Secure', 'SameSite=Strict', 'Max-Age=300']) assert.ok(cookie.includes(flag));
  return cookie.split(';')[0];
}
test('missing configuration, HTTP and dependency failures fail closed', async () => {
  assert.equal((await handle(auth(password), {}, 'authorize')).status, 503);
  assert.equal((await handle(new Request('http://labagentworks.com/api/nih/download'), environment(), 'download')).status, 403);
  const env = environment(); env.NIH_AUTH_DB.prepare = () => { throw new Error('private details'); };
  const result = await handle(auth(password), env, 'authorize');
  assert.equal(result.status, 503); assert.ok(!(await result.text()).includes('private details'));
});
test('rejects incorrect passwords, cross-origin requests and oversized input', async () => {
  const env = environment();
  assert.equal((await handle(auth(randomBytes(20).toString('hex')), env, 'authorize')).status, 401);
  assert.equal((await handle(auth(password, { Origin: 'https://other.example' }), env, 'authorize')).status, 403);
  assert.equal((await handle(auth('x'.repeat(3000)), env, 'authorize')).status, 413);
});
test('correct password grants access; direct, tampered and expired cookies denied', async () => {
  const env = environment(); const cookie = await grant(env);
  assert.equal((await handle(download(), env, 'download')).status, 401);
  assert.equal((await handle(download(cookie + 'x'), env, 'download')).status, 401);
  const payload = `${Math.floor(Date.now()/1000)-1}.${randomBytes(16).toString('hex')}`;
  const signature = createHmac('sha256', env.NIH_TOKEN_SECRET).update(payload).digest('hex');
  assert.equal((await handle(download(`__Secure-nih-download=${payload}.${signature}`), env, 'download')).status, 401);
  assert.equal((await handle(download(cookie), env, 'download')).status, 503); // authorized but no object
});
test('atomic counter rejects attempts after five, including concurrent attempts', async () => {
  const env = environment();
  const results = await Promise.all(Array.from({length: 12}, () => handle(auth('invalid'), env, 'authorize')));
  assert.equal(results.filter(r => r.status === 401).length, 5);
  assert.equal(results.filter(r => r.status === 429).length, 7);
  assert.equal((await handle(auth(password), env, 'authorize')).status, 429);
});
test('wrong installer bytes cannot be delivered', async () => {
  const env = environment(); const cookie = await grant(env);
  env.NIH_BUCKET.get = async () => ({ size: 11512320, arrayBuffer: async () => new ArrayBuffer(11512320) });
  assert.equal((await handle(download(cookie), env, 'download')).status, 503);
});
const installer = new URL('../review/nih-release/NIH-Download-Agent-Setup.exe', import.meta.url);
test('authenticated download delivers exact verified release bytes', { skip: !existsSync(installer) }, async () => {
  const bytes = readFileSync(installer);
  const env = environment(); const cookie = await grant(env);
  env.NIH_BUCKET.get = async key => { assert.equal(key, OBJECT_KEY); return { size: bytes.length, arrayBuffer: async () => bytes }; };
  const response = await handle(download(cookie), env, 'download');
  assert.equal(response.status, 200);
  assert.ok(response.headers.get('Cache-Control').includes('no-store'));
  assert.equal(createHash('sha256').update(Buffer.from(await response.arrayBuffer())).digest('hex'), SHA256);
});
