// Keep the original crest on disk and in the CMS, but use a typographic public identity.
export const WORDMARK_ICON = '/brand-wordmark.svg';
export function isPublicImage(image) {
  const source = typeof image === 'string' ? image : image?.url;
  if (!source) return false;
  let value = [source, image?.publicId || '', image?.alt || ''].join(' ');
  try { value = decodeURIComponent(value); } catch {}
  return !/(?:brand[-_ ](?:logo|favicon)(?:[.\s/_-]|$)|bone and dagger apothecary logo|dagger and bone apothecary logo|ornate crest|skulls?|jolly[-_ ]?roger)/i.test(value);
}
export function publicImages(item) { return (item?.images || []).filter(isPublicImage); }
