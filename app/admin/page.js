import { Suspense } from 'react';
import AdminDashboard from './AdminDashboard';

export default function AdminPage(){return <Suspense fallback={<div className="admin-loading">Loading dashboard...</div>}><AdminDashboard /></Suspense>}
