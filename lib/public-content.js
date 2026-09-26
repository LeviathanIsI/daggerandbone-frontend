import { notFound } from 'next/navigation';
import { pageMetadata } from './api';
import { isPublicImage, publicImages } from './public-media.mjs';
import { getPublishedContent } from './published-content';

const pageKeys = { home: 'home', collection: 'products', scents: 'scents', about: 'about', campaign: 'kickstarter', contact: 'contact', faq: 'faq' };
const paths = { home: '/', collection: '/products', scents: '/scents', about: '/about', campaign: '/kickstarter', contact: '/contact', faq: '/faq', signup: '/signup', unsubscribe: '/unsubscribe' };

export async function loadPublicContent(kind, slug) {
  const { bundle, offline } = await getPublishedContent();
  if (!bundle) return { unavailable: true };
  const site = bundle.site;
  const detail = kind === 'product' ? bundle.productDetails[slug] : kind === 'scent' ? bundle.scentDetails[slug] : null;
  const page = site.pages?.[pageKeys[kind] || kind];
  if ((pageKeys[kind] && !page) || (['product', 'scent'].includes(kind) && !detail?.item)) notFound();
  return { site, page: page || {}, products: bundle.products, scents: bundle.scents,
    item: detail?.item || null, related: detail?.relatedProducts || [], faqs: bundle.faqs,
    snapshotInfo: offline ? { capturedAt: bundle.capturedAt, source: bundle.source } : null };
}
export async function publicMetadata(kind, slug) {
  const { bundle, offline } = await getPublishedContent();
  if (!bundle) return { title: 'Content temporarily unavailable | Dagger & Bone Apothecary', robots: { index: false } };
  const site = bundle.site;
  if (['product', 'scent'].includes(kind)) {
    const item = (kind === 'product' ? bundle.productDetails[slug] : bundle.scentDetails[slug])?.item;
    return item ? { ...pageMetadata({ title: item.seo?.title || item.name, description: item.seo?.description || item.summary, path: `/${kind === 'product' ? 'products' : 'scents'}/${slug}`, image: publicImages(item)[0]?.url, canonicalBase: site.settings.canonicalUrl }), ...(offline ? { robots: { index: false } } : {}) } : { title: 'Page not found', robots: { index: false } };
  }
  const page = site?.pages?.[pageKeys[kind] || kind];
  return { ...pageMetadata({ title: page?.seo?.title || page?.title || (kind === 'signup' ? 'Email updates' : 'Unsubscribe from emails'), description: page?.seo?.description || page?.intro || 'Unsubscribe your email address from Dagger & Bone Apothecary updates.', path: paths[kind], image: kind === 'home' && isPublicImage(site?.settings?.homeImage) ? site.settings.homeImage.url : undefined, canonicalBase: site?.settings?.canonicalUrl }), ...(offline ? { robots: { index: false } } : {}) };
}
