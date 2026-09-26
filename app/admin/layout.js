import './admin.css';
import './admin-overrides.css';

export const metadata = { title: 'Admin | Dagger & Bone Apothecary', robots: { index: false, follow: false } };
export default function AdminLayout({ children }) { return <main id="main" tabIndex={-1} className="admin">{children}</main>; }
