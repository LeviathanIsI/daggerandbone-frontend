const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { renderToStaticMarkup } = require('react-dom/server');
const { harness, React, root } = require('./public-harness.cjs');

const h = harness();
const sceneModules = ['HomeScene', 'MaritimeScenes', 'PageScenes', 'DetailScenes', 'SupportScenes'];
const drawings = Object.assign({}, ...sceneModules.map(name => h.load(`components/public/illustrations/${name}.js`)));
const standaloneNames = Object.keys(drawings).filter(name => !['ScentGuideScene','ProductScene','ScentDetailScene','UtilityScene'].includes(name));

// Inspect the rendered SVG ancestry, including nested primitives, without a browser.
function pigmentPaths(html) {
  const groups = [], paths = [];
  const attrs = source => Object.fromEntries([...source.matchAll(/([\w-]+)="([^"]*)"/g)].map(m => [m[1],m[2]]));
  for (const [, closing, tag, source] of html.matchAll(/<(\/?)(g|path)\b([^>]*)>/g)) {
    if (tag === 'g') {
      if (closing) groups.pop();
      else groups.push(attrs(source));
    } else if (!closing) {
      const a = attrs(source);
      if (a['data-pigment']) paths.push({ ...a, ancestors:groups.map(g => ({ ...g })) });
    }
  }
  return paths;
}

test('every public scene has area pigment, a restrained palette and undimmed focal washes', () => {
  const css = fs.readFileSync(path.join(root,'app/illustrations.css'),'utf8');
  const strength = Number(css.match(/\.pigment-wash\s*\{[^}]*opacity:\s*([.\d]+)/)?.[1]);
  assert.ok(strength >= .65 && strength < 1, 'visible translucent fills, not low-opacity outline tints');
  assert.doesNotMatch(css, /mix-blend-mode:\s*(?:multiply|darken|color-burn)/);
  for (const name of standaloneNames) {
    const html = renderToStaticMarkup(React.createElement(drawings[name]));
    const washes = pigmentPaths(html), tones = new Set(washes.map(p => p['data-pigment']));
    assert.ok(tones.size >= 2 && tones.size <= 3, `${name}: two or three pigment colors`);
    for (const wash of washes) {
      assert.match(wash.d, /Z/i, `${name}: actual filled area`);
      assert.equal(wash['fill-rule'], 'evenodd', 'authored dry gaps remain transparent');
      assert.match(wash.filter, /^url\(#db-.+-pigment\)$/);
      assert.ok(wash.ancestors.some(g => g.class === 'scene-artwork'), 'pigment keeps the existing outer feather');
    }
    assert.ok(washes.some(p => !p.class.includes('pigment-light') &&
      p.ancestors.every(g => g.opacity === undefined || Number(g.opacity) >= .85)), `${name}: focal color is not multiplied by a dim ancestor`);
    const floor = Number(html.match(/<feFuncA[^>]*intercept="([.\d]+)"/)?.[1]);
    assert.ok(strength * floor >= .4, 'the densest wash keeps useful alpha even in its driest central patch');
  }
});

test('washes travel with sails, water, leaves, doors, paper, liquid and selected provisioning objects', () => {
  const pairs = {
    ApothecaryStillScene:['still-liquid','still-receiver-ripple','still-hearth-flame'],
    SailsScene:['anim-sail-upper','anim-sail-main','anim-sail-fore','anim-water-mid','anim-water-front'],
    CabinetScene:['anim-botanical','door-left','door-right','anim-drawer'],
    CurrentScene:['cabin-hanging-lantern','cabin-woodlight'],
    ProvisioningScene:['provision-linen','provision-tag'],
    CraftWorkbenchScene:['anim-balance','anim-botanical'],
    CorrespondenceScene:['anim-paper','anim-quill'],
    HandbookScene:['anim-page'], PreparationScene:['anim-tag'],
    ConditionerScene:['anim-linen'], BodyWashScene:['anim-linen'], HandLotionScene:['anim-paper'],
    BodyLotionScene:['anim-linen'], CologneScene:['anim-blotters'], MordantStudyScene:['anim-linen'],
    DispatchScene:['anim-paper','anim-tag'], ClosedFolioScene:['anim-quill'],
    ChartCaseScene:['anim-scroll'], RepairScene:['anim-caliper','anim-mechanism'], ShutterScene:['anim-latch'],
  };
  for (const [name, movingGroups] of Object.entries(pairs)) {
    const washes = pigmentPaths(renderToStaticMarkup(React.createElement(drawings[name])));
    for (const moving of movingGroups) assert.ok(washes.some(p => p.ancestors.some(g =>
      (g.class || '').split(/\s+/).includes(moving))), `${name}: paint belongs to ${moving}, not a stationary overlay`);
  }
});

test('all original scenes have unique, resolved paints and artwork-only feather masks, with no raster embedding', () => {
  const html = renderToStaticMarkup(React.createElement(React.Fragment, null,
    ...standaloneNames.map((name, index) => React.createElement(drawings[name], { key: index }))));
  assert.equal((html.match(/<svg\b/g) || []).length, 24);
  assert.equal((html.match(/<mask\b/g) || []).length, 24);
  assert.doesNotMatch(html, /<image\b|<foreignObject\b|data:image|(?:href|src)="https?:\/\/|<button|tabindex|onClick/i);
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(ids.length, new Set(ids).size);
  const references = [...html.matchAll(/url\(#([^)]+)\)/g)].map(match => match[1]);
  for (const id of references) assert.ok(ids.includes(id), `paint or mask exists: ${id}`);
  const scenes = [...html.matchAll(/data-scene="([^"]+)"/g)].map(match => match[1]);
  assert.equal(scenes.length, new Set(scenes).size, 'completed scenes have distinct identities');
  assert.match(html, /feGaussianBlur/);
  assert.match(html, /maskUnits="userSpaceOnUse"/);
  const publicFiles = fs.readdirSync(path.join(root, 'public'), { recursive:true }).join('\n');
  assert.doesNotMatch(publicFiles, /ships-in-a-gale|shipping-engraving|cabinet-full|apothecary-interior|SOURCES\.md/);
  assert.match(publicFiles, /brand-logo\.png/, 'original crest file is preserved');
});

test('every public route receives its own completed scene; guide scenes never leak into other pages', () => {
  const archive = JSON.parse(fs.readFileSync(path.join(root, 'data/published-snapshot.json'), 'utf8'));
  const PublicSite = h.load('components/public/PublicSite.js').default;
  function scenes(kind, extra={}) {
    const html = renderToStaticMarkup(React.createElement(PublicSite, { kind, data: { ...archive, page:{}, ...extra } }));
    assert.doesNotMatch(html, /scene-controls|Replay illustration|Pause motion|Fold cabinet doors|brand-logo\.png|brand-favicon\.png/);
    return [...html.matchAll(/data-scene="([^"]+)"/g)].map(match => match[1]);
  }
  const expected = { home:'home-apothecary-still', collection:'collection-provisioning', about:'about-craft-workbench', campaign:'campaign-preparation-table', faq:'faq-navigators-handbook', contact:'contact-writing-desk', signup:'signup-dispatch-rack', unsubscribe:'unsubscribe-closed-folio', notfound:'notfound-chart-case', error:'error-instrument-repair', unavailable:'unavailable-shutter-latch' };
  for (const [kind, scene] of Object.entries(expected)) assert.deepEqual(scenes(kind), [scene], kind);
  assert.deepEqual(scenes('scents').sort(), ['guide-cabinet','guide-lantern','guide-sailing-ship']);
  const products = archive.products.flatMap(item => scenes('product', { item }));
  const scents = archive.scents.flatMap(item => scenes('scent', { item }));
  assert.equal(products.length, 7);
  assert.equal(new Set(products).size, 7);
  assert.equal(scents.length, 3);
  assert.equal(new Set(scents).size, 3);
  for (const scene of [...products, ...scents]) assert.doesNotMatch(scene, /guide-/);
});

test('decorative wrappers have no playback controls, focus targets, pointer handlers or background panels', () => {
  const DecorativeScene = h.load('components/public/illustrations/DecorativeScene.js').default;
  const html = renderToStaticMarkup(React.createElement(DecorativeScene, null, React.createElement(drawings.ApothecaryStillScene)));
  assert.match(html, /aria-hidden="true"/);
  assert.doesNotMatch(html, /<button|<a\b|tabindex|role="button"/);
  const source = fs.readFileSync(path.join(root,'components/public/MotionSurface.js'), 'utf8');
  assert.doesNotMatch(source, /onPointer|onClick|requestAnimationFrame|depth-x/);
  const css = fs.readFileSync(path.join(root,'app/illustrations.css'), 'utf8');
  assert.doesNotMatch(css, /engraving-arrive|scene-arrival/);
  assert.match(css, /animation-play-state: paused/);
  assert.match(css, /data-motion=still/);
  assert.match(css, /prefers-reduced-motion:reduce/);
  assert.match(css, /infinite/);
  assert.doesNotMatch(css, /opacity:\s*0[;\s}]|visibility:\s*hidden|display:\s*none|scene-controls/);
  const siteCss = fs.readFileSync(path.join(root,'app/site.css'), 'utf8');
  assert.match(siteCss, /\.home-voyage \.voyage-scene \{ position: relative; grid-column: 7\/-1; grid-row: 1\/3/);
  assert.doesNotMatch(siteCss, /\.voyage-scene[^\n]*position: absolute/);
});

test('homepage subject geometry is original, not the guide subjects assembled under a new scene name', () => {
  function geometry(name) {
    const markup = renderToStaticMarkup(React.createElement(drawings[name]));
    // Shared paint, hatching and the feather mask are rendering helpers, not scene geometry.
    const subject = markup.slice(markup.indexOf('<g class="scene-artwork">'));
    return new Set([...subject.matchAll(/<path\b[^>]*\bd="([^"]+)"/g)].map(match => match[1]));
  }
  const home = geometry('ApothecaryStillScene');
  assert.ok(home.size > 0, 'compare actual subject paths, not an empty render');
  for (const name of ['CabinetScene','SailsScene','CurrentScene']) {
    const guide = geometry(name);
    assert.deepEqual([...home].filter(path => guide.has(path)), [], `no finished ${name} linework is reused`);
  }
  const source = fs.readFileSync(path.join(root,'components/public/illustrations/HomeScene.js'), 'utf8');
  assert.doesNotMatch(source, /import.*(?:MaritimeScenes|EngravedParts|WorkshopParts)/);
});

test('scene frames reserve their final dimensions and no outer group has an entrance transform', () => {
  for (const name of standaloneNames) {
    const html = renderToStaticMarkup(React.createElement(drawings[name]));
    const [,viewBox,width,height] = html.match(/viewBox="([^"]+)" width="([^"]+)" height="([^"]+)"/);
    const [, , expectedWidth, expectedHeight] = viewBox.split(' ').map(Number);
    assert.equal(Number(width), expectedWidth, name);
    assert.equal(Number(height), expectedHeight, name);
    assert.match(html, /<g class="scene-artwork">/);
    assert.doesNotMatch(html, /scene-arrival/);
  }
  const css = fs.readFileSync(path.join(root,'app/illustrations.css'),'utf8');
  for (const [, selector, declaration] of css.matchAll(/([^{}]+)\{([^{}]+)\}/g)) {
    if (!/animation\s*:/.test(declaration) || /animation\s*:\s*none/.test(declaration)) continue;
    assert.doesNotMatch(selector, /\.(?:scene-artwork|scene-arrival|scene-drawing|original-illustration|illustrated-scene)\s*$/, selector);
    assert.match(declaration, /infinite/, selector);
  }
});

test('collection targets a substantial suspended assembly, retains fixed crates, and does not remount on scent selection', () => {
  const css = fs.readFileSync(path.join(root,'app/illustrations.css'),'utf8');
  const source = fs.readFileSync(path.join(root,'components/public/PublicPages.js'),'utf8');
  assert.doesNotMatch(source, /<section key=\{selected\}/, 'filter changes should preserve the running artwork timeline');
  for (const family of ['all','cordovan','mordant','flint']) {
    const html = renderToStaticMarkup(React.createElement(drawings.ProvisioningScene, { family }));
    assert.match(html, /class="provision-tackle"><g[^>]*class="engraved-pulley"/);
    assert.match(html, /M-9-75V-29M9-75V-29M-10 38Q-57 155-26 203/);
    for (const element of ['provision-tackle','provision-tie','provision-linen','provision-tag']) {
      assert.match(html, new RegExp(`class="${element}"`));
      assert.match(css, new RegExp(`\\.has-entered \\.${element} \\{ animation: [^;]+infinite;`));
    }
  }
  assert.match(css, /\.provision-tackle \{ transform-origin: 0 -75px/);
  assert.match(css, /@keyframes provision-tackle-sway[^\n]*rotate\(6deg\)[^\n]*rotate\(-5deg\)/);
  // At the 360px All display, the 278-unit free rope has ~25px peak-to-peak travel.
  const travel = 278 * (Math.sin(6 * Math.PI / 180) + Math.sin(5 * Math.PI / 180)) * 360 / 780;
  assert.ok(travel > 20, 'movement must remain noticeable at the smallest desktop display');
  assert.doesNotMatch(css, /\.has-entered \.provision-bay\s*\{[^}]*animation:/);
});

function stateHooks() {
  let cursor = 0;
  const states = [];
  return {
    reset() { cursor = 0; },
    useState(initial) {
      const key = cursor++;
      if (!(key in states)) states[key] = initial;
      return [states[key], value => { states[key] = typeof value === 'function' ? value(states[key]) : value; }];
    },
  };
}

test('viewport entry starts motion once; offscreen and hidden tabs pause, re-entry resumes, reduced motion stays complete', () => {
  const originals = Object.fromEntries(['window','document','IntersectionObserver'].map(key => [key,global[key]]));
  const hooks = stateHooks(), refs = [], effects = [], listeners = new Map();
  let refCursor = 0, observerCallback, disconnected = false, mediaCallback;
  const media = { matches:false, addEventListener(_name,fn) { mediaCallback=fn; }, removeEventListener() { mediaCallback=null; } };
  global.window = { matchMedia:() => media };
  global.document = { hidden:false, addEventListener(name,fn) { listeners.set(name,fn); }, removeEventListener(name) { listeners.delete(name); } };
  global.IntersectionObserver = class { constructor(fn) { observerCallback=fn; } observe() {} disconnect() { disconnected=true; } };
  let cleanup;
  try {
    const MotionSurface = harness({ useState:hooks.useState, useEffect:fn => effects.push(fn), useRef:initial => { const key=refCursor++; return refs[key] ||= { current:initial }; } }).load('components/public/MotionSurface.js').default;
    function render() { hooks.reset(); refCursor=0; return MotionSurface({ children:'complete drawing' }); }
    let tree=render();
    assert.equal(tree.props['data-motion'],'still', 'SSR is a complete still drawing');
    assert.equal(tree.props.children,'complete drawing');
    cleanup=effects[0]();
    tree=render();
    assert.equal(tree.props['data-motion'],'paused');
    assert.doesNotMatch(tree.props.className,/has-entered/, 'no entrance sequence at page load');
    observerCallback([{ isIntersecting:true }]);
    tree=render();
    assert.equal(tree.props['data-motion'],'running');
    assert.match(tree.props.className,/has-entered/);
    observerCallback([{ isIntersecting:false }]);
    assert.equal(render().props['data-motion'],'paused');
    assert.match(render().props.className,/has-entered/, 'animation remains mounted at its current progress');
    observerCallback([{ isIntersecting:true }]);
    assert.equal(render().props['data-motion'],'running');
    global.document.hidden=true; listeners.get('visibilitychange')();
    assert.equal(render().props['data-motion'],'paused');
    global.document.hidden=false; listeners.get('visibilitychange')();
    assert.equal(render().props['data-motion'],'running');
    media.matches=true; mediaCallback();
    tree=render();
    assert.equal(tree.props['data-motion'],'still');
    assert.equal(tree.props.children,'complete drawing');
    media.matches=false; mediaCallback();
    assert.equal(render().props['data-motion'],'running');
    cleanup(); cleanup=null;
    assert.equal(disconnected,true);
    assert.equal(listeners.size,0);
    assert.equal(mediaCallback,null);
  } finally {
    cleanup?.();
    for (const [key,value] of Object.entries(originals)) { if (value === undefined) delete global[key]; else global[key]=value; }
  }
});

test('crest remains available privately but cannot enter public artwork or favicon output', () => {
  const { isPublicImage, WORDMARK_ICON } = h.load('lib/public-media.mjs');
  assert.equal(WORDMARK_ICON, '/brand-wordmark.svg');
  for (const url of ['/brand-logo.png', '/brand-favicon.png', 'https://res.cloudinary.com/example/image/upload/brand-logo.png']) assert.equal(isPublicImage({ url }), false);
  assert.equal(isPublicImage({ url:'/new-cms-media.svg', alt:'Approved artwork' }), true);
});

test('the guide lantern hangs from a cabin bracket; the complete assembly pivots at the fixed attachment', () => {
  const html = renderToStaticMarkup(React.createElement(drawings.CurrentScene));
  for (const part of ['cabin-paneling', 'cabin-rib', 'cabin-wall-beam', 'cabin-porthole', 'cabin-bracket', 'cabin-woodlight', 'cabin-hanging-lantern']) assert.match(html, new RegExp(`class="${part}`));
  assert.match(html, /class="engraved-lantern"/);
  assert.match(html, /M118 0V45M123 0V45M102 64Q88 39 119 37Q149 39 137 64/, 'retained suspension and lantern geometry');
  assert.doesNotMatch(html, /engraved-water|current-arcs|tide-hatching|botanical-branch|anim-water/);
  assert.match(html, /translate\(450 180\) scale\(1\.15\)/);
  assert.match(html, /M588 168V174M581 180a7 7/, 'bracket eye meets the top of the suspended assembly');
  assert.equal(450 + 120 * 1.15, 588, 'lantern pivot meets the bracket eye');
  const css = fs.readFileSync(path.join(root, 'app/illustrations.css'), 'utf8');
  assert.match(css, /\.cabin-hanging-lantern \{ transform-origin: 120px 0; \}/);
  assert.match(css, /\.has-entered \.cabin-hanging-lantern \{ animation: lantern-sway 8\.5s ease-in-out infinite; \}/);
  assert.match(css, /\.cabin-hanging-lantern \.anim-lantern-body \{ animation: none; \}/, 'avoid an independent pivot at the lantern body');
});
