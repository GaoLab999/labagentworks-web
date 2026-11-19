export const SHA256 = '229120f30b6906b0f5e0dbd1c1a01368f689ef334f6bce90e32e9f9d87fa080b';
export const OBJECT_KEY = 'nih-download-agent/v0.2.0-beta.1/NIH-Download-Agent-Setup.exe';
const encoder = new TextEncoder();
const cookieName = '__Secure-nih-download';
const cookiePath = '/api/nih/';
const headers = { 'Cache-Control': 'no-store, private', 'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'no-referrer' };
const hex = bytes => Array.from(new Uint8Array(bytes), b => b.toString(16).padStart(2, '0')).join('');
const unhex = value => Uint8Array.from(value.match(/../g) || [], x => parseInt(x, 16));
const json = (status, error, extra = {}) => new Response(JSON.stringify(error ? { error } : { ok: true }), { status, headers: { ...headers, 'Content-Type': 'application/json', ...extra } });
async function signingKey(secret) {
  return crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify']);
}
async function sign(secret, value) {
  return hex(await crypto.subtle.sign('HMAC', await signingKey(secret), encoder.encode(value)));
}
export async function passwordVerifier(password, salt) {
  const key = await crypto.subtle.importKey('raw', encoder.encode(password), 'PBKDF2', false, ['deriveBits']);
  return hex(await crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt: unhex(salt), iterations: 100000 }, key, 256));
}
function configured(env) {
  return env.NIH_BUCKET && env.NIH_AUTH_DB && env.NIH_TOKEN_SECRET?.length >= 32 && /^[a-f0-9]{32}$/.test(env.NIH_PASSWORD_SALT || '') && /^[a-f0-9]{64}$/.test(env.NIH_PASSWORD_VERIFIER || '');
}
async function allowed(env, ip) {
  // A single SQLite statement serializes concurrent attempts, across all edge locations.
  const now = Math.floor(Date.now() / 1000);
  const bucket = Math.floor(now / 900);
  const id = await sign(env.NIH_TOKEN_SECRET, `attempts:${ip}:${bucket}`);
  const row = await env.NIH_AUTH_DB.prepare(`INSERT INTO nih_attempts (id, attempts, expires) VALUES (?, 1, ?) ON CONFLICT(id) DO UPDATE SET attempts = attempts + 1 RETURNING attempts`).bind(id, now + 1800).first();
  await env.NIH_AUTH_DB.prepare('DELETE FROM nih_attempts WHERE expires < ?').bind(now).run();
  return row.attempts <= 5;
}
async function authorized(request, env) {
  const value = (request.headers.get('Cookie') || '').split(';').map(x => x.trim()).find(x => x.startsWith(`${cookieName}=`))?.slice(cookieName.length + 1) || '';
  const [expires, nonce, signature] = value.split('.');
  if (!/^\d{10}$/.test(expires || '') || !/^[a-f0-9]{32}$/.test(nonce || '') || !/^[a-f0-9]{64}$/.test(signature || '')) return false;
  const now = Math.floor(Date.now() / 1000);
  if (+expires <= now || +expires > now + 300) return false;
  return crypto.subtle.verify('HMAC', await signingKey(env.NIH_TOKEN_SECRET), unhex(signature), encoder.encode(`${expires}.${nonce}`));
}
export async function handle(request, env, action) {
  try {
    const url = new URL(request.url);
    if (url.protocol !== 'https:') return json(403, 'HTTPS is required.');
    if (!configured(env)) return json(503, 'Downloads are temporarily unavailable.');
    if (action === 'authorize') {
      if (request.method !== 'POST') return json(405, 'Method not allowed.', { Allow: 'POST' });
      if (request.headers.get('Origin') !== url.origin) return json(403, 'Request not permitted.');
      const ip = request.headers.get('CF-Connecting-IP');
      if (!ip) return json(503, 'Downloads are temporarily unavailable.');
      if (!await allowed(env, ip)) return json(429, 'Too many attempts. Please try again in 15 minutes.', { 'Retry-After': '900' });
      if (!request.headers.get('Content-Type')?.startsWith('application/json')) return json(400, 'Invalid request.');
      // Bound streamed input, including requests without Content-Length.
      const reader = request.body?.getReader();
      if (!reader) return json(400, 'Enter an access password.');
      let body = '', size = 0;
      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        size += value.byteLength;
        if (size > 2048) { await reader.cancel(); return json(413, 'Request too large.'); }
        body += decoder.decode(value, { stream: true });
      }
      body += decoder.decode();
      let input;
      try { input = JSON.parse(body); } catch { return json(400, 'Invalid request.'); }
      if (typeof input?.password !== 'string' || input.password.length > 256) return json(400, 'Invalid request.');
      const candidate = await passwordVerifier(input.password, env.NIH_PASSWORD_SALT);
      // Constant-time verification through Web Crypto, rather than string comparison.
      const proof = await sign(env.NIH_TOKEN_SECRET, candidate);
      const valid = await crypto.subtle.verify('HMAC', await signingKey(env.NIH_TOKEN_SECRET), unhex(proof), encoder.encode(env.NIH_PASSWORD_VERIFIER));
      if (!valid) return json(401, 'Incorrect access password.');
      const expires = Math.floor(Date.now() / 1000) + 300;
      const payload = `${expires}.${hex(crypto.getRandomValues(new Uint8Array(16)))}`;
      return json(200, null, { 'Set-Cookie': `${cookieName}=${payload}.${await sign(env.NIH_TOKEN_SECRET, payload)}; Path=${cookiePath}; HttpOnly; Secure; SameSite=Strict; Max-Age=300` });
    }
    if (request.method !== 'GET') return json(405, 'Method not allowed.', { Allow: 'GET' });
    if (!await authorized(request, env)) return json(401, 'Enter the access password on the product page.');
    const object = await env.NIH_BUCKET.get(OBJECT_KEY);
    if (!object || object.size !== 11512320) return json(503, 'Downloads are temporarily unavailable.');
    // This pinned 11.5 MB installer fits the Worker memory budget. Verify actual bytes,
    // not uploader-supplied metadata, before releasing any bytes to the visitor.
    const bytes = await object.arrayBuffer();
    if (hex(await crypto.subtle.digest('SHA-256', bytes)) !== SHA256) return json(503, 'Downloads are temporarily unavailable.');
    return new Response(bytes, { headers: { ...headers, 'Content-Type': 'application/octet-stream', 'Content-Disposition': 'attachment; filename="NIH-Download-Agent-Setup.exe"', 'Content-Length': String(object.size) } });
  } catch {
    // Never log request bodies, cookies, secrets, or upstream exceptions.
    return json(503, 'Downloads are temporarily unavailable.');
  }
}
