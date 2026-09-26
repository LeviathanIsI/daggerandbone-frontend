// Original printed fragments for surrounding page space. No scene artwork is
// imported here: these are flat stencils and loose papers, not product imagery.
const paperShapes = {
  scroll: 'M63 34C48 15 25 23 23 48L41 203Q106 230 193 216L213 220L232 214Q385 229 557 198L576 60Q567 34 539 38Q302 64 63 34Z',
  leaf: 'M170 14L387 23L402 81L390 100L407 190L382 234L215 247L190 228L167 158L181 136L164 73Z',
  corner: 'M88 23L550 29L538 68L548 84L479 95L440 128L392 151L369 179L323 187L280 223L139 245L126 215L81 207L94 149L85 132Z',
  tear: 'M132 41L248 20L270 29L387 12L459 50L455 81L485 93L465 131L473 145L440 216L358 232L332 222L255 248L219 233L160 240L152 212L112 196L125 147L112 132Z',
};

export function JournalDefs({ id }) {
  return <defs>
    <linearGradient id={`${id}-paper`} x1="0" y1="0" x2="1" y2="1">
      <stop stopColor="var(--site-text)" stopOpacity=".28"/><stop offset=".26" stopColor="var(--site-text)" stopOpacity=".64"/>
      <stop offset=".64" stopColor="var(--site-text)" stopOpacity=".52"/><stop offset="1" stopColor="var(--site-text)" stopOpacity=".23"/>
    </linearGradient>
    <linearGradient id={`${id}-curl`} x1="0" y1="0" x2="1" y2=".7">
      <stop stopColor="var(--site-background)" stopOpacity=".8"/><stop offset=".46" stopColor="var(--site-text)" stopOpacity=".64"/>
      <stop offset=".7" stopColor="var(--site-text)" stopOpacity=".23"/><stop offset="1" stopColor="var(--site-background)" stopOpacity=".65"/>
    </linearGradient>
    <radialGradient id={`${id}-fade`} cx=".5" cy=".48" r=".6">
      <stop offset=".43" stopColor="white"/><stop offset=".68" stopColor="white"/><stop offset="1" stopColor="white" stopOpacity="0"/>
    </radialGradient>
    <mask id={`${id}-paper-fade`} maskUnits="userSpaceOnUse" x="-20" y="-20" width="650" height="310" maskType="alpha">
      <rect x="0" y="0" width="600" height="260" fill={`url(#${id}-fade)`}/>
    </mask>
    <filter id={`${id}-edge`} x="-5%" y="-10%" width="110%" height="120%" colorInterpolationFilters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency=".05 .19" numOctaves="2" seed="23" result="edge"/>
      <feDisplacementMap in="SourceGraphic" in2="edge" scale="3.3" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
    <filter id={`${id}-grain`} x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency=".48" numOctaves="2" seed="11"/>
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer><feFuncA type="linear" slope=".14"/></feComponentTransfer>
      <feComposite in2="SourceGraphic" operator="in"/>
    </filter>
    <filter id={`${id}-print-grain`} x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency=".7 .9" numOctaves="2" seed="7" result="fibres"/>
      <feColorMatrix in="fibres" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  1.1 0 0 0 .22"/>
    </filter>
    <filter id={`${id}-print-edge`} x="-3%" y="-3%" width="106%" height="106%" colorInterpolationFilters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency=".19 .23" numOctaves="2" seed="17" result="edge"/>
      <feDisplacementMap in="SourceGraphic" in2="edge" scale="1.2" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
    <mask id={`${id}-print-wear`} maskUnits="userSpaceOnUse" x="-20" y="-20" width="300" height="340" maskType="luminance">
      <rect x="-20" y="-20" width="300" height="340" fill="white" filter={`url(#${id}-print-grain)`}/>
      <path d="M16 81l38-3m9 106l57-5m-20-91l35-9m21 142l27-2m-1-173l44-9M45 246l61-4" fill="none" stroke="black" strokeWidth="2"/>
      <path d="M84 50l6-2 2 6-8 1ZM151 197l11-4 3 5-12 4ZM200 115l9-3 2 8-7-1Z" fill="black"/>
    </mask>
    {Object.entries(paperShapes).map(([name, d]) => <clipPath id={`${id}-${name}-clip`} key={name}><path d={d}/></clipPath>)}
  </defs>;
}

function StampShape({ subject }) {
  if (subject === 'compass') return <>
    <path fillRule="evenodd" d="M120 8A112 112 0 1 1 8 120H25A95 95 0 1 0 120 25ZM120 39A81 81 0 1 1 39 120H47A73 73 0 1 0 120 47Z"/>
    {[0,45,90,135,180,225,270,315].map(angle => <g key={angle} transform={`rotate(${angle} 120 120)`}>
      <path d="M115 96L120 35L125 96L122 109H118Z"/><path opacity=".55" d="M128 92L166 68L138 108L129 115L125 110Z"/>
    </g>)}
    <path fillRule="evenodd" d="M133 120A13 13 0 1 1 107 120A13 13 0 1 1 133 120ZM124 120A4 4 0 1 0 116 120A4 4 0 1 0 124 120Z"/>
    {[12,24,36,48,60,72,84,96,108,132,144,156,168,192,204,216,228,252,264,276,288,312,324,336,348].map(angle => <path key={angle} transform={`rotate(${angle} 120 120)`} d="M118 11H122V20H118Z"/>)}
    <path d="M10 114H64V121H10ZM113 175H120V231H113Z"/>
  </>;
  if (subject === 'knot') return <>
    <path fillRule="evenodd" d="M19 48C55 12 105 39 128 74L115 93C93 61 61 39 39 61C18 82 53 108 88 124L73 143C33 123-9 88 19 48ZM133 84C171 37 220 69 225 96C233 133 189 162 160 169L146 149C185 140 213 112 200 94C187 76 164 83 146 107Z"/>
    <path fillRule="evenodd" d="M114 78C144 79 160 105 150 128L130 161C115 185 105 208 123 218C145 229 159 198 155 176L177 171C186 209 166 247 132 244C102 242 79 218 99 181L126 136C149 103 118 88 100 111L60 166C33 201 23 220 36 235L16 247C-5 224 10 193 40 153L82 95C91 83 101 78 114 78Z"/>
    <path d="M44 250L72 218L87 228L62 263ZM10 253L27 258L20 277L4 270ZM169 235L183 216L221 245L209 260Z"/>
    <path className="stencil-cut" d="M25 67C27 99 84 120 113 137M146 92C183 62 230 114 170 143M30 223L62 178M123 185C106 218 137 246 160 207"/>
  </>;
  if (subject === 'botanical') return <>
    <path d="M112 283C122 205 94 113 124 18L133 19C107 114 131 207 121 284Z"/>
    <path d="M114 71C71 64 43 30 45 10C86 6 115 38 114 71ZM128 52C139 22 176 10 197 18C192 49 158 64 128 60ZM110 118C67 118 31 89 31 65C75 59 107 85 110 118ZM123 109C140 74 179 64 215 75C207 105 160 130 124 119ZM114 172C69 181 33 144 23 118C66 107 112 130 114 172ZM125 163C150 135 188 134 220 147C204 180 165 194 126 173ZM116 220C70 230 38 209 30 181C70 162 111 189 116 220ZM125 213C154 197 189 205 211 224C187 250 149 246 124 224Z"/>
    <path className="stencil-cut" d="M110 64L59 22M137 51L185 26M102 111L44 76M134 109L201 83M104 162L38 126M134 163L204 150M106 213L42 187M134 217L198 225"/>
  </>;
  if (subject === 'vessel') return <>
    <path fillRule="evenodd" d="M54 86H137L153 219Q154 235 137 241H51Q32 236 34 219ZM51 99L43 214H54L62 99ZM74 18H117V68H74ZM62 73H131V82H62ZM67 9H123V15H67Z"/>
    <path fillRule="evenodd" d="M159 155H235L229 186Q216 206 204 211V231H223V240H174V231H193V211Q171 204 165 184ZM168 165L174 182H181L177 165Z"/>
    <path d="M195 139L216 52Q220 43 229 49L235 58L211 145ZM155 145H240V151H155Z"/>
    <path className="stencil-cut" d="M42 169H147M58 220H129M77 32H111M176 197H221"/>
  </>;
  if (subject === 'quill') return <>
    <path d="M62 259L86 205L126 118L192 22L186 21L113 106L73 189L48 260ZM91 175C76 149 89 91 118 58L131 64L126 47L167 17L170 27L180 8L213 5L208 44L195 48L202 58L178 101L159 105L165 116L125 157L105 159L108 170Z"/>
    <path className="stencil-cut" d="M104 117L149 100M129 76L171 70M87 145L126 132M153 47L190 39"/>
    <path fillRule="evenodd" d="M147 189H213L220 250H141ZM151 202L148 237H155L158 202ZM146 180H214V185H146ZM151 160H208V174H151Z"/>
  </>;
  return <>
    <path fillRule="evenodd" d="M20 256V32H36V229A199 199 0 0 0 232 32H246A215 215 0 0 1 20 256ZM50 213V43H56V202A168 168 0 0 0 206 43H212A174 174 0 0 1 50 213Z"/>
    {[10,20,30,40,50,60,70,80].map(angle => <path key={angle} d="M218 29H241V35H218Z" transform={`rotate(${angle} 29 32)`}/>)}
    <path d="M25 23L203 174L198 180L21 32ZM35 32L147 215L141 219L28 35ZM46 32L213 117L209 125L42 36Z"/>
  </>;
}

function Stamp({ id, subject, transform, opacity }) {
  return <g className="journal-stencil" data-stencil={subject} transform={transform} opacity={opacity} filter={`url(#${id}-print-edge)`} mask={`url(#${id}-print-wear)`}><StampShape subject={subject}/></g>;
}

function ScentJournalPaper({ id, transform }) {
  const shape = 'scroll';
  return <g transform={transform} data-journal-paper={shape}>
    <g mask={`url(#${id}-paper-fade)`}>
      <g filter={`url(#${id}-edge)`}>
        <path d={paperShapes[shape]} fill={`url(#${id}-paper)`}/>
        <g clipPath={`url(#${id}-${shape}-clip)`}><rect width="600" height="260" fill="var(--site-text)" filter={`url(#${id}-grain)`}/>
          <path className="paper-fold-shadow" d="M298 8L280 132L328 251L319 254L268 134L288 8ZM27 193Q232 233 570 175L566 188Q232 242 35 204Z"/>
          <path className="paper-crease" d="M298 15L279 130L329 246M46 56Q257 81 547 45M64 206Q282 226 535 192"/>
        </g>
      </g>
      <>
        <path d="M63 34C47 9 17 19 23 51L35 90Q55 99 73 80L65 62Q46 77 39 57C34 43 48 33 63 34ZM41 203Q49 184 71 194C93 204 83 224 66 224L111 229Q98 241 70 236C45 232 32 217 41 203ZM557 198L576 60Q590 71 583 100L572 207Z" fill={`url(#${id}-curl)`}/>
        <path className="paper-curl-ink" d="M63 34Q34 27 38 55Q41 74 65 62M41 203Q57 186 73 203Q81 215 67 223"/>
      </>
    </g>
    <g className="journal-paper-ink">
      <text className="journal-lettering" x="300" y="146" textAnchor="middle" fontSize="84">The scent journal</text>
      <path d="M107 179C189 143 262 211 364 175Q426 154 478 170M380 180C390 207 353 214 341 201C331 189 348 179 356 190M67 100Q97 70 125 79M465 83C516 42 543 85 523 94"/>
      <path className="journal-fine" d="M143 187Q218 175 255 195M444 183L489 176M83 91L94 84M496 77L509 72"/>
    </g>
  </g>;
}

function Flourish({ transform }) {
  return <g className="journal-pen" transform={transform}>
    <path d="M23 115C2 67 53 37 79 57C103 78 70 101 58 82C46 61 77 44 97 51C148 69 191 26 251 41C320 59 335 117 418 95C472 80 501 46 532 63C554 78 532 98 520 83M119 104C197 73 254 160 336 130C363 119 380 108 403 115M428 134C461 159 513 128 546 141"/>
    <path className="journal-fine" d="M8 133Q52 102 93 122M153 124Q191 111 219 128M311 57l14 7m-7-11l14 7m-7-13l12 7M451 127l23-6"/>
  </g>;
}

// Chart scraps have torn, compact silhouettes and drawn content, not empty
// horizontal label panels. The three silhouettes share only the material.
function Fragment({ id, shape = 'tear', transform, folded = false }) {
  return <g data-journal-paper={shape} transform={transform} mask={`url(#${id}-paper-fade)`}>
    <g filter={`url(#${id}-edge)`}>
      <path d={paperShapes[shape]} fill={`url(#${id}-paper)`}/>
      <g clipPath={`url(#${id}-${shape}-clip)`}>
        <rect width="600" height="260" fill="var(--site-text)" filter={`url(#${id}-grain)`}/>
        <g className="journal-paper-ink">
          <path d="M105 228C161 190 122 147 192 130L214 138L241 122L260 130L284 105L306 119L337 79L374 88L398 50L447 40M116 243C173 192 141 157 199 146L222 154L246 139L268 145L290 121L312 134L347 97L383 104L412 67L454 56"/>
          <path className="journal-fine" d="M120 63L457 218M183 32L430 244M401 15L147 221M132 144L475 112M145 67C231 28 359 31 445 87M148 78C233 41 354 44 437 100M189 230C274 245 356 229 410 196"/>
          <path d="M191 167l-7 12m27-20l-6 14m27-20l-7 13m71-73l7-13m14 10l8-15m11 8l8-13M375 198l36 17m-20-29l-14 24"/>
        </g>
        {folded && <><path className="paper-fold-shadow" d="M274 8L294 111L280 248L290 248L307 113L285 8Z"/><path className="paper-crease" d="M274 8L294 111L280 248"/></>}
      </g>
    </g>
    {shape === 'leaf' && <path d="M407 190L382 234L366 201Z" fill={`url(#${id}-curl)`}/>}
  </g>;
}

function ChartTrace({ transform }) {
  return <g className="journal-pen" transform={transform}>
    <path d="M26 120C103 134 93 54 164 81L184 63L202 72L221 55L255 68L278 46C337 28 355 67 406 51L441 36M93 132L113 52M165 117L180 28M239 100L255 23M319 84L328 11"/>
    <path className="journal-fine" d="M22 134C106 153 105 67 165 95L182 82L204 89L224 73L255 85L284 63C337 46 363 84 412 69M55 87L325 132M89 42L344 112M368 88L520 27"/>
    <path d="M105 81l-12-3m85-23l-12-3m86-11l-11-2m84-16l-11-2"/>
  </g>;
}

export default function JournalLayers({ id, variant }) {
  if (variant === 'scent-journal') return <>
    <Stamp id={id} subject="compass" transform="translate(34 15) scale(1.38) rotate(-19 120 120)"/>
    <ScentJournalPaper id={id} transform="translate(258 130) rotate(-7 300 130)"/>
    <Flourish transform="translate(214 287) scale(1.05)"/>
  </>;
  if (variant === 'margin-botanical') return <>
    <Stamp id={id} subject="botanical" transform="translate(18 116) scale(1.42) rotate(-12 120 140)"/>
    <Flourish transform="translate(254 212) rotate(86) scale(.6)"/>
  </>;
  if (variant === 'margin-bearing') return <>
    <Stamp id={id} subject="scale" transform="translate(-98 182) scale(1.7)"/>
    <ChartTrace transform="translate(217 52) rotate(76) scale(.82)"/>
  </>;
  if (variant === 'margin-knots') return <>
    <Stamp id={id} subject="knot" transform="translate(33 145) scale(1.12) rotate(14 120 130)"/>
    <path className="journal-pen" d="M53 18C-18 89 34 139 68 189M60 436C88 484 175 477 186 552C194 612 149 643 122 613C110 600 127 581 139 596"/>
  </>;
  if (variant === 'margin-paper') return <>
    <Fragment id={id} shape="corner" transform="translate(263 91) rotate(76) scale(1.06)"/>
    <ChartTrace transform="translate(64 381) rotate(60) scale(.48)"/>
  </>;
  if (variant === 'footer-mark') return <>
    <Stamp id={id} subject="scale" transform="translate(-69 115) rotate(-17 120 120) scale(1.43)"/>
    <path className="journal-pen" d="M259 126C311 181 241 273 246 335C251 386 300 401 283 452C270 491 222 490 227 463C230 447 251 450 249 464M272 220Q245 247 244 277"/>
  </>;
  if (variant === 'chart-trace') return <>
    <ChartTrace transform="translate(164 5) scale(1.12)"/>
    <path className="journal-stencil" d="M735 73l42-29-22 42-7-4ZM760 83l18-6-13 20ZM790 40l5 2-11 16-4-3Z"/>
  </>;
  if (variant === 'ink-curl') return <>
    <Flourish transform="translate(118 -4) scale(1.17 .94)"/>
    <path className="journal-pen" d="M700 112C774 142 853 89 805 59C790 50 778 68 791 74M677 130Q738 148 763 137"/>
  </>;
  if (variant === 'cordage') return <>
    <Stamp id={id} subject="knot" transform="translate(296 42) scale(1.28) rotate(-13 120 130)"/>
    <Flourish transform="translate(47 96) rotate(18) scale(.78)"/>
    <path className="journal-pen" d="M571 361C678 396 807 345 811 270C812 239 781 231 774 252C769 267 787 277 793 265M559 373C655 418 755 385 788 358"/>
  </>;
  if (variant === 'botanical') return <>
    <Fragment id={id} shape="corner" transform="translate(1 231) rotate(-14 300 130) scale(.75)"/>
    <Stamp id={id} subject="botanical" transform="translate(355 15) scale(1.38) rotate(19 120 140)"/>
    <Flourish transform="translate(567 95) rotate(69) scale(.44)"/>
  </>;
  if (variant === 'atelier') return <>
    <Fragment id={id} shape="corner" transform="translate(347 92) rotate(65 180 125) scale(.78)"/>
    <Stamp id={id} subject="vessel" transform="translate(152 56) scale(1.2)"/>
    <Flourish transform="translate(329 222) scale(.9)"/>
  </>;
  if (variant === 'correspondence') return <>
    <Stamp id={id} subject="quill" transform="translate(382 25) scale(1.34) rotate(9 120 130)"/>
    <Flourish transform="translate(81 86) rotate(12) scale(.88)"/>
    <Fragment id={id} shape="tear" transform="translate(20 285) rotate(-14 200 100) scale(.5)"/>
  </>;
  if (variant === 'handbook' || variant === 'folded-chart') return <>
    <Fragment id={id} shape="leaf" transform={variant === 'handbook' ? 'translate(106 49) rotate(-9 290 130) scale(1.31)' : 'translate(36 2) rotate(12 290 130) scale(1.5)'} folded/>
    {variant === 'handbook' ? <Stamp id={id} subject="scale" transform="translate(59 202) scale(.62)"/> : <ChartTrace transform="translate(535 233) rotate(-19) scale(.58)"/>}
  </>;
  if (variant === 'rewards') return <>
    <Fragment id={id} shape="tear" transform="translate(101 43) rotate(-7 260 130) scale(1.24)" folded/>
    <Stamp id={id} subject="knot" transform="translate(664 214) scale(.58)"/>
    <Flourish transform="translate(15 207) rotate(-22) scale(.55)"/>
  </>;
  if (variant === 'preferences') return <>
    <Stamp id={id} subject="scale" transform="translate(477 23) rotate(18 120 120) scale(1.23)"/>
    <Flourish transform="translate(78 178) rotate(-11) scale(.9)"/>
  </>;
  return <>
    <Fragment id={id} shape="corner" transform="translate(104 56) rotate(-11 300 130) scale(1.14)"/>
    <ChartTrace transform="translate(370 277) scale(.77)"/>
  </>;
}
