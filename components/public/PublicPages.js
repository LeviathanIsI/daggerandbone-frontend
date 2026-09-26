'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import BodyText from '@/components/BodyText';
import BrandFigure from '@/components/BrandFigure';
import ContactForm from '@/components/ContactForm';
import NewsletterForm from '@/components/NewsletterForm';
import UnsubscribeForm from '@/components/UnsubscribeForm';
import { isPublicImage, publicImages } from '@/lib/public-media.mjs';
import DecorativeScene from './illustrations/DecorativeScene';
import { ScentGuideScene } from './illustrations/MaritimeScenes';
import { ApothecaryStillScene } from './illustrations/HomeScene';
import { ProvisioningScene, CraftWorkbenchScene, PreparationScene, HandbookScene } from './illustrations/PageScenes';
import { ProductScene, ScentDetailScene } from './illustrations/DetailScenes';
import { UtilityScene } from './illustrations/SupportScenes';
import { CampaignAction, Launch, Status, ImageSet, ItemCopy, ProductTile, ProductLinks } from './PublicElements';
import { signupContent } from '@/lib/signup-content';
import JournalOrnament, { JournalComposition, JournalSpace } from './JournalOrnament';

// Emphasize an existing phrase without rewriting, duplicating or interpreting CMS text.
function PhraseEmphasis({ text = '', phrase }) {
  const index = text.indexOf(phrase);
  return index < 0 ? text : <>{text.slice(0, index)}<em className="editorial-emphasis">{phrase}</em>{text.slice(index + phrase.length)}</>;
}
function HomeHeadline({ title }) {
  if (title === "Your masculinity isn't water-soluble.") return <><span>Your masculinity</span><span>isn&apos;t <PhraseEmphasis text="water-soluble." phrase="water-soluble"/></span></>;
  return title;
}
function Home({ d }) {
  return <>
    <section className="home-voyage" aria-labelledby="home-title">
      <header className="voyage-heading"><span className="eyebrow">{d.page.eyebrow || 'Dagger & Bone Apothecary'}</span><h1 id="home-title"><HomeHeadline title={d.page.title}/></h1></header>
      <DecorativeScene className="voyage-scene"><ApothecaryStillScene/></DecorativeScene>
      <div className="voyage-copy"><p className="lead">{d.page.intro}</p><BodyText text={d.page.body}/><div className="hero-actions"><CampaignAction d={d}/></div></div>
    </section>
    <section className="home-discovery"><JournalOrnament motif="ribbon" className="home-discovery-penwork"/><header className="section-heading"><div><span className="eyebrow">The first collection</span><h2>{d.site.pages?.products?.title || 'Hair. Skin. Body.'}</h2></div><Link className="text-action" href="/products">Explore the collection <span aria-hidden="true">→</span></Link></header>
      {isPublicImage(d.settings.homeImage) && <BrandFigure className="home-cms-art" image={d.settings.homeImage} alt={d.settings.homeImage.alt || 'Dagger & Bone artwork'}/> }<div className="home-family-list">{d.families.map(({ scent }) => <section key={scent.slug} data-family={scent.slug}><h3 className="scent-name"><Link href={`/scents/${scent.slug}`}>{scent.name}</Link></h3>{scent.summary && <p>{scent.summary}</p>}</section>)}</div>
    </section>
    <section className="home-reward"><div><h2>{d.rewards[0]?.title || 'Campaign & rewards'}</h2>{d.rewards[0] && <ItemCopy item={d.rewards[0]}/>}<Link className="text-action" href={d.rewards[0] ? `/kickstarter#${d.rewards[0].slug}` : '/kickstarter'}>Campaign & rewards <span aria-hidden="true">→</span></Link></div><div className="home-launch-notes"><Launch d={d}/><JournalSpace variant="cordage" className="home-journal"/></div></section>
  </>;
}

export function updateCollectionQuery(changes) {
  const url = new URL(window.location.href);
  url.searchParams.delete('kind'); // Retire the former product-type facet in saved links.
  for (const [key, value] of Object.entries(changes)) {
    if (value === 'all' || !value) url.searchParams.delete(key);
    else url.searchParams.set(key, value);
  }
  window.history.pushState(null, '', url.pathname + url.search + url.hash);
}
function Collection({ d }) {
  const params = useSearchParams();
  const selected = d.scents.some(scent => scent.slug === params.get('scent')) ? params.get('scent') : 'all';
  const filtered = d.products.filter(product => selected === 'all' || product.scent?.slug === selected);
  const family = d.families.find(item => item.scent.slug === selected);
  return <section className="collection-page"><JournalComposition variant="chart-trace" className="collection-colophon"/>
    <header className="collection-heading"><div><span className="eyebrow">{d.page.eyebrow || 'The first collection'}</span><h1>{d.page.title}</h1></div><div className="collection-intro"><p className="lead">{d.page.intro}</p>{d.page.body && !/^in development\.?$/i.test(d.page.body.trim()) && <BodyText text={d.page.body}/>}<Status/></div><DecorativeScene className="exhibit-scene"><ProvisioningScene family={selected}/></DecorativeScene></header>
    <fieldset className="family-selector"><legend>Choose a scent family</legend>
      <button type="button" aria-pressed={selected === 'all'} aria-controls="collection-display" onClick={() => updateCollectionQuery({ scent: 'all' })}>All products <small>{d.products.length}</small></button>
      {d.families.map(({ scent, products }) => <button type="button" key={scent.slug} data-family={scent.slug} aria-controls="collection-display" aria-pressed={selected === scent.slug} onClick={() => updateCollectionQuery({ scent: scent.slug })}>{scent.name}<small>{products.length}</small></button>)}
    </fieldset>
    <p className="sr-only" role="status">{family ? `Showing ${family.scent.name} products` : 'Showing all products'}</p>
    <div id="collection-display" className={`collection-display display-${selected}`}>
      <section className={`collection-exhibit exhibit-${selected}`} data-family={selected} aria-label={family ? `${family.scent.name} products` : 'All products'}>
        {family && <header className="exhibit-heading"><h2 className="scent-name">{family.scent.name}</h2><Link className="text-action" href={`/scents/${selected}`}>About this scent <span aria-hidden="true">→</span></Link></header>}
        {selected === 'all' ? <div className="collection-manifest">{d.families.map(({ scent, products }) => {
          const visible = products.filter(product => filtered.includes(product));
          return visible.length ? <section className={`manifest-family manifest-${scent.slug}`} data-family={scent.slug} key={scent.slug}><h2 className="scent-name"><Link href={`/scents/${scent.slug}`}>{scent.name}</Link></h2><div>{visible.map((product, index) => <ProductTile key={product.slug} product={product} index={index}/>)}</div>{scent.slug === 'flint' && <JournalSpace variant="chart-fragment" className="manifest-journal"/>}</section> : null;
        })}</div> : <div className="exhibit-products">{filtered.map((product, index) => <ProductTile key={product.slug} product={product} index={index}/>) }{selected === 'flint' && <JournalComposition variant="cordage" className="selection-journal"/>}</div>}
      </section>
    </div>
  </section>;
}

function Scents({ d }) {
  return <section className="scents-page"><div className="scents-opening"><header className="scents-heading"><span className="eyebrow">The scent guide</span><h1>{d.page.title}</h1><p className="lead">{d.page.intro}</p><BodyText text={d.page.body}/></header><nav className="scent-index" aria-label="Jump to a scent">{d.scents.map(scent => <a key={scent.slug} data-family={scent.slug} href={`#${scent.slug}`}>{scent.name}<span aria-hidden="true">↓</span></a>)}</nav><div className="scent-journal-slot" aria-hidden="true"><JournalComposition variant="scent-journal" className="scent-journal"/></div></div>
    <div className="scent-chapters">{d.families.map(({ scent, products }, index) => <article id={scent.slug} className={`scent-chapter chapter-${index + 1}`} data-family={scent.slug} key={scent.slug}>
      {index > 0 && <JournalComposition variant={index === 1 ? 'chart-trace' : 'ink-curl'} className={`chapter-penwork chapter-fragment-${index}`}/>}<header className="chapter-heading"><h2 className="scent-name">{scent.name}</h2></header>
      <DecorativeScene className="chapter-drawing"><ScentGuideScene family={scent.slug}/></DecorativeScene>
      <div className="chapter-content"><ImageSet item={scent} firstOnly/><ItemCopy item={scent}/><ProductLinks products={products} label={`Products in ${scent.name}`}/><Link className="text-action" href={`/scents/${scent.slug}`}>Explore {scent.name}<span aria-hidden="true">→</span></Link><JournalSpace variant={scent.slug === 'cordovan' ? 'atelier' : scent.slug === 'mordant' ? 'chart-fragment' : 'preferences'} className="chapter-notes"/></div>
    </article>)}</div>
  </section>;
}
function Product({ d }) {
  const product = d.item, images = publicImages(product);
  return <article className={`product-page product-${product.scent?.slug || 'all'}`} data-family={product.scent?.slug}><Link className="back-link" href="/products">← The collection</Link>
    <JournalOrnament motif="ribbon" className="product-colophon"/><div className="product-spread"><header className="product-heading"><h1>{product.name}</h1><div className="product-context">{product.scent && <Link href={`/scents/${product.scent.slug}`}>{product.scent.name} scent <span aria-hidden="true">→</span></Link>}<Status linked={false}/></div></header>
      <div className="product-artwork">{images.length ? <ImageSet item={product}/> : <DecorativeScene><ProductScene product={product}/></DecorativeScene>}</div>
      <div className="product-information"><ItemCopy item={product}/><div className="product-launch"><Launch d={d}/><CampaignAction d={d}/></div><JournalSpace variant={product.scent?.slug === 'cordovan' ? 'atelier' : product.scent?.slug === 'mordant' ? 'botanical' : 'chart-fragment'} className="product-notes"/></div>
    </div>{d.related.length > 0 && <section className="related-products"><h2>Also in {product.scent?.name}</h2><ProductLinks products={d.related} label="Related products"/></section>}
  </article>;
}
function Scent({ d }) {
  const scent = d.item, products = d.products.filter(product => product.scent?.slug === scent.slug);
  return <article className={`scent-detail scent-detail-${scent.slug}`} data-family={scent.slug}><Link className="back-link" href="/scents">← The scent guide</Link><div className="scent-cover"><header><h1 className="scent-name">{scent.name}</h1><ItemCopy item={scent}/><JournalComposition variant={scent.slug === 'cordovan' ? 'atelier' : scent.slug === 'mordant' ? 'botanical' : 'preferences'} className="scent-cover-note"/></header><DecorativeScene className="scent-cover-art"><ScentDetailScene family={scent.slug}/></DecorativeScene></div><ImageSet item={scent}/><section className="scent-products"><JournalOrnament motif="ribbon" className="scent-product-penwork"/><div className="section-heading"><h2>Products in {scent.name}</h2><Status/></div><div className={`detail-product-deck count-${products.length}`}>{products.map((product, index) => <ProductTile key={product.slug} product={product} index={index}/>)}</div></section></article>;
}
function About({ d }) {
  const paragraphs = String(d.page.body || '').split(/\n\s*\n/).filter(Boolean);
  const statement = paragraphs.find(text => text.includes('Nobody needs to prove anything'));
  const body = paragraphs.filter(text => text !== statement);
  return <article className="about-atelier"><JournalComposition variant="botanical" className="about-journal"/>
    <header className="about-heading"><span className="eyebrow">{d.page.eyebrow || 'About Dagger & Bone'}</span><h1>{d.page.title}</h1><BodyText text={d.page.intro}/></header>
    <div className="about-workroom"><JournalOrnament motif="ribbon" className="about-penwork"/><div className="about-attitude"><BodyText text={body.join('\n\n')}/>{statement && <blockquote><PhraseEmphasis text={statement} phrase="prove anything"/></blockquote>}<Link className="text-action" href="/products">Explore the collection <span aria-hidden="true">→</span></Link></div><DecorativeScene className="about-workbench"><CraftWorkbenchScene/></DecorativeScene></div>
  </article>;
}
function Campaign({ d }) {
  return <section className="campaign-page"><div className="campaign-cover"><header><span className="eyebrow">{d.page.eyebrow || 'The founding campaign'}</span><h1>{d.page.title}</h1><p className="lead">{d.page.intro}</p><BodyText text={d.page.body}/></header><DecorativeScene className="campaign-drawing"><PreparationScene/></DecorativeScene><div className="campaign-ticket"><Launch d={d}/><Status linked={false}/><CampaignAction d={d}/></div></div>
    {d.rewards.length > 0 && <section className="rewards"><JournalComposition variant="rewards" className="reward-journal"/><div className="section-heading"><h2>Founding rewards</h2></div>{d.rewards.map((reward, index) => <article className="reward-feature" id={reward.slug} key={reward.slug || index}><div className="reward-copy"><h3>{reward.title}</h3><ItemCopy item={reward}/></div></article>)}</section>}
  </section>;
}
function Faq({ d }) {
  return <section className="faq-page"><JournalComposition variant="handbook" className="faq-journal"/><header className="service-heading"><span className="eyebrow">Questions & answers</span><h1>{d.page.title}</h1><p className="lead">{d.page.intro}</p><BodyText text={d.page.body}/><Launch d={d}/></header><div className="faq-workspace"><aside className="faq-aside"><DecorativeScene><HandbookScene/></DecorativeScene><Link className="button button-outline" href="/contact">Ask us directly <span aria-hidden="true">→</span></Link></aside><div className="faq-list">{d.faqs.map((faq, index) => <details open key={faq._id || index}><summary><h2>{faq.question}</h2><span aria-hidden="true">+</span></summary><BodyText text={faq.answer}/></details>)}</div></div></section>;
}
function Utility({ kind, d, reset }) {
  const signup = signupContent(d.site);
  const titles = { signup: signup.title, unsubscribe: 'Unsubscribe from updates.', notfound: 'Page not found.', unavailable: 'Content temporarily unavailable.', error: 'Something went wrong.' };
  const copy = { signup: signup.intro, unsubscribe: 'Enter your email address to unsubscribe from Dagger & Bone Apothecary updates.', notfound: "This page doesn't exist or is no longer available. You can browse the collection or return to the homepage.", unavailable: "We couldn't load this page's content. Please try again shortly.", error: "We couldn't load this page. Please try again or return to the homepage." };
  return <section className={`utility-page utility-${kind}`}><div className="utility-atmosphere"><header><span className="eyebrow">{d.page.eyebrow || 'Dagger & Bone Apothecary'}</span><h1>{titles[kind] || d.page.title}</h1><p className="lead">{copy[kind] || d.page.intro}</p>{kind === 'signup' ? <BodyText text={signup.body}/> : !titles[kind] && <BodyText text={d.page.body}/>}</header><DecorativeScene><UtilityScene kind={kind}/></DecorativeScene></div><div className="utility-column"><div className="utility-content">{kind === 'contact' ? <><ContactForm/><Link className="text-action contact-faq" href="/faq">Read the FAQ <span aria-hidden="true">→</span></Link></> : kind === 'signup' ? <NewsletterForm visibleLabel/> : kind === 'unsubscribe' ? <UnsubscribeForm/> : <div className="utility-actions">{(kind === 'error' || kind === 'unavailable') && reset && <button className="button button-brass" type="button" onClick={reset}>Try again</button>}<Link className="text-action" href="/products">Explore the collection <span aria-hidden="true">→</span></Link><Link href="/">Back to the homepage</Link></div>}</div><JournalSpace variant={kind === 'contact' ? 'correspondence' : kind === 'signup' ? 'folded-chart' : kind === 'notfound' ? 'chart-trace' : 'preferences'} className="utility-note-space"/></div></section>;
}
export default function PublicPage({ kind, d, reset }) {
  return kind === 'home' ? <Home d={d}/> : kind === 'collection' ? <Collection d={d}/> : kind === 'scents' ? <Scents d={d}/> : kind === 'product' ? <Product d={d}/> : kind === 'scent' ? <Scent d={d}/> : kind === 'about' ? <About d={d}/> : kind === 'campaign' ? <Campaign d={d}/> : kind === 'faq' ? <Faq d={d}/> : <Utility kind={kind} d={d} reset={reset}/>;
}
