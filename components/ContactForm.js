'use client';

import { useState } from 'react';
import { clientApi } from '@/lib/api';

export default function ContactForm() {
  const [values, setValues] = useState({ name: '', email: '', message: '', website: '' });
  const [busy, setBusy] = useState(false);
  const [state, setState] = useState({ type: '', message: '' });
  async function submit(event) {
    event.preventDefault(); setBusy(true); setState({ type: '', message: '' });
    try {
      const result = await clientApi('/public/contact', { method: 'POST', body: values });
      setState({ type: 'success', message: result.message || 'Your message was sent.' });
      setValues({ name: '', email: '', message: '', website: '' });
    } catch (error) { setState({ type: 'error', message: error.message }); }
    finally { setBusy(false); }
  }
  return <form className="contact-form" onSubmit={submit} aria-busy={busy}>
    <div className="field-pair"><label>Name<input value={values.name} onChange={e => setValues({ ...values, name: e.target.value })} autoComplete="name" maxLength={120} required /></label><label>Email<input value={values.email} onChange={e => setValues({ ...values, email: e.target.value })} type="email" autoComplete="email" required /></label></div>
    <label>Message<textarea value={values.message} onChange={e => setValues({ ...values, message: e.target.value })} rows={7} minLength={10} maxLength={5000} required /></label>
    <div className="honeypot" aria-hidden="true"><label>Website<input value={values.website} onChange={e => setValues({ ...values, website: e.target.value })} tabIndex={-1} autoComplete="off" /></label></div>
    <button className="button button-gold" disabled={busy}>{busy ? 'Sending…' : 'Send message'}</button>
    {state.message && <p className={`form-message ${state.type}`} role="status">{state.message}</p>}
  </form>;
}
