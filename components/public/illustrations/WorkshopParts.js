/** Small engraving primitives, not reusable completed scenes. No product packaging. */
import Pigment from './Pigment';

export function Timber({ id, tone = 'amber', x = 0, y = 0, width = 500, height = 45 }) {
  return <g transform={`translate(${x} ${y})`} className="ink-brass"><path d={`M0 0H${width}L${width + 28} ${height}H-24ZM-24 ${height}v12H${width + 28}v-12`} fill="var(--art-timber)"/>
    <Pigment id={id} tone={tone} light d={`M-7 7L${width*.19} 2L${width*.27} 10L${width*.53} 2L${width*.61} 7L${width-8} 1L${width+19} ${height-7}L${width*.7} ${height+2}L${width*.61} ${height-3}L${width*.32} ${height+5}L${width*.23} ${height-3}L-19 ${height}Z M${width*.36} 18l71-5l-37 10Z`}/>
    {Array.from({ length: 5 }, (_, i) => <path key={i} d={`M${12 + i * 10} ${9 + i * 7}Q${width * .3} ${i * 7} ${width * .53} ${12 + i * 6}T${width - 12 + i * 4} ${13 + i * 7}`} opacity=".37"/>)}
    <path d={`M${width * .64} 22q22-13 52 0q-23 12-52 0m12 0q11-6 27 0q-12 6-27 0`} opacity=".45"/>
  </g>;
}

export function Coil({ x = 0, y = 0, scale = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${scale})`} className="ink-brass"><path d="M-81 34C-151-50 91-79 109 4S-85 98-93 18S88-48 90 6S-66 70-75 18S69-29 71 8S-50 49-56 19S52-11 52 11S-35 36-37 21S31 8 33 16M109 4Q153 75 218 30" strokeWidth="2.1"/>{Array.from({ length: 12 }, (_, i) => <path key={i} d={`M${-88 + i * 16} ${-17 - Math.sin(i / 3) * 16}l-4 8`} opacity=".65"/>)}</g>;
}

export function Quill({ id, tone = 'sage', x = 0, y = 0, angle = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${angle})`}><g className="anim-quill ink-ivory"><path d="M0 186Q38 34 142-59Q138 58 36 131L0 186Z" fill="var(--art-paper)"/>
    <Pigment id={id} tone={tone} d="M8 150Q31 67 79 9L101-9L133-55L145-62L137-21L141-6L125 19L126 38L94 61L85 83L65 95L58 115L30 136Z M69 67l17-25l-7 22Z"/>
    <path d="M0 186Q60 47 132-48M1 179l-5 23" className="ink-brass" strokeWidth="2"/>{Array.from({ length: 13 }, (_, i) => <path key={i} d={`M${18 + i * 8} ${135 - i * 13}l${7 + i * .5} -27m-7 24l-9 -4`} className="ink-fine"/>)}</g></g>;
}

export function Linen({ id, tone = 'sea', x = 0, y = 0, scale = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${scale})`} className="ink-ivory"><path d="M0 30L180 0L272 96L71 145L-12 96Z" fill="var(--art-paper)"/>
    <Pigment id={id} tone={tone} d="M-8 34L18 22L53 22L76 12L110 15L139 3L177 2L193 14L196 27L226 46L235 67L271 89L278 100L250 101L229 114L191 116L173 128L140 131L120 141L91 138L68 151L49 132L31 129L14 111L-15 99L-11 73Z M49 36l27 17l16 22l-20-13ZM138 112l44-10l-19 12l-20 4Z"/>
    <Pigment id={id} tone={tone} light d="M-5 58L37 69L81 115L112 111L183 120L148 128L102 133L71 147L48 124L22 118L-15 94Z"/>
    <path d="M0 30L86 113L266 73M86 113L71 145M11 30L91 100L243 70M-6 97L71 138L268 94"/>{Array.from({ length: 14 }, (_, i) => <path key={i} d={`M${7 + i * 12} ${38 - i * 2}l64 66M${84 + i * 12} ${112 - i * 3}l-4 14`} opacity=".23"/>)}<path d="M11 41l51 51M17 35l51 51M74 137l-2 10m15-13v10m15-14v10m15-14v10" className="ink-brass"/></g>;
}

export function Comb({ x = 0, y = 0, angle = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${angle})`} className="ink-brass"><path d="M0 0Q110-24 222 0V20H0Z" fill="var(--art-timber)"/>{Array.from({ length: 32 }, (_, i) => <path key={i} d={`M${5 + i * 6.8} 20v${44 + Math.sin(i / 9) * 10}l3-4V20`}/>)}<path d="M11 5Q110-11 209 5M11 11Q110-3 209 11" opacity=".55"/></g>;
}

export function Brush({ id, tone = 'coral', x = 0, y = 0, scale = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${scale})`} className="ink-brass"><path d="M-60 0Q0-38 75-6L158 40Q170 60 144 66L63 34Q-1 63-67 20Z" fill="var(--art-timber)"/>
    <Pigment id={id} tone={tone} d="M-66 1L-39-12L-18-11Q22-27 53-17L74-6L95 3L105 17L147 35L165 55L153 69L133 64L103 46L85 45L60 29L28 41L9 35L-22 42L-39 32L-64 29L-71 14Z M-32 7l35-9l18 3l-39 7Z"/>
    <path d="M-52 4Q0-24 64 0M80 14l68 35M79 22l65 34"/>{Array.from({ length: 19 }, (_, i) => <path key={i} d={`M${-52 + i * 6} ${12 + Math.sin(i / 7) * 9}v28m3-26v29`} className="ink-fine"/>)}</g>;
}

export function PaperMarks({ x = 0, y = 0, count = 6, width = 170 }) {
  return <g transform={`translate(${x} ${y})`} className="ink-fine" opacity=".5">{Array.from({ length: count }, (_, i) => <path key={i} d={`M0 ${i * 14}q8-7 17 0t17 0l7-3q6 8 16 0t21 0h${width - 80 - (i % 3) * 17}`}/>)}</g>;
}
