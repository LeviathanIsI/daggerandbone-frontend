export default function BodyText({ text, className = '' }) {
  if (!text) return null;
  return <div className={`body-copy ${className}`}>{String(text).split(/\n\s*\n/).filter(Boolean).map((paragraph, i) => <p key={i}>{paragraph}</p>)}</div>;
}
