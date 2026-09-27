import { cache } from 'react';
import { randomUUID } from 'node:crypto';
import { mkdir, readFile, rename, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { getPublicResult, listOf } from './api';
import { sanitizePublicCopy } from './public-identity';

const defaultRuntimeFile = path.join(process.cwd(), '.published-snapshot', 'current.json');
const defaultArchivedFile = path.join(process.cwd(), 'data', 'published-snapshot.json');

export function validPublishedSnapshot(value) {
  if (!value || value.schemaVersion !== 1 || !Number.isFinite(Date.parse(value.capturedAt)) ||
      !value.site?.settings || !value.site?.pages || !Array.isArray(value.site.rewards) ||
      !Array.isArray(value.products) || !Array.isArray(value.scents) || !Array.isArray(value.faqs) ||
      !value.productDetails || !value.scentDetails) return false;
  if (value.products.some(item => !item.slug || !item.scent?.slug || !value.productDetails[item.slug]?.item)) return false;
  if (value.scents.some(item => !item.slug || !value.scentDetails[item.slug]?.item)) return false;
  return true;
}

async function readSnapshot(file) {
  try {
    const value = sanitizePublicCopy(JSON.parse(await readFile(file, 'utf8')));
    return validPublishedSnapshot(value) ? value : null;
  } catch { return null; }
}

async function saveSnapshot(value, runtimeFile) {
  const temporary = `${runtimeFile}.${process.pid}.${randomUUID()}.tmp`;
  try {
    await mkdir(path.dirname(runtimeFile), { recursive: true });
    await writeFile(temporary, JSON.stringify(value));
    await rename(temporary, runtimeFile);
  } catch {
    // A read-only filesystem must not prevent the live CMS response rendering.
    await unlink(temporary).catch(() => {});
  }
}

async function readLegacyPublicApi() {
  // Compatibility with a backend process that has not yet loaded /snapshot.
  // The backend still supplies every public record and every detail response.
  const [site, products, scents, faqs] = await Promise.all([
    getPublicResult('/site'), getPublicResult('/products'), getPublicResult('/scents'), getPublicResult('/faqs'),
  ]);
  if (![site, products, scents, faqs].every(result => result.ok) || !site.data?.settings) return null;
  const productList = listOf(products.data), scentList = listOf(scents.data);
  const detailResults = await Promise.all([
    ...productList.map(item => getPublicResult(`/products/${encodeURIComponent(item.slug)}`)),
    ...scentList.map(item => getPublicResult(`/scents/${encodeURIComponent(item.slug)}`)),
  ]);
  if (!detailResults.every(result => result.ok)) return null;
  const productDetails = Object.fromEntries(productList.map((item, index) => [item.slug, detailResults[index].data]));
  const scentDetails = Object.fromEntries(scentList.map((item, index) => [item.slug, detailResults[productList.length + index].data]));
  return { schemaVersion: 1, capturedAt: new Date().toISOString(), source: 'live-api',
    site: site.data, products: productList, scents: scentList, faqs: listOf(faqs.data), productDetails, scentDetails };
}

export async function readPublishedContent({ runtimeFile = defaultRuntimeFile, archivedFile = defaultArchivedFile } = {}) {
  const response = await getPublicResult('/snapshot');
  const live = sanitizePublicCopy(response.ok ? response.data : response.status === 404 ? await readLegacyPublicApi() : null);
  if (validPublishedSnapshot(live)) {
    await saveSnapshot(live, runtimeFile);
    return { bundle: live, offline: false };
  }
  const saved = await readSnapshot(runtimeFile) || await readSnapshot(archivedFile);
  return { bundle: saved, offline: true };
}

// React shares this result across metadata, layout, and page rendering within
// one server request. Every new request still checks the authoritative API.
export const getPublishedContent = cache(readPublishedContent);
