// Presentation order only. The API remains responsible for publication and access.
const openingOrder = ['cordovan', 'mordant', 'flint'];
const categoryOrder = ['body wash', 'hand lotion', 'body lotion', 'shampoo', 'conditioner', 'bar soap', 'cologne'];
const rank = (value, order) => order.includes(value) ? order.indexOf(value) : order.length;

export function orderScents(scents = []) {
  return [...scents].sort((a, b) => rank(a.slug, openingOrder) - rank(b.slug, openingOrder) || a.name.localeCompare(b.name));
}

export function orderProducts(products = []) {
  return [...products].sort((a, b) => rank(a.kind?.toLowerCase(), categoryOrder) - rank(b.kind?.toLowerCase(), categoryOrder) || a.name.localeCompare(b.name));
}

export function buildFamilies(products = [], scents = []) {
  const savedScents = new Map(scents.map((scent) => [scent.slug, scent]));
  const groups = new Map();
  for (const product of products) {
    const scent = product.scent;
    if (!scent?.slug) continue;
    if (!groups.has(scent.slug)) groups.set(scent.slug, { scent: savedScents.get(scent.slug) || scent, products: [] });
    groups.get(scent.slug).products.push(product);
  }
  return orderScents([...groups.values()].map((group) => group.scent)).map((scent) => ({ scent, products: orderProducts(groups.get(scent.slug).products) }));
}

export function resolveFilter(families, selected) {
  return families.some(({ scent }) => scent.slug === selected) ? selected : 'all';
}

export function filterFamilies(families, selected = 'all') {
  const active = resolveFilter(families, selected);
  return active === 'all' ? families : families.filter(({ scent }) => scent.slug === active);
}

export function productCount(families) {
  return families.reduce((total, family) => total + family.products.length, 0);
}
