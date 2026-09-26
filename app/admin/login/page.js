'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { clientApi } from '@/lib/api';

export default function AdminLogin() {
  const router = useRouter(); const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [busy,setBusy]=useState(false); const [error,setError]=useState('');
  async function submit(event) { event.preventDefault(); setBusy(true); setError(''); try { await clientApi('/admin/login',{method:'POST',body:{email,password}}); router.replace('/admin'); router.refresh(); } catch(e) { setError(e.message); } finally { setBusy(false); } }
  return <div className="admin-login-wrap"><div className="admin-login"><span className="eyebrow">Owner access</span><h1>Admin sign in</h1><p>Manage the collection and site content.</p><form onSubmit={submit}><label>Email<input type="email" autoComplete="username" required value={email} onChange={e=>setEmail(e.target.value)} /></label><label>Password<input type="password" autoComplete="current-password" required value={password} onChange={e=>setPassword(e.target.value)} /></label><button className="button button-gold" disabled={busy}>{busy?'Signing in…':'Sign in'}</button>{error&&<p className="admin-error" role="alert">{error}</p>}</form></div></div>;
}
