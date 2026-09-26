import localFont from 'next/font/local';
import { useId } from 'react';
import JournalLayers, { JournalDefs } from './JournalLayers';

const journalFont = localFont({
  src: '../../assets/fonts/pinyon-script/PinyonScript-Regular.ttf',
  variable: '--font-journal', weight: '400', style: 'normal', display: 'swap',
  adjustFontFallback: false,
});

// Fine pen strokes retained in compact section transitions.
function Penwork() {
  return <>
    <path d="M12 132C101 64 158 162 252 115C325 78 324 32 289 40C262 47 281 76 295 61M180 134C228 165 319 107 390 132C456 157 535 119 598 98C670 73 733 120 789 78"/>
    <path d="M35 154C95 112 117 184 174 159M437 166C484 207 556 172 537 145C523 125 495 146 514 157M574 130C628 116 657 144 699 126M708 153C779 170 787 119 758 111C737 105 730 129 748 132"/>
    <path className="journal-hairline" d="M81 123Q128 119 161 138M378 132l-7 18m19-17l-7 19m18-17l-6 19M618 96l8-11m0 13l8-9m1 11l7-8"/>
    <path className="journal-pressure" d="M107 110Q135 117 156 126M239 142Q271 131 292 106M649 91Q683 92 702 98"/>
  </>;

}

export default function JournalOrnament({ motif = 'ribbon', className = '' }) {
  return <div className={`journal-ornament journal-${motif} ${className}`} aria-hidden="true" data-ornament={motif}>
    <svg className="journal-ink" viewBox="0 0 800 270" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true"><Penwork/></svg>
  </div>;
}

// Decorative fragments accept no content/title prop. Only the explicit scent
// journal composition contains lettering; ordinary fragments remain nonverbal.
export function JournalComposition({ variant = 'chart-fragment', className = '' }) {
  const id = `journal-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  return <div className={`journal-composition journal-composition-${variant} ${variant === 'scent-journal' ? journalFont.variable : ''} ${className}`} data-journal-decoration={variant} aria-hidden="true">
    <svg className="journal-layers" viewBox={variant.startsWith('margin-') || variant === 'footer-mark' ? '0 0 330 650' : ['chart-trace','ink-curl'].includes(variant) ? '0 0 900 180' : '0 0 900 460'} xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true">
      <JournalDefs id={id}/><JournalLayers id={id} variant={variant}/>
    </svg>
  </div>;
}

export function JournalSpace({ variant, className = '' }) {
  return <div className={`journal-space ${className}`} aria-hidden="true"><JournalComposition variant={variant}/></div>;
}

const margins = {
  home: ['margin-botanical', 'margin-paper'], collection: ['margin-knots', 'margin-bearing'],
  scents: ['margin-paper', 'margin-botanical'], about: ['margin-bearing', 'margin-paper'],
  product: ['margin-knots', 'margin-bearing'], scent: ['margin-paper', 'margin-knots'],
  campaign: ['margin-botanical', 'margin-bearing'], contact: ['margin-paper', 'margin-botanical'],
  faq: ['margin-botanical', 'margin-knots'], signup: ['margin-knots', 'margin-bearing'],
  unsubscribe: ['margin-paper', 'margin-botanical'], notfound: ['margin-knots', 'margin-paper'],
  error: ['margin-botanical', 'margin-knots'], unavailable: ['margin-paper', 'margin-bearing'],
};

export function PageMargins({ kind, detail }) {
  const [left, right] = margins[kind] || margins.notfound;
  return <div className={`page-margins margins-${kind}`} data-margin-layout={detail || kind} aria-hidden="true">
    <div className="margin-channel margin-port"><JournalComposition variant={left}/></div>
    <div className="margin-channel margin-starboard"><JournalComposition variant={right}/></div>
  </div>;
}
