// Public display helpers only. Content and publication rules stay in the API.
export function scentTone(scent) {
  const slug = typeof scent === 'string' ? scent : scent?.slug;
  return ['mordant', 'cordovan', 'flint'].includes(slug) ? `tone-${slug}` : 'tone-botanical';
}

export function productsForScent(scent, products = []) {
  return products.filter((product) => product.scent?.slug === scent.slug ||
    (scent._id && product.scent?._id && String(scent._id) === String(product.scent._id)));
}

export function launchDate(value) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
}

export function paragraphs(text) {
  return String(text || '').split(/\n\s*\n/).map((part) => part.trim()).filter(Boolean);
}
