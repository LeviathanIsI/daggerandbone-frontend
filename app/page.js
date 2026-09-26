import PublicSite from '@/components/public/PublicSite';
import { loadPublicContent, publicMetadata } from '@/lib/public-content';
export const dynamic = 'force-dynamic';
export async function generateMetadata() { return publicMetadata('home'); }
export default async function Page() { return <PublicSite kind="home" data={await loadPublicContent('home')} />; }
