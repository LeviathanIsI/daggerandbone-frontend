import './globals.css';
import './site.css';
import './illustrations.css';
import localFont from 'next/font/local';
import { Suspense } from 'react';
import { getPublishedContent } from '@/lib/published-content';
import { isPublicImage, WORDMARK_ICON } from '@/lib/public-media.mjs';

const interfaceFont = localFont({ src:'../node_modules/@fontsource-variable/dm-sans/files/dm-sans-latin-standard-normal.woff2', variable:'--font-interface', weight:'100 1000', display:'swap' });

export async function generateMetadata() {
  const { bundle, offline } = await getPublishedContent();
  const site = bundle?.site;
  return {
    title: 'Dagger & Bone Apothecary',
    description: "Dagger & Bone Apothecary brings custom scents and an irreverent attitude to men's hair, skin, and body care.",
    icons: { icon: isPublicImage(site?.settings?.favicon) ? site.settings.favicon.url : WORDMARK_ICON },
    ...(offline ? { robots: { index: false } } : {}),
  };
}
export default async function RootLayout({ children }) {
  const { bundle } = await getPublishedContent();
  const site = bundle?.site;
  const org = { '@context':'https://schema.org','@type':'Organization',name:site?.settings?.brandName || 'Dagger & Bone Apothecary',address:{'@type':'PostalAddress',addressLocality:'St. Augustine',addressRegion:'FL',addressCountry:'US'},sameAs:site?.settings?.kickstarterUrl ? [site.settings.kickstarterUrl] : undefined };
  const json = JSON.stringify(org).replace(/</g,'\\u003c');
  return <html lang="en" className={interfaceFont.variable}><body><a className="skip-link" href="#main">Skip to content</a><Suspense>{children}</Suspense>{site && <script type="application/ld+json" dangerouslySetInnerHTML={{__html:json}} />}</body></html>;
}
