import PublicSite from '@/components/public/PublicSite';
import { loadPublicContent, publicMetadata } from '@/lib/public-content';
export const dynamic = 'force-dynamic';
export async function generateMetadata() { return publicMetadata('about'); }
export default async function Page() { return <PublicSite kind="about" data={await loadPublicContent('about')} />; }
