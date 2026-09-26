import { getPublishedContent } from '@/lib/published-content';

export default async function sitemap() {
  const { bundle, offline } = await getPublishedContent();
  const site = bundle?.site;
  const base = site?.settings?.canonicalUrl?.replace(/\/$/, '');
  if (offline || !base) return [];
  const paths = Object.values(site.pages || {}).map(page => page.slug).filter(route =>
    ['/', '/products', '/scents', '/about', '/kickstarter', '/contact', '/faq'].includes(route));
  if (site.pages?.products) for (const item of bundle.products) paths.push(`/products/${item.slug}`);
  if (site.pages?.scents) for (const item of bundle.scents) paths.push(`/scents/${item.slug}`);
  return paths.map(route => ({ url: `${base}${route}` }));
}
