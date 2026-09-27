// NEXT_PUBLIC_API_ORIGIN remains an alias for existing local installations.
// Production values are supplied by .env.production or the frontend host.
const configuredPublicOrigin = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_ORIGIN;
export const publicApiOrigin = (configuredPublicOrigin || (process.env.NODE_ENV === 'production' ? '' : 'http://localhost:4000'))
  .trim().replace(/\/+$/, '');
const serverApiOrigin = (process.env.BACKEND_URL || publicApiOrigin).trim().replace(/\/+$/, '');

export async function getPublicResult(path) {
  try {
    const response = await fetch(`${serverApiOrigin}/api/public${path}`, {
      cache: 'no-store',
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) {
      return { ok: false, status: response.status, data: null };
    }
    let payload;
    try { payload = await response.json(); }
    catch { return { ok: false, status: response.status, data: null }; }
    const data = payload?.data ?? payload;
    if (data == null) return { ok: false, status: response.status, data: null };
    return { ok: true, status: response.status, data };
  } catch (error) {
    // Next uses this exception to switch a route from static generation to
    // dynamic rendering. It is framework control flow, not an API outage.
    if (error?.digest === 'DYNAMIC_SERVER_USAGE') throw error;
    return { ok: false, status: null, data: null };
  }
}

export async function getPublic(path) {
  return (await getPublicResult(path)).data;
}

export async function clientApi(path, options = {}) {
  const { body, headers, ...rest } = options;
  const isPublic = path.startsWith('/public/');
  let response;
  try { response = await fetch(`${publicApiOrigin}/api${path}`, {
    ...rest,
    credentials: 'include',
    headers: {
      ...(body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
      ...headers,
    },
    body: body instanceof FormData || typeof body === 'string' ? body : body == null ? undefined : JSON.stringify(body),
  }); } catch (error) {
    if (isPublic) throw new Error("We couldn't connect to send your request. Please try again shortly.");
    throw error;
  }
  const type = response.headers.get('content-type') || '';
  let payload;
  try { payload = type.includes('application/json') ? await response.json() : await response.text(); }
  catch (error) {
    if (isPublic) throw new Error("We couldn't confirm the result of your request. Please try again shortly.");
    throw error;
  }
  if (isPublic && response.ok && (!payload || typeof payload !== 'object')) {
    throw new Error("We couldn't confirm the result of your request. Please try again shortly.");
  }
  if (!response.ok) {
    const fields = Object.entries(payload?.details?.fieldErrors || {}).flatMap(([field, errors]) => (errors || []).map(error => isPublic ? error : `${field}: ${error}`));
    const message = payload?.error || payload?.message;
    const fallback = isPublic ? "We couldn't complete your request. Please try again shortly." : `Request failed (${response.status})`;
    throw new Error(fields.length ? fields.join(isPublic ? ' ' : '; ') : isPublic && ['Invalid input', 'Invalid data'].includes(message) ? 'Check the form and try again.' : isPublic && message === 'Server error' ? fallback : message || fallback);
  }
  return payload?.data ?? payload;
}

export function listOf(value) {
  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.items)) return value.items;
  if (Array.isArray(value?.results)) return value.results;
  return [];
}

export function siteUrl(path = '', canonicalBase) {
  const base = canonicalBase || process.env.NEXT_PUBLIC_SITE_ORIGIN;
  if (!base || /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?\/?$/i.test(base)) return undefined;
  return `${base.replace(/\/$/, '')}${path}`;
}

export function pageMetadata({ title, description, path, image, canonicalBase }) {
  const siteName = 'Dagger & Bone Apothecary';
  const fullTitle = title ? (title.includes(siteName) ? title : `${title} | ${siteName}`) : siteName;
  return {
    title: fullTitle,
    description,
    alternates: siteUrl(path, canonicalBase) ? { canonical: siteUrl(path, canonicalBase) } : undefined,
    openGraph: { title: fullTitle, description, url: siteUrl(path, canonicalBase), images: image ? [{ url: image }] : undefined },
  };
}

export function imageFrom(record) {
  return record?.image?.url || record?.heroImage?.url || record?.featuredImage?.url || record?.images?.[0]?.url || null;
}

export function imageAltFrom(record, fallback) {
  return record?.image?.alt || record?.heroImage?.alt || record?.featuredImage?.alt || record?.images?.[0]?.alt || fallback;
}
