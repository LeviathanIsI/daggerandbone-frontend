import Link from 'next/link';
import BodyText from '@/components/BodyText';
import BrandFigure from '@/components/BrandFigure';
import { publicImages } from '@/lib/public-media.mjs';

export function CampaignAction({ d, className = '' }) {
  const external = /^https?:\/\//i.test(d.campaign);
  return <a className={`button button-brass campaign-action ${className}`} href={d.campaign} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}><span>{external ? 'Get notified on Kickstarter' : 'Campaign & rewards'}{external && <span className="sr-only"> (opens in a new tab)</span>}</span><span aria-hidden="true">{external ? '↗' : '→'}</span></a>;
}
export function Launch({ d }) { return d.date ? <p className="launch-detail"><span>Kickstarter launch</span><time dateTime={d.settings.kickstarterLaunchDate}>{d.date}</time></p> : null; }
export function Status({ linked = true }) { return <p className="development-status"><span>In development</span>{linked && <Link href="/kickstarter">Campaign & rewards</Link>}</p>; }
export function ImageSet({ item, firstOnly = false, className = '' }) {
  const images = publicImages(item);
  if (!images.length) return null;
  return <div className={`image-set ${className}`}>{(firstOnly ? images.slice(0, 1) : images).map((image, index) => <BrandFigure key={image.publicId || index} image={image} alt={image.alt || item.name || ''}/>)}</div>;
}
export function ItemCopy({ item }) { return item.summary || item.body ? <div className="item-copy">{item.summary && <p className="lead">{item.summary}</p>}<BodyText text={item.body !== item.summary ? item.body : ''}/></div> : null; }
export function productLabel(product) { const prefix = `${product.scent?.name || ''} `; return product.name?.startsWith(prefix) ? product.name.slice(prefix.length) : product.name; }
export function ProductTile({ product, index = 0 }) {
  const image = publicImages(product)[0];
  return <Link className={`product-tile ${image ? 'has-image' : ''}`} data-family={product.scent?.slug} style={{ '--tile-index': index }} href={`/products/${product.slug}`} aria-label={`${product.name}, product details`}>
    {image && <BrandFigure image={image} alt={image.alt || product.name} showCaption={false} sizes="(max-width: 760px) 80vw, 30vw"/>}
    <h3><span className="product-name">{productLabel(product)}</span></h3>{product.summary && <p className="tile-summary">{product.summary}</p>}
    <span className="tile-arrow" aria-hidden="true">→</span>
  </Link>;
}
export function ProductLinks({ products, label = 'Products' }) {
  return <nav className="product-links" aria-label={label}>{products.map(product => <Link key={product.slug} data-family={product.scent?.slug} href={`/products/${product.slug}`} aria-label={product.name}><span className="product-name">{productLabel(product)}</span><span className="product-arrow" aria-hidden="true">→</span></Link>)}</nav>;
}
