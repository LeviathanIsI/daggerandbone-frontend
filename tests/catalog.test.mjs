import test from 'node:test';
import assert from 'node:assert/strict';
import { buildFamilies, filterFamilies, productCount, resolveFilter } from '../lib/catalog.mjs';

const scents = [
  { slug: 'mordant', name: 'Mordant', summary: '', images: [] },
  { slug: 'flint', name: 'Flint', summary: '', images: [] },
  { slug: 'cordovan', name: 'Cordovan', summary: '', images: [] },
];
const mappings = [
  ['mordant', 'bar soap'], ['cordovan', 'body lotion'], ['flint', 'cologne'],
  ['mordant', 'conditioner'], ['cordovan', 'hand lotion'], ['mordant', 'shampoo'], ['cordovan', 'body wash'],
];
const products = mappings.map(([slug, kind]) => ({
  slug: `${slug}-${kind.replaceAll(' ', '-')}`, name: `${slug} ${kind}`, kind,
  scent: scents.find((scent) => scent.slug === slug), images: [],
}));

test('All shows seven products under the requested three families', () => {
  const families = buildFamilies(products, scents);
  assert.equal(productCount(filterFamilies(families, 'all')), 7);
  assert.deepEqual(families.map(({ scent, products }) => [scent.slug, products.map((product) => product.kind)]), [
    ['cordovan', ['body wash', 'hand lotion', 'body lotion']],
    ['mordant', ['shampoo', 'conditioner', 'bar soap']],
    ['flint', ['cologne']],
  ]);
});

test('each selected scent excludes unrelated products, including the single Flint product', () => {
  const families = buildFamilies(products, scents);
  for (const [slug, count] of [['cordovan', 3], ['mordant', 3], ['flint', 1]]) {
    const visible = filterFamilies(families, slug);
    assert.equal(resolveFilter(families, slug), slug);
    assert.equal(visible.length, 1);
    assert.equal(productCount(visible), count);
    assert.ok(visible[0].products.every((product) => product.scent.slug === slug));
  }
});

test('All restores every product; removed selections resolve to All', () => {
  const families = buildFamilies(products, scents);
  assert.equal(productCount(filterFamilies(families, 'flint')), 1);
  assert.equal(productCount(filterFamilies(families, 'all')), 7);
  const withoutFlint = families.filter(({ scent }) => scent.slug !== 'flint');
  assert.equal(resolveFilter(withoutFlint, 'flint'), 'all');
  assert.equal(productCount(filterFamilies(withoutFlint, 'flint')), 6);
});

test('new CMS scents, categories and media are retained without an opening-range restriction', () => {
  const nextScent = { slug: 'additional-scent', name: 'Additional scent', images: [{ url: 'https://example.invalid/art.png', alt: 'Admin image' }] };
  const nextProduct = { slug: 'new-product', name: 'New product', kind: 'new category', scent: nextScent, images: [{ url: 'https://example.invalid/product.png' }] };
  const families = buildFamilies([...products, nextProduct], [...scents, nextScent]);
  assert.equal(productCount(families), 8);
  const selected = filterFamilies(families, nextScent.slug);
  assert.equal(selected[0].scent, nextScent);
  assert.equal(selected[0].products[0], nextProduct);
  assert.equal(families.length, 4);
});

test('grouping preserves source records and handles an empty collection', () => {
  const before = JSON.stringify({ products, scents });
  buildFamilies(products, scents);
  assert.equal(JSON.stringify({ products, scents }), before);
  assert.deepEqual(buildFamilies([], scents), []);
  assert.deepEqual(filterFamilies([], 'flint'), []);
  assert.equal(productCount([]), 0);
});
