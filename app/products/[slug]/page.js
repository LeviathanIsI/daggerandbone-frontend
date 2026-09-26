import PublicSite from '@/components/public/PublicSite';
import { loadPublicContent, publicMetadata } from '@/lib/public-content';
export const dynamic = 'force-dynamic';
export async function generateMetadata({ params }) { return publicMetadata('product', (await params).slug); }
export default async function Page({ params }) { return <PublicSite kind="product" data={await loadPublicContent('product', (await params).slug)} />; }
