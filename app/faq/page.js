import PublicSite from '@/components/public/PublicSite';
import { loadPublicContent, publicMetadata } from '@/lib/public-content';
export const dynamic = 'force-dynamic';
export async function generateMetadata() { return publicMetadata('faq'); }
export default async function Page() { return <PublicSite kind="faq" data={await loadPublicContent('faq')} />; }
