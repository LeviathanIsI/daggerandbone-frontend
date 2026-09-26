'use client';
import { clientApi } from '@/lib/api';
import { useState } from 'react';

export default function UnsubscribeForm() {
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);
  const [state, setState] = useState({ type: '', message: '' });
  async function submit(event) {
    event.preventDefault(); setBusy(true); setState({ type: '', message: '' });
    try {
      const result = await clientApi('/public/unsubscribe', { method: 'POST', body: { email } });
      setState({ type: 'success', message: result.message || 'This email address is no longer subscribed to Dagger & Bone Apothecary updates.' }); setEmail('');
    } catch (error) { setState({ type: 'error', message: error.message }); }
    finally { setBusy(false); }
  }
  return <form className="contact-form" onSubmit={submit} aria-busy={busy}>
    <label>Email address<input type="email" required autoComplete="email" value={email} onChange={event => setEmail(event.target.value)} /></label>
    <button className="button" disabled={busy}>{busy ? 'Unsubscribing…' : 'Unsubscribe'}</button>
    {state.message && <p className={`form-message ${state.type}`} role="status">{state.message}</p>}
  </form>;
}
