import Image from 'next/image';
import { isPublicImage } from '@/lib/public-media.mjs';

export default function BrandFigure({ image, alt, className = '', priority = false, fallback = null, sizes = '(max-width: 760px) 100vw, 50vw', showCaption = true }) {
  if (!isPublicImage(image)) return fallback;
  const src = typeof image === 'string' ? image : image.url;
  if (!src) return fallback;
  return <figure className={`brand-figure ${className}`}>
    <Image src={src} alt={typeof image === 'string' ? alt : image.alt || alt} width={typeof image === 'string' ? 1200 : image.width || 1200} height={typeof image === 'string' ? 1200 : image.height || 1200} sizes={sizes} priority={priority} />
    {showCaption && typeof image === 'object' && image.caption && <figcaption>{image.caption}</figcaption>}
  </figure>;
}
