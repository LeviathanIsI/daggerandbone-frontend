const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { harness, root } = require('./public-harness.cjs');

const productionBackend = 'https://daggerandbone-backend.onrender.com';

test('production frontend configuration points browser and server reads to Render', () => {
  const productionEnv = fs.readFileSync(path.join(root, '.env.production'), 'utf8');
  assert.match(productionEnv, /^NEXT_PUBLIC_API_URL=https:\/\/daggerandbone-backend\.onrender\.com$/m);
  assert.match(productionEnv, /^BACKEND_URL=https:\/\/daggerandbone-backend\.onrender\.com$/m);
  assert.doesNotMatch(productionEnv, /MONGODB_URI|SESSION_SECRET|CLOUDINARY_API_SECRET|BREVO_API_KEY/);
});

test('API helper uses the public production origin and sends cookies for admin and forms', async () => {
  const keys = ['NEXT_PUBLIC_API_URL', 'NEXT_PUBLIC_API_ORIGIN', 'BACKEND_URL'];
  const previous = Object.fromEntries(keys.map(key => [key, process.env[key]]));
  const originalFetch = global.fetch;
  const calls = [];
  try {
    process.env.NEXT_PUBLIC_API_URL = `${productionBackend}/`;
    process.env.NEXT_PUBLIC_API_ORIGIN = 'http://localhost:4000';
    process.env.BACKEND_URL = `${productionBackend}/`;
    global.fetch = async (url, options) => {
      calls.push({ url, options });
      return Response.json({ ok: true });
    };
    const api = harness().load('lib/api.js');
    assert.equal(api.publicApiOrigin, productionBackend);
    await api.getPublicResult('/snapshot');
    await api.clientApi('/admin/me');
    await api.clientApi('/admin/media', { method: 'POST', body: new FormData() });
    await api.clientApi('/public/contact', { method: 'POST', body: { name: 'Visitor' } });
    assert.deepEqual(calls.map(call => call.url), [
      `${productionBackend}/api/public/snapshot`,
      `${productionBackend}/api/admin/me`,
      `${productionBackend}/api/admin/media`,
      `${productionBackend}/api/public/contact`,
    ]);
    assert.equal(calls[0].options.cache, 'no-store');
    assert.ok(calls.slice(1).every(call => call.options.credentials === 'include'));
    assert.equal(calls[2].options.headers['Content-Type'], undefined);
  } finally {
    global.fetch = originalFetch;
    for (const key of keys) {
      if (previous[key] === undefined) delete process.env[key];
      else process.env[key] = previous[key];
    }
  }
});

test('existing local API origin remains supported', () => {
  const previousUrl = process.env.NEXT_PUBLIC_API_URL;
  const previousOrigin = process.env.NEXT_PUBLIC_API_ORIGIN;
  try {
    delete process.env.NEXT_PUBLIC_API_URL;
    process.env.NEXT_PUBLIC_API_ORIGIN = 'http://localhost:4000/';
    assert.equal(harness().load('lib/api.js').publicApiOrigin, 'http://localhost:4000');
  } finally {
    if (previousUrl === undefined) delete process.env.NEXT_PUBLIC_API_URL;
    else process.env.NEXT_PUBLIC_API_URL = previousUrl;
    if (previousOrigin === undefined) delete process.env.NEXT_PUBLIC_API_ORIGIN;
    else process.env.NEXT_PUBLIC_API_ORIGIN = previousOrigin;
  }
});
