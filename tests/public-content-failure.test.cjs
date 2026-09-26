const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { renderToStaticMarkup } = require('react-dom/server');
const { harness, React, root } = require('./public-harness.cjs');

const archive = JSON.parse(fs.readFileSync(path.join(root, 'data/published-snapshot.json'), 'utf8'));

test('offline API failure serves layout, metadata, collection and scents from the published archive without console errors', async () => {
  const originalFetch = global.fetch, originalError = console.error, originalCwd = process.cwd();
  const requests = [], errors = [];
  const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'dab-offline-public-'));
  fs.mkdirSync(path.join(temporary, 'data'));
  fs.copyFileSync(path.join(root, 'data/published-snapshot.json'), path.join(temporary, 'data/published-snapshot.json'));
  try {
    process.chdir(temporary);
    global.fetch = async url => { requests.push(new URL(url).pathname); throw new Error('connect ECONNREFUSED ::1:4000'); };
    console.error = (...args) => errors.push(args);
    const h = harness();
    const layout = h.load('app/layout.js');
    const products = h.load('app/products/page.js');
    const scents = h.load('app/scents/page.js');
    const content = h.load('lib/public-content.js');
    const site = h.load('components/public/PublicSite.js').default;

    assert.equal((await layout.generateMetadata()).robots.index, false);
    const rootElement = await layout.default({ children: 'route content' });
    assert.equal(rootElement.type, 'html');
    assert.doesNotMatch(JSON.stringify(rootElement), /DesignProvider|dab-public-design/);
    assert.equal((await products.generateMetadata()).robots.index, false);
    assert.equal((await scents.generateMetadata()).robots.index, false);

    const productData = (await products.default()).props.data;
    const scentData = (await scents.default()).props.data;
    assert.equal(productData.page.title, archive.site.pages.products.title);
    assert.equal(scentData.page.title, archive.site.pages.scents.title);
    assert.equal(productData.products.length, 7);
    assert.equal(scentData.scents.length, 3);
    for (const [kind, data] of [['collection', productData], ['scents', scentData]]) {
      const html = renderToStaticMarkup(React.createElement(site, { kind, data }));
      assert.equal((html.match(/<h1[ >]/g) || []).length, 1);
      assert.match(html, /Saved version/);
      assert.match(html, /viewing a saved copy from/);
      assert.match(html, /may not include the latest updates/);
    }
    for (const kind of ['home', 'about', 'campaign', 'contact', 'faq', 'signup', 'unsubscribe']) assert.equal((await content.loadPublicContent(kind)).unavailable, undefined, kind);
    for (const item of archive.products) assert.equal((await content.loadPublicContent('product', item.slug)).item.name, item.name);
    for (const item of archive.scents) assert.equal((await content.loadPublicContent('scent', item.slug)).item.name, item.name);
    assert.ok(requests.length > 0);
    assert.ok(requests.every(request => request === '/api/public/snapshot'));
    assert.equal(errors.length, 0);
  } finally {
    process.chdir(originalCwd); global.fetch = originalFetch; console.error = originalError;
    if (path.resolve(temporary).startsWith(path.resolve(os.tmpdir()) + path.sep)) fs.rmSync(temporary, { recursive: true, force: true });
  }
});

test('live CMS replaces the saved snapshot, then offline reads reuse it; no snapshot yields one clean error state', async () => {
  const originalFetch = global.fetch, originalError = console.error;
  const errors = [];
  const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'dab-public-snapshot-'));
  const runtimeFile = path.join(temporary, 'current.json');
  const absentFile = path.join(temporary, 'absent.json');
  const h = harness();
  const published = h.load('lib/published-content.js');
  const PublicSite = h.load('components/public/PublicSite.js').default;
  try {
    console.error = (...args) => errors.push(args);
    const live = structuredClone(archive);
    live.source = 'live-api';
    live.capturedAt = '2026-09-24T12:00:00.000Z';
    live.site.pages.products.title = 'A saved CMS edit';
    global.fetch = async () => Response.json(live);
    const current = await published.readPublishedContent({ runtimeFile, archivedFile: absentFile });
    assert.equal(current.offline, false);
    assert.equal(current.bundle.site.pages.products.title, 'A saved CMS edit');
    assert.equal(JSON.parse(fs.readFileSync(runtimeFile, 'utf8')).site.pages.products.title, 'A saved CMS edit');

    global.fetch = async () => { throw new Error('backend unavailable'); };
    const saved = await published.readPublishedContent({ runtimeFile, archivedFile: absentFile });
    assert.equal(saved.offline, true);
    assert.equal(saved.bundle.site.pages.products.title, 'A saved CMS edit');
    fs.unlinkSync(runtimeFile);
    const missing = await published.readPublishedContent({ runtimeFile, archivedFile: absentFile });
    assert.equal(missing.bundle, null);
    const html = renderToStaticMarkup(React.createElement(PublicSite, { kind: 'unavailable', data: { unavailable: true }, reset() {} }));
    assert.equal((html.match(/<h1[ >]/g) || []).length, 1);
    assert.match(html, /Content temporarily unavailable/);
    assert.match(html, /Try again/);
    assert.doesNotMatch(html, /type="email"/);
    assert.equal(errors.length, 0);
  } finally {
    global.fetch = originalFetch; console.error = originalError;
    if (path.resolve(temporary).startsWith(path.resolve(os.tmpdir()) + path.sep)) fs.rmSync(temporary, { recursive: true, force: true });
  }
});
