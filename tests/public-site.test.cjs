const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { renderToStaticMarkup } = require('react-dom/server');
const { harness, React, root } = require('./public-harness.cjs');

const archive = JSON.parse(fs.readFileSync(path.join(root, 'data/published-snapshot.json'), 'utf8'));
const h = harness();
const PublicSite = h.load('components/public/PublicSite.js').default;
const pageKeys = { home: 'home', collection: 'products', scents: 'scents', about: 'about', campaign: 'kickstarter', contact: 'contact', faq: 'faq' };

function render(kind, additions = {}) {
  const item = additions.item || {};
  const data = { site: archive.site, products: archive.products, scents: archive.scents,
    faqs: archive.faqs, page: archive.site.pages[pageKeys[kind] || kind] || {}, item,
    related: archive.products.filter(product => item?.scent && product.scent?.slug === item.scent.slug && product.slug !== item.slug),
    ...additions };
  return renderToStaticMarkup(React.createElement(PublicSite, { kind, data, reset() {} }));
}

test('all public page types keep the established brand, accessible landmarks and shared forms', () => {
  for (const kind of ['home', 'collection', 'scents', 'about', 'campaign', 'contact', 'faq', 'signup', 'unsubscribe', 'notfound', 'error', 'unavailable']) {
    const html = render(kind, kind === 'unavailable' ? { unavailable: true } : {});
    assert.equal((html.match(/<h1[ >]/g) || []).length, 1, kind);
    assert.equal((html.match(/<main[ >]/g) || []).length, 1, kind);
    assert.match(html, /id="main"/, kind);
    assert.doesNotMatch(html, /design-switcher|<label[^>]*>Design<\/label>|historical-art|\/artwork\/|nga\.gov|rijksmuseum|<image[\s>]/, kind);
    // The current brief explicitly authorizes confirmed founder facts on About only.
    if (kind !== 'about') assert.doesNotMatch(html, /Josh/, kind);
    assert.doesNotMatch(html, /brand-logo\.png|brand-favicon\.png|scene-controls|Replay illustration|Fold cabinet doors/, kind);
    assert.match(html, /brand-lockup/, kind);
  }
  const home = render('home');
  assert.match(home, /home-voyage/);
  assert.match(home, /apothecary-still-drawing/);
  assert.match(home, /still-retort/);
  assert.doesNotMatch(home, /sail-rig|apothecary-case|lantern-body/);
  assert.doesNotMatch(home, /Follow the Kickstarter launch/);
  const header = home.match(/<header class="site-header">[\s\S]*?<\/header>/)?.[0] || '';
  assert.doesNotMatch(header, /href="\/kickstarter"/);
  assert.equal((header.match(/Get notified on Kickstarter/g) || []).length, 1);
  for (const scent of archive.scents) assert.match(home, new RegExp(scent.name));
  assert.match(render('contact'), /Send message/);
  assert.match(render('signup'), /I agree to receive Kickstarter launch news and occasional collection updates/);
  assert.match(render('unsubscribe'), /Unsubscribe/);
  assert.match(render('campaign'), /six bars/);
});

test('scent filters show the right published products, and all detail routes retain CMS content', () => {
  h.route('', '/products');
  const all = render('collection');
  for (const product of archive.products) assert.match(all, new RegExp(`/products/${product.slug}`));
  h.route('scent=flint', '/products');
  const flint = render('collection');
  assert.match(flint, /Showing Flint products/);
  assert.match(flint, /display-flint/);
  assert.match(flint, /exhibit-flint/);
  assert.match(flint, /flint-cologne/);
  assert.doesNotMatch(flint, /mordant-shampoo/);
  h.route('kind=shampoo', '/products');
  for (const product of archive.products) assert.match(render('collection'), new RegExp(`/products/${product.slug}`), 'obsolete type selections no longer hide products');
  for (const slug of ['cordovan', 'mordant', 'flint']) {
    h.route(`scent=${slug}`, '/products');
    const html = render('collection');
    for (const product of archive.products) assert.equal(html.includes(`/products/${product.slug}`), product.scent.slug === slug);
    assert.match(html, new RegExp(`aria-pressed="true"[^>]*>${slug[0].toUpperCase() + slug.slice(1)}<small>`));
  }
  h.route('', '/');
  const guide = render('scents');
  for (const chapter of ['chapter-1', 'chapter-2', 'chapter-3']) assert.match(guide, new RegExp(chapter));
  for (const product of archive.products) {
    const html = render('product', { item: product });
    assert.match(html, new RegExp(product.name));
    assert.match(html, /In development/);
    assert.match(html, new RegExp(`/scents/${product.scent.slug}`));
  }
  for (const scent of archive.scents) {
    const html = render('scent', { item: scent });
    assert.match(html, new RegExp(scent.name));
    for (const product of archive.products.filter(product => product.scent.slug === scent.slug)) assert.match(html, new RegExp(`/products/${product.slug}`));
  }
});

test('scent selection preserves route and unrelated URL state, retiring the removed type facet', () => {
  const { updateCollectionQuery } = h.load('components/public/PublicPages.js');
  const originalWindow = global.window;
  let target;
  global.window = {
    location: { href: 'https://example.test/products?kind=shampoo&campaign=founding#collection-display' },
    history: { pushState(_state, _unused, url) { target = url; global.window.location.href = new URL(url, 'https://example.test').href; } },
  };
  try {
    updateCollectionQuery({ scent: 'mordant' });
    assert.equal(target, '/products?campaign=founding&scent=mordant#collection-display');
    updateCollectionQuery({ scent: 'all', kind: 'all' });
    assert.equal(target, '/products?campaign=founding#collection-display');
    h.route('scent=invalid&kind=invalid', '/products');
    const html = render('collection');
    assert.match(html, /Showing all products/);
    for (const product of archive.products) assert.match(html, new RegExp(`/products/${product.slug}`));
  } finally { global.window = originalWindow; h.route('', '/'); }
});

test('prelaunch pages remove redundant controls, descriptions, calls to action and reward diagrams', () => {
  h.route('', '/');
  const home = render('home');
  const main = home.match(/<main[\s\S]*?<\/main>/)[0];
  assert.match(main, /Men&#x27;s hair, skin, and body care\. Three custom scents\. Our first collection is in development\./);
  assert.equal((main.match(/Get notified on Kickstarter/g) || []).length, 1);
  assert.equal((main.match(/home-family-list/g) || []).length, 1);
  assert.doesNotMatch(main, /voyage-entries|product-links|product-tile/);
  assert.equal((main.match(/Each edition contains six bars/g) || []).length, 1);
  for (const kind of ['home', 'collection', 'scents', 'about', 'faq', 'campaign', 'contact']) {
    const html = render(kind);
    assert.doesNotMatch(html, /An opening scent|Stay with the first collection|reward-allocation|botanical packaging|Campaign &amp; founding rewards/i, kind);
    assert.equal((html.match(/newsletter-form/g) || []).length, 1, kind);
    const footer = html.slice(html.indexOf('<footer'));
    assert.equal((footer.match(/href="\/contact"/g) || []).length, 1);
    assert.doesNotMatch(footer, /href="\/signup"|First word|when there is news/);
    assert.match(footer, /Get the launch email/);
    assert.match(footer, /Email me updates/);
    assert.match(footer, /does not follow the campaign on Kickstarter/);
    for (const [, href, body] of html.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)) {
      if (href.startsWith('/') || href.startsWith('#')) assert.doesNotMatch(body, /↗/, `${kind}: ${href}`);
    }
  }
  const collection = render('collection');
  assert.doesNotMatch(collection, /type="search"|<select|of 7 products|Clear filters|tile-foot|tile-scent/);
  assert.ok(collection.indexOf('data-scene="collection-provisioning"') < collection.indexOf('class="family-selector"'), 'art is in the introduction, ahead of the controls');
  assert.ok(collection.indexOf('class="collection-manifest"') > collection.indexOf('class="family-selector"'));
  for (const product of archive.products) {
    const link = collection.match(new RegExp(`<a[^>]*href="/products/${product.slug}"[^>]*>([\\s\\S]*?)</a>`));
    assert.ok(link, product.name);
    assert.doesNotMatch(link[1], /Details|tile-summary|tile-scent/);
    const label = product.name.replace(product.scent.name + ' ', '');
    const heading = link[1].match(/<h3\b[^>]*>([\s\S]*?)<\/h3>/)?.[1];
    assert.equal(heading?.replace(/<[^>]*>/g, ''), label, 'decorative name treatment preserves the product label');
  }
  assert.equal((render('campaign').match(/Each edition contains six bars/g) || []).length, 1);
  const about = render('about');
  assert.match(about, /Josh, our founder/);
  assert.match(about, /St\. Augustine, Florida/);
  assert.doesNotMatch(about, /about-position|Follow the Kickstarter launch/);
  const faq = render('faq');
  assert.equal((faq.match(/<details open="">/g) || []).length, 4);
  assert.match(faq, /Which scents are in the first collection\?/);
  assert.match(faq, /The first seven products are in development/);
  assert.match(faq, /campaign launch is separate from product delivery/);
});

test('navigation is focused, and campaign dates and destinations remain tied to shared settings', () => {
  const html = render('home');
  const nav = html.match(/<nav aria-label="Main navigation">([\s\S]*?)<\/nav>/)[1];
  assert.deepEqual([...nav.matchAll(/href="([^"]+)"/g)].map(match => match[1]), ['/products', '/scents', '/about']);
  const mobile = html.match(/<nav aria-label="Mobile navigation">([\s\S]*?)<\/nav>/)[1];
  assert.match(mobile, /href="\/contact"/);
  assert.match(mobile, /href="\/faq"/);
  assert.match(html, /aria-label="Dagger &amp; Bone Apothecary home"/);
  const changedSite = structuredClone(archive.site);
  changedSite.settings.kickstarterLaunchDate = '2027-02-03';
  changedSite.settings.kickstarterUrl = 'https://example.test/campaign';
  for (const kind of ['home', 'campaign', 'faq', 'product']) {
    const changed = render(kind, { site: changedSite, item: archive.products[0] });
    assert.match(changed, /February 3, 2027/);
    assert.doesNotMatch(changed, /October 15, 2026/);
    assert.match(changed, /href="https:\/\/example.test\/campaign"/);
  }
});

test('new CMS copy and valid media appear without changing presentation code', () => {
  const page = { ...archive.site.pages.about, sections: [{ heading: 'Saved CMS section', body: 'Owner-edited text.' }], images: [{ url: '/approved-art.svg', alt: 'Approved page artwork', width: 1000, height: 1000 }] };
  const html = render('about', { page });
  assert.match(html, /Saved CMS section/);
  assert.match(html, /Owner-edited text/);
  assert.match(html, /Approved page artwork/);
  const product = { ...archive.products[0], summary: 'Saved description.', images: [{ url: '/approved-product.svg', alt: 'Approved product artwork' }] };
  const detail = render('product', { item: product });
  assert.match(detail, /Saved description/);
  assert.match(detail, /Approved product artwork/);
  const site = { ...archive.site, settings: { ...archive.site.settings, brandName: 'Owner-edited brand', tagline: 'Owner-edited tagline.', logo: { url: '/brand-logo.png', alt: 'Original crest' }, homeImage: { url: '/approved-home.svg', alt: 'Owner home artwork' } }, pages: { ...archive.site.pages, home: { ...archive.site.pages.home, eyebrow: 'Owner-edited eyebrow' } } };
  const home = render('home', { site, page: site.pages.home });
  assert.match(home, /Owner-edited brand/);
  assert.match(home, /Owner-edited tagline/);
  assert.match(home, /Owner-edited eyebrow/);
  assert.match(home, /approved-home.svg/);
  assert.doesNotMatch(home, /brand-logo\.png/);
  const editedScent = { ...archive.scents[0], summary: 'An approved scent character.', body: 'Approved notes from the owner.' };
  const scentSite = render('scents', { scents: [editedScent, ...archive.scents.slice(1)] });
  assert.match(scentSite, /An approved scent character/);
  assert.match(scentSite, /Approved notes from the owner/);
  const editedSignup = { ...site, pages: { ...site.pages, signup: { title: 'An edited email title', intro: 'Owner-edited signup introduction.', body: 'Owner-edited signup context.' } } };
  for (const kind of ['home', 'signup']) {
    const edited = render(kind, { site: editedSignup });
    assert.match(edited, /An edited email title/);
    assert.match(edited, /Owner-edited signup introduction/);
    assert.match(edited, /Owner-edited signup context/);
  }
});

test('Kickstarter actions are native new-tab anchors and all other public navigation stays in this tab', () => {
  const { CampaignAction } = h.load('components/public/PublicElements.js');
  const campaign = archive.site.settings.kickstarterUrl;
  const element = CampaignAction({ d: { campaign } });
  assert.equal(element.type, 'a');
  assert.equal(element.props.href, campaign);
  assert.equal(element.props.target, '_blank');
  assert.equal(element.props.rel, 'noopener noreferrer');
  assert.equal(element.props.onClick, undefined, 'no handler substitutes client navigation for anchor behavior');
  const states = ['home', 'collection', 'scents', 'about', 'campaign', 'contact', 'faq', 'signup', 'unsubscribe', 'notfound', 'error', 'unavailable'].map(kind => [kind, {}]);
  states.push(...archive.products.map(item => ['product', { item }]), ...archive.scents.map(item => ['scent', { item }]));
  for (const [kind, extra] of states) {
    const html = render(kind, extra);
    const header = html.match(/<header class="site-header">[\s\S]*?<\/header>/)[0];
    assert.equal((header.match(/Get notified on Kickstarter/g) || []).length, 1);
    for (const [, attrs, content] of html.matchAll(/<a\b([^>]+)>([\s\S]*?)<\/a>/g)) {
      if (/↗/.test(content)) {
        assert.match(attrs, /target="_blank"/);
        assert.match(attrs, /rel="noopener noreferrer"/);
        assert.match(content, /<span class="sr-only"> \(opens in a new tab\)<\/span>/);
        assert.match(content, /<span aria-hidden="true">↗<\/span>/);
      }
      if (/href="[\/#]/.test(attrs)) assert.doesNotMatch(attrs + content, /target="_blank"|↗/);
    }
    for (const [, content] of html.matchAll(/<button\b[^>]*>([\s\S]*?)<\/button>/g)) assert.doesNotMatch(content, /↗/, kind);
  }
  const fallback = renderToStaticMarkup(React.createElement(CampaignAction, { d: { campaign: '/kickstarter' } }));
  assert.match(fallback, /Campaign &amp; rewards/);
  assert.doesNotMatch(fallback, /target=|rel=|↗|new tab/);
});

test('public decorations keep one intentional inscription and do not repeat complete arrangements on a page', () => {
  h.route('', '/');
  const states = ['home', 'collection', 'scents', 'about', 'campaign', 'contact', 'faq', 'signup', 'unsubscribe', 'notfound', 'error', 'unavailable'].map(kind => [kind, {}]);
  states.push(...archive.products.map(item => ['product', { item }]), ...archive.scents.map(item => ['scent', { item }]));
  for (const [kind, extra] of states) {
    const html = render(kind, extra);
    const decorations = html.match(/<svg class="journal-layers"[\s\S]*?<\/svg>/g) || [];
    assert.ok(decorations.length >= 2, `${kind}: nonverbal decorative coverage remains`);
    const lettering = decorations.flatMap(svg => [...svg.matchAll(/<text\b[^>]*>([^<]*)<\/text>/g)].map(match => match[1]));
    assert.deepEqual(lettering, kind === 'scents' ? ['The scent journal'] : [], kind);
    const variants = [...html.matchAll(/data-journal-decoration="([^"]+)"/g)].map(match => match[1]);
    assert.equal(variants.length, new Set(variants).size, `${kind}: no stacked copies of an arrangement`);
    assert.doesNotMatch(html, /journal-inscription|journal-composition-(?:slip|binding)\b/);
    for (const svg of decorations) {
      assert.match(svg, /focusable="false" aria-hidden="true"/);
      assert.doesNotMatch(svg, /<a\b|<button\b|tabindex|<image\b|<animate\b|<set\b/i);
    }
    const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
    assert.equal(ids.length, new Set(ids).size, `${kind}: SVG paints remain isolated`);
    for (const [, id] of html.matchAll(/url\(#([^)]+)\)/g)) assert.ok(ids.includes(id), `${kind}: ${id} resolves`);
  }
});

test('decorative helpers no longer accept copied CMS headings or scent labels', () => {
  const ornaments = h.load('components/public/JournalOrnament.js');
  for (const component of [ornaments.default, ornaments.JournalComposition, ornaments.JournalSpace]) {
    const html = renderToStaticMarkup(React.createElement(component, { variant: 'botanical', inscription: 'Copied CMS title', title: 'Copied scent name' }));
    assert.doesNotMatch(html, /Copied CMS title|Copied scent name|<text\b/);
  }
  h.route('scent=flint', '/products');
  const html = render('collection');
  assert.match(html, /flint-cologne/);
  assert.doesNotMatch(html, /mordant-shampoo|<text\b|journal-inscription/);
  h.route('', '/');
});
