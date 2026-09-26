import BodyText from './BodyText';
import BrandFigure from './BrandFigure';
import { publicImages } from '@/lib/public-media.mjs';

export default function PageExtras({ page }) {
  const sections = page?.sections || [];
  const images = publicImages(page);
  if (!sections.length && !images.length) return null;
  return <section className="page-extras"><div className="shell">
    {sections.length>0 && <div className="extra-sections">{sections.map((section,i)=><div className="prose-section" key={i}><h2>{section.heading}</h2><BodyText text={section.body}/></div>)}</div>}
    {images.length>0 && <div className="gallery-grid">{images.map((image,i)=><BrandFigure key={image.publicId||i} image={image} alt={image.alt||''}/>)}</div>}
  </div></section>;
}
