import { getPublishedContent } from '@/lib/published-content';

export default async function robots() {
  const { bundle, offline } = await getPublishedContent();
  const base = bundle?.site?.settings?.canonicalUrl;
  return !offline && base ? {
    rules: { userAgent: '*', allow: '/', disallow: ['/admin', '/admin/', '/unsubscribe'] },
    sitemap: `${base.replace(/\/$/, '')}/sitemap.xml`,
  } : { rules: { userAgent: '*', disallow: '/' } };
}
