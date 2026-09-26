// SWC-backed server render harness. No application listener or browser.
const fs = require('node:fs');
const path = require('node:path');
const { createRequire } = require('node:module');
const React = require('react');
const { transformSync } = require('next/dist/build/swc');
const root = path.resolve(__dirname, '..');

function harness(reactOverrides = {}) {
  const cache = new Map();
  let search = '', pathname = '/';
  function load(file) {
    if (cache.has(file)) return cache.get(file).exports;
    if (file.endsWith('.css')) return { __esModule: true, default: {} };
    const source = fs.readFileSync(file, 'utf8');
    const { code } = transformSync(source, { filename: file, jsc: { parser: { syntax: 'ecmascript', jsx: true }, transform: { react: { runtime: 'automatic' } } }, module: { type: 'commonjs' } });
    const mod = { exports: {} };
    cache.set(file, mod);
    const nativeRequire = createRequire(file);
    function localRequire(id) {
      if (id === 'react') return { ...React, ...reactOverrides };
      if (id === 'next/navigation') return { useSearchParams: () => new URLSearchParams(search), usePathname: () => pathname, notFound: () => { throw new Error('not-found'); } };
      if (id === 'next/font/local') return () => ({ variable: '--offline-test-font' });
      if (id === 'next/link') return ({ children, ...props }) => React.createElement('a', props, children);
      if (id === 'next/image') return ({ priority, ...props }) => React.createElement('img', props);
      if (id.startsWith('@/') || id.startsWith('.')) {
        let target = id.startsWith('@/') ? path.join(root, id.slice(2)) : path.resolve(path.dirname(file), id);
        if (!path.extname(target)) target += '.js';
        return load(target);
      }
      return nativeRequire(id);
    }
    new Function('require', 'module', 'exports', code)(localRequire, mod, mod.exports);
    return mod.exports;
  }
  return { load: file => load(path.join(root, file)), route(query = '', pathName = '/') { search = query; pathname = pathName; } };
}

module.exports = { harness, React, root };
