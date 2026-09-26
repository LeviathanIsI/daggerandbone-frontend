'use client';

import { useId, useState } from 'react';
import { clientApi } from '@/lib/api';

export default function NewsletterForm({ compact = false, visibleLabel = false }) {
  const emailId = useId();
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState({ type: '', message: '' });
  const [busy, setBusy] = useState(false);
  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    setState({ type: '', message: '' });
    try {
      const result = await clientApi('/public/subscribe', { method: 'POST', body: { email, consent, website } });
      setState({ type: 'success', message: result.message || 'You’re subscribed to Dagger & Bone Apothecary updates.' });
      setEmail(''); setConsent(false); setWebsite('');
    } catch (error) { setState({ type: 'error', message: error.message }); }
    finally { setBusy(false); }
  }
  return <form className={`newsletter-form ${compact ? 'compact' : ''}`} onSubmit={submit} aria-busy={busy}>
    <label className={visibleLabel ? 'newsletter-label' : 'sr-only'} htmlFor={emailId}>Email address</label>
    <div className="form-inline"><input id={emailId} type="email" placeholder="Email address" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} required /><button className="button button-gold" disabled={busy}>{busy ? 'Signing up…' : 'Email me updates'}</button></div>
    <label className="check-row"><input type="checkbox" required checked={consent} onChange={e => setConsent(e.target.checked)} /><span>I agree to receive Kickstarter launch news and occasional collection updates from Dagger & Bone Apothecary by email. I can unsubscribe at any time.</span></label>
    <div className="honeypot" aria-hidden="true"><label>Website<input value={website} onChange={e=>setWebsite(e.target.value)} tabIndex={-1} autoComplete="off" /></label></div>
    {state.message && <p className={`form-message ${state.type}`} role="status">{state.message}</p>}
  </form>;
}
