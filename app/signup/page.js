import PublicSite from '@/components/public/PublicSite';
import { loadPublicContent, publicMetadata } from '@/lib/public-content';
export const dynamic = 'force-dynamic';
export async function generateMetadata() { return publicMetadata('signup'); }
export default async function Page() { return <PublicSite kind="signup" data={await loadPublicContent('signup')} />; }
