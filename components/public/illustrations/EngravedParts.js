/* Original geometry, drawn for Dagger & Bone. No source-image paths or tracing. */
import Pigment from './Pigment';

export function InkDefinitions({ id }) {
  return <defs>
    {/* Uneven pigment density plus paper tooth, with a 52% alpha floor.
        Only washes are filtered; ink stays crisp. No blending against black. */}
    <filter id={`${id}-pigment`} x="-15%" y="-20%" width="130%" height="140%" colorInterpolationFilters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency=".027 .043" numOctaves="3" seed="17" stitchTiles="stitch" result="grain"/>
      <feDisplacementMap in="SourceGraphic" in2="grain" scale="6" xChannelSelector="R" yChannelSelector="G" result="rough"/>
      <feGaussianBlur in="rough" stdDeviation=".45" result="edge"/>
      <feColorMatrix in="grain" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  1.1 1.1 1.1 0 -1.02" result="density"/>
      <feComponentTransfer in="density" result="paper"><feFuncA type="linear" slope=".48" intercept=".52"/></feComponentTransfer>
      <feComposite in="edge" in2="paper" operator="in"/>
    </filter>
    <linearGradient id={`${id}-brass`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="var(--art-metal-light)"/><stop offset=".37" stopColor="var(--art-metal-mid)"/><stop offset=".62" stopColor="var(--art-brass)"/><stop offset="1" stopColor="var(--art-metal-dark)"/></linearGradient>
    <linearGradient id={`${id}-sail`} x1="0" y1="0" x2="1" y2=".7"><stop stopColor="var(--art-paper)"/><stop offset=".55" stopColor="var(--art-surface)"/><stop offset="1" stopColor="var(--art-shadow)"/></linearGradient>
    <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="1" y2="0"><stop stopColor="var(--art-water-crest)" stopOpacity=".7"/><stop offset=".28" stopColor="var(--art-sea)" stopOpacity=".3"/><stop offset=".5" stopColor="var(--art-surface)" stopOpacity=".4"/><stop offset=".8" stopColor="var(--art-sea)" stopOpacity=".25"/><stop offset="1" stopColor="var(--art-shadow)"/></linearGradient>
    <linearGradient id={`${id}-wood`} x1="0" y1="0" x2="0" y2="1"><stop stopColor="var(--art-timber)"/><stop offset=".55" stopColor="var(--art-surface)"/><stop offset="1" stopColor="var(--art-shadow)"/></linearGradient>
    <radialGradient id={`${id}-light`}><stop stopColor="var(--art-brass)" stopOpacity=".26"/><stop offset=".5" stopColor="var(--art-brass)" stopOpacity=".08"/><stop offset="1" stopColor="var(--art-brass)" stopOpacity="0"/></radialGradient>
    <pattern id={`${id}-hatch`} width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(28)"><path d="M0 0V9" stroke="var(--art-ivory)" strokeWidth=".7" opacity=".18"/></pattern>
  </defs>;
}

export function Pulley({ x = 0, y = 0, size = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${size})`} className="engraved-pulley">
    <path d="M-20-31Q0-44 20-31L26 31Q0 44-26 31Z" fill="var(--art-surface)" stroke="var(--art-brass)" strokeWidth="2"/>
    <path d="M-14-30Q0-36 14-30M-19 28Q0 35 19 28" className="ink-fine"/>
    <g className="pulley-wheel anim-mechanism"><circle r="18" fill="var(--art-timber)" stroke="var(--art-ivory)"/><circle r="12" className="ink-fine"/>{[0,60,120].map(angle => <path key={angle} d="M0-15V15" transform={`rotate(${angle})`} className="ink-fine"/>)}<circle r="4" fill="var(--art-brass)" stroke="var(--art-surface)"/></g>
    <path d="M-25-39Q0-54 25-39M-28 39Q0 51 28 39" className="ink-brass"/>
  </g>;
}

export function SailRig({ id, className = '' }) {
  return <g className={`sail-rig ${className}`}>
    <g className="rigging-back ink-fine" opacity=".7">
      <path d="M347 26L78 492M347 26L508 515M184 123L90 504M184 123L364 532M336 185L119 543M338 179L472 541M329 374L95 518M329 374L494 531"/>
      <path d="M92 491Q346 435 553 482M79 504Q293 487 528 503"/>
      {Array.from({length:15},(_,i) => <path key={i} d={`M${297-i*5.5} ${237+i*19}L${358+i*6.8} ${235+i*19}`} opacity=".7"/>)}
    </g>
    <g className="sail-cloth sail-upper anim-sail-upper">
      <path d="M244 137Q338 104 431 122Q412 185 447 256Q337 225 224 269Q254 201 244 137Z" fill={`url(#${id}-sail)`} stroke="var(--art-ivory)" strokeWidth="1.8"/>
      <Pigment id={id} tone="sage" d="M237 145Q263 116 312 119L329 114Q382 106 420 124L416 154Q424 184 410 213L432 243Q391 237 361 239L337 230Q283 242 224 262L239 222L231 204Q250 173 237 145ZM268 145l35-9l-9 6l-23 7ZM320 225l27-5l-13 9Z"/>
      <Pigment id={id} tone="sea" light d="M363 116Q398 107 437 119L432 149Q413 185 434 221L443 253Q410 243 394 231L387 197Q369 167 373 143Z"/>
      <path d="M253 145Q340 118 422 131Q407 188 438 246Q335 217 235 257" className="ink-fine"/>
      {[0,1,2,3,4,5].map(i => <path key={i} d={`M${268+i*27} ${139-i*2}Q${252+i*31} 191 ${249+i*33} ${251-i*2}`} className="sail-seam"/>)}
      <path d="M241 185Q335 153 426 174M235 218Q337 187 435 210" className="ink-fine" opacity=".45"/>
      <path d="M258 146L250 151M285 138L278 145M314 131L307 138M344 128L337 135M375 128L369 136M405 133L399 141" className="ink-brass"/>
    </g>
    <g className="sail-cloth sail-main anim-sail-main">
      <path d="M210 292Q335 248 467 266Q440 344 480 425Q356 441 210 463Q244 376 210 292Z" fill={`url(#${id}-sail)`} stroke="var(--art-ivory)" strokeWidth="2"/>
      <Pigment id={id} tone="sage" d="M200 299Q244 283 273 287L291 274Q338 266 358 273L396 262L445 269Q453 289 440 312L448 334Q438 375 467 404L474 432L446 427Q415 445 378 438L355 449L319 440Q273 456 212 471L218 437L231 414Q226 382 234 359L220 345ZM264 320l23-10l26-3l-32 11ZM246 413l11 8l-8 16l-5-9ZM389 420l30-5l-17 12Z"/>
      <Pigment id={id} tone="sea" light d="M320 274Q342 261 372 267L358 293L377 310Q369 349 383 376L368 401L378 442L340 452L319 426L330 399Q310 369 321 337L308 321Z"/>
      <Pigment id={id} tone="sea" light d="M194 350C180 324 205 309 231 332C253 355 239 378 260 401Q284 416 290 442C271 462 245 446 222 470C203 482 181 462 198 442Q218 416 199 391Q183 374 194 350Z"/>
      <path d="M222 300Q340 258 456 274Q432 349 467 416L224 449Q252 372 222 300Z" fill={`url(#${id}-hatch)`} stroke="var(--art-ivory)" strokeWidth=".7"/>
      {[0,1,2,3,4,5,6].map(i => <path key={i} d={`M${237+i*32} ${293-i*2.9}Q${264+i*22} ${350-i*2} ${241+i*32} ${446-i*4.1}`} className="sail-seam"/>)}
      <path d="M228 350Q344 311 453 327M233 390Q353 357 461 373" className="ink-fine" opacity=".45"/>
      <path d="M223 300Q204 313 202 331M463 272Q484 297 481 326M214 456Q197 476 169 480M476 421Q497 461 520 479" className="ink-brass"/>
    </g>
    <g className="sail-cloth sail-fore anim-sail-fore">
      <path d="M182 171Q140 236 124 314Q194 285 239 316Q213 245 216 179Z" fill={`url(#${id}-sail)`} stroke="var(--art-ivory)" strokeWidth="1.6"/>
      <Pigment id={id} tone="sea" d="M179 165L199 183L196 222Q210 249 208 276L233 312Q192 291 162 302L122 324L136 282L141 251L157 230Q156 197 179 165ZM156 278l12-24l-3 18Z"/>
      <path d="M185 184Q157 240 139 301M199 184Q184 240 181 296M211 187Q211 250 225 301M157 238Q188 226 219 238" className="sail-seam"/>
      <path d="M475 203L551 482Q506 452 444 465Q480 349 475 203Z" fill={`url(#${id}-sail)`} stroke="var(--art-brass)" strokeWidth="1.3"/>
      <Pigment id={id} tone="sage" light d="M481 258L501 305L505 335L525 369L530 419L548 478L519 463L500 465Q472 453 445 473L466 414L467 383Q483 340 477 308Z"/>
      <path d="M484 252L534 465Q498 450 456 455M486 316L482 454M495 362L505 455" className="sail-seam"/>
    </g>
    <g className="masts">
      <path d="M345 26L326 550M184 118L165 532" stroke="var(--art-shadow)" strokeWidth="9"/>
      <path d="M345 26L326 550M184 118L165 532" stroke={`url(#${id}-brass)`} strokeWidth="3"/>
      <path d="M232 136L438 119M198 288L476 263M127 177L245 175M323 71L364 69" className="ink-ivory" strokeWidth="4"/>
      <path d="M232 142L438 125M198 295L476 269" className="ink-brass"/>
      {[0,1,2,3,4].map(i => <path key={i} d={`M${342-i} ${184+i*59}l-8-1m0 4l8 1`} className="ink-ivory"/>)}
    </g>
    <g className="rigging-front anim-rigging ink-brass">
      <path d="M232 137Q205 347 109 523M438 120Q466 331 507 508M197 288Q167 442 83 493M476 263Q503 386 549 482M128 177L83 493M245 175L390 535"/>
      <path d="M338 83Q382 116 438 120M332 209Q403 255 476 263M336 89Q274 134 232 137M330 213Q264 273 197 288"/>
    </g>
    <g className="engraved-hull">
      <path d="M69 491Q258 561 503 482L532 463L515 507L477 521L458 568Q293 619 127 554Z" fill={`url(#${id}-wood)`} stroke="var(--art-ivory)" strokeWidth="2"/>
      <Pigment id={id} tone="coral" d="M89 504L136 521Q195 541 235 539L278 551Q374 550 425 531L478 520L461 547L462 571L439 571Q351 601 271 587L250 594L211 582L174 578L127 557Z"/>
      <path d="M83 506Q286 572 486 514M106 529Q280 587 466 537M131 552Q286 596 457 558M143 560L124 521M186 574L173 533M231 582L224 543M280 586V550M332 583L337 546M384 575L396 539M427 566L446 527" className="ink-fine"/>
      <path d="M80 495Q265 559 505 492" className="ink-brass" strokeWidth="4"/>
      <path d="M112 519L116 543M138 528L143 552M457 523L449 549" className="ink-brass"/>
      {[0,1,2,3,4,5,6,7].map(i => <circle key={i} cx={179+i*32} cy={551+Math.sin(i/2)*9} r="2.5" fill="var(--art-brass)"/>)}
    </g>
    <Pulley x={207} y={292} size={.32}/><Pulley x={481} y={274} size={.3}/>
  </g>;
}

const waveContours = [
  'M-80 107C10 143 45 78 125 91S256 157 339 119S441 57 493 83S582 148 679 99S835 92 895 122S1036 51 1102 91S1213 147 1300 105',
  'M-80 117C15 153 45 88 125 101S256 167 339 129S441 67 493 93S582 158 679 109S835 102 895 132S1036 61 1102 101S1213 157 1300 115',
  'M-80 129C15 165 51 101 126 113S256 178 339 141S441 79 493 105S582 170 679 121S835 114 895 144S1036 73 1102 113S1213 169 1300 127',
  'M-80 143C16 179 60 115 128 129S256 193 339 157S441 95 493 121S582 186 679 137S835 130 895 160S1036 89 1102 129S1213 185 1300 143',
  'M-80 162C16 198 65 138 132 148S256 212 339 176S441 118 493 140S582 205 679 156S835 152 895 179S1036 109 1102 148S1213 204 1300 162',
];
export function EngravedWater({ id, className = '', filled = false }) {
  return <g className={`engraved-water ${className}`}>
    {filled && <path d={`${waveContours[0]}L1300 260H-80Z`} fill="var(--art-water)" stroke="none"/>}
    <Pigment id={id} tone="sea" light={!filled} d="M-22 109Q61 151 107 105L144 109Q205 105 256 144Q315 160 363 111L393 108Q441 64 479 87Q537 136 583 137L612 124Q657 126 698 104L737 96Q796 96 831 110L886 139Q940 153 991 109L1020 99Q1060 72 1106 103L1137 122Q1188 155 1249 125L1270 144Q1213 182 1146 151L1112 135Q1061 100 1016 142L987 146Q919 187 866 161L833 153Q770 124 718 142L688 161Q614 192 557 159L534 158Q475 116 441 134L413 134Q351 183 287 184L259 167Q218 171 177 145L142 141Q76 179 5 153L-25 157ZM195 136l37 16l22 2l-29-16ZM764 129l46 11l-25 1l-22-7ZM1082 117l24 6l-5 6l-34-12Z"/>
    {filled && <Pigment id={id} tone="sea" light d="M134 180Q229 150 301 179L334 177Q430 151 491 182L511 175Q591 199 653 178L692 180Q741 160 796 183L782 204Q746 198 700 208L665 203Q595 226 528 207L490 213Q427 189 369 207L337 201Q250 221 199 201L166 205Z"/>}
    {waveContours.map((d,i) => <path key={i} d={d} fill="none" stroke={i === 0 ? 'var(--art-ivory)' : 'var(--art-sea)'} strokeWidth={i === 0 ? 1.5 : .8} opacity={1-i*.1}/>)}
    <g className="wave-crests">
      <path d="M346 116C380 105 387 80 414 70C442 60 468 65 478 80C466 76 458 77 453 83C442 95 459 102 481 108C455 112 438 98 425 90C415 83 407 88 399 98C382 115 361 120 346 116Z" fill="var(--art-water-crest)" stroke="var(--art-ivory)" strokeWidth="1"/>
      <path d="M369 112Q392 102 410 80Q433 66 455 74M392 103Q410 75 439 75M409 96Q416 89 423 94M437 99Q451 110 465 110" className="ink-fine"/>
      <path d="M425 65q-7-9-14-4m17-6q6-8 13-5m16 13q9-9 16-4M937 114Q972 73 1003 78Q1021 80 1031 94Q1010 82 1000 91Q990 102 1013 107Q990 111 982 99Q963 98 948 113" className="ink-ivory"/>
      <path d="M982 70l5-5m10 8l7-5m-20 31l-12 12m-17-5l-9 7M501 127q17 5 28 2m-14 8h11" className="ink-fine"/>
    </g>
    <g className="wave-engraving ink-fine">
      <path d="M167 102C223 114 249 145 310 132M178 111C232 122 263 149 303 143M367 100Q416 59 459 70M378 103Q420 72 457 80M531 107Q567 131 615 114M545 119Q576 137 602 129M723 87Q771 74 816 94M733 95Q775 87 808 103M923 112Q964 74 1014 77M938 114Q976 87 1008 87M1135 119Q1173 140 1218 134"/>
      {Array.from({length:28},(_,i) => <path key={i} d={`M${i*44-25} ${183+(i%4)*5}q12-4 25 0m-18 5l12-1`} opacity=".45"/>)}
    </g>
  </g>;
}

export function BotanicalBranch({ id, className = '' }) {
  return <g className={`botanical-branch ${className}`}>
    <path d="M46 306C153 218 141 109 180 14M71 273Q17 222 18 172M119 211Q217 196 243 131M139 147Q76 112 74 54" className="ink-brass" strokeWidth="1.6"/>
    {[[66,280,-47,.8],[94,243,35,.93],[120,201,-38,1],[136,164,41,.86],[145,118,-25,.83],[160,74,35,.68],[177,30,-7,.6],[47,239,-58,.72],[22,191,-22,.52],[188,183,61,.7],[222,157,64,.54]].map(([x,y,r,s],i) => <g key={i} transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      <path d="M0 0C-31-13-34-47-6-82C20-57 26-20 0 0Z" fill="var(--art-leaf)" stroke="var(--art-ivory)" strokeWidth="1"/>
      <Pigment id={id} tone="sage" d="M-4 5Q-27-4-26-25L-32-35Q-34-55-8-85L-1-69Q19-53 22-31L14-19Q14-3-4 5ZM-21-36l3-12l4-4l-3 14ZM1-59l6 9l-2 9Z"/>
      <path d="M0 0Q-6-39-6-78M-3-20L-22-32M-4-33L-23-48M-5-48L-18-60M-4-26L12-42M-5-42L10-59M-5-59L3-68" className="ink-fine" opacity=".65"/>
    </g>)}
    <path d="M35 317Q83 306 105 288M28 324Q67 320 90 307" className="ink-fine"/>
  </g>;
}

export function Vessel({ id, form = 0 }) {
  const outlines = [
    'M24 12H49V32Q69 45 66 77L62 100Q38 108 13 100L9 77Q7 45 24 32Z',
    'M23 16H50L52 35Q64 41 60 59L63 96Q39 107 14 96L17 59Q12 41 24 35Z',
    'M26 7H47V36Q71 51 65 82Q59 106 37 106Q12 105 10 83Q5 54 26 36Z',
  ];
  return <g className="vessel">
    <path d={outlines[form%3]} fill={`url(#${id}-glass)`} stroke="var(--art-ivory)" strokeWidth="1.3"/>
    <Pigment id={id} tone="sea" d="M15 47Q26 57 37 49L50 51L65 45L62 68Q72 92 57 100L39 107L18 101L8 84L13 68Z M25 70l4 14l-1 7l-4-13Z"/>
    <path d="M25 17H49M25 22H49M17 92Q38 99 59 92M20 96Q38 102 56 96M18 55Q16 67 19 84M23 51L23 79" className="ink-fine"/>
    <path d="M25 7Q37 2 49 7V13H25Z" fill="var(--art-timber)" stroke="var(--art-brass)"/>
    <path d="M30 6V11M36 5V11M43 6V11" className="ink-fine"/>
    <path d="M55 51Q59 65 55 77" stroke="var(--art-ivory)" strokeWidth="2" fill="none" opacity=".45"/>
  </g>;
}

function Drawer({ id, x, y, width = 150, index = 0 }) {
  return <g transform={`translate(${x} ${y})`}><g className={`case-drawer anim-drawer drawer-${index%3}`}>
    <path d={`M0 0H${width}V62H0Z`} fill="var(--art-surface)" stroke="var(--art-brass)" strokeWidth="1.3"/>
    <Pigment id={id} tone="amber" d={`M-4 13L26 6L49 10L${width-14} 4L${width+5} 18L${width-3} 39L${width+2} 58L${width-36} 53L${width-70} 61L21 52L4 57L7 38Z M24 30l35-4l-19 7Z`}/>
    <path d={`M6 7H${width-6}V54H6ZM12 13H${width-12}M12 47H${width-12}`} className="ink-fine" opacity=".65"/>
    <path d={`M10 38Q${width/3} 28 ${width-10} 37M15 42Q${width/2} 34 ${width-16} 41`} className="ink-fine" opacity=".25"/>
    <path d={`M${width/2-13} 25h26v13h-26Z`} fill="var(--art-timber)" stroke="var(--art-brass)"/>
    <path d={`M${width/2-6} 34q6 12 12 0`} className="ink-brass"/>
    <circle cx={width/2-9} cy="30" r="1" fill="var(--art-ivory)"/><circle cx={width/2+9} cy="30" r="1" fill="var(--art-ivory)"/>
  </g></g>;
}

export function ApothecaryCase({ id, className = '' }) {
  return <g className={`apothecary-case ${className}`}>
    <path d="M85 75L115 43H500L532 75V429H85Z" fill={`url(#${id}-wood)`} stroke="var(--art-brass)" strokeWidth="2"/>
    <path d="M91 73H525M109 66H508M116 50H497M98 83H520V415H98ZM106 91H512V407H106" className="ink-fine"/>
    <path d="M75 427H542V449H75ZM92 449V466H119V449M498 449V466H525V449" fill="var(--art-surface)" stroke="var(--art-brass)" strokeWidth="1.4"/>
    <path d="M82 435H534M88 441H527" className="ink-fine"/>
    <path d="M122 106H495V306H122Z" fill="var(--art-shadow)" stroke="var(--art-ivory)"/>
    <path d="M117 204H501V214H117ZM301 106V306H312V106" fill="var(--art-timber)" stroke="var(--art-brass)"/>
    {[0,1,2,3,4,5,6,7].map((item) => <g key={item} transform={`translate(${135+(item%4)*89} ${item<4?117:222}) scale(.64)`}><Vessel id={id} form={item}/></g>)}
    <Drawer id={id} x={122} y={322} width={174} index={0}/><Drawer id={id} x={320} y={322} width={175} index={1}/>
    <g className="case-door door-left">
      <path d="M86 84L8 111V398L86 426Z" fill={`url(#${id}-wood)`} stroke="var(--art-brass)" strokeWidth="2"/>
      <Pigment id={id} tone="sage" d="M1 121L37 101L67 99L82 88L77 151L84 193L75 223L81 267L72 291L84 347L78 406L88 423L62 417L38 403L3 399L10 357L4 305L10 282L2 230L10 194Z M28 157l7-17l-1 37l-7 15ZM60 311l7 20l-5 34Z"/>
      <Pigment id={id} tone="sage" light d="M4 148C-24 131-29 165-13 191Q8 220-9 245C-26 272-9 293 11 280Q26 259 16 231Q9 210 28 192C44 173 30 161 4 148Z"/>
      <path d="M75 102L18 121V388L75 409ZM65 115L28 128V380L65 394" className="ink-fine"/>
      <path d="M30 151L62 141M30 222L62 217M30 294L62 295M30 365L62 372" className="ink-brass"/>
      <path d="M43 160V202M49 158V203M43 236V275M49 236V276M43 310V345M49 311V346" className="ink-fine" opacity=".55"/>
      <path d="M84 124H97V152H84ZM84 355H97V383H84Z" fill="var(--art-metal-mid)" stroke="var(--art-metal-light)"/>
      <path d="M88 130V147M88 361V378" stroke="var(--art-shadow)"/>
    </g>
    <g className="case-door door-right">
      <path d="M531 84L609 111V398L531 426Z" fill={`url(#${id}-wood)`} stroke="var(--art-brass)" strokeWidth="2"/>
      <Pigment id={id} tone="amber" d="M542 88L571 103L597 102L615 117L607 146L613 199L606 222L615 273L609 302L615 357L604 386L610 402L579 405L550 422L531 422L539 380L532 351L540 309L533 277L540 239L534 208L542 156Z M574 142l8 24l-3 31l-6-13ZM552 352l6 25l-3 13Z"/>
      <path d="M542 102L599 121V388L542 409ZM552 115L589 128V380L552 394" className="ink-fine"/>
      <path d="M555 141L587 151M555 217L587 222M555 295L587 294M555 372L587 365" className="ink-brass"/>
      <path d="M568 158V203M574 160V202M568 236V276M574 236V275M568 311V346M574 310V345" className="ink-fine" opacity=".55"/>
      <path d="M520 124H533V152H520ZM520 355H533V383H520Z" fill="var(--art-metal-mid)" stroke="var(--art-metal-light)"/>
      <path d="M529 130V147M529 361V378" stroke="var(--art-shadow)"/>
    </g>
    <g className="case-catch anim-mechanism"><path d="M287 53H329V76H287Z" fill="var(--art-surface)" stroke="var(--art-brass)"/><path d="M299 62Q308 53 317 62V71H299Z" className="ink-ivory"/><circle cx="308" cy="63" r="2.5" fill="var(--art-brass)"/></g>
    <path d="M139 58L154 58M463 58H478M123 399H493" className="ink-brass"/>
    {[[115,96],[503,96],[115,404],[503,404]].map(([x,y]) => <g key={`${x}-${y}`}><circle cx={x} cy={y} r="3" fill="var(--art-brass)"/><path d={`M${x-1.5} ${y+1.5}l3-3`} stroke="var(--art-shadow)"/></g>)}
  </g>;
}

export function Lantern({ id }) {
  return <g className="engraved-lantern">
    <ellipse className="lantern-halo anim-lantern" cx="120" cy="208" rx="138" ry="175" fill={`url(#${id}-light)`}/>
    <path d="M118 0V45M123 0V45M102 64Q88 39 119 37Q149 39 137 64" className="ink-brass" strokeWidth="2"/>
    <g className="lantern-body anim-lantern-body">
      <path d="M70 98L92 66H149L173 98Z" fill={`url(#${id}-wood)`} stroke="var(--art-brass)" strokeWidth="2"/>
      <path d="M73 104H170L185 264Q122 283 57 264Z" fill={`url(#${id}-glass)`} stroke="var(--art-ivory)" strokeWidth="1.5"/>
      <Pigment id={id} tone="amber" d="M76 98L115 106L153 100L170 118L168 148L180 181L176 213L190 255L179 272L157 270Q122 289 93 275L54 269L64 243L60 220L73 187L68 156L78 137Z M88 142l7-19l-1 26l-8 17ZM148 242l18 8l-7 5l-15-10Z"/>
      <path d="M86 110L77 255M158 110L168 255M116 108V269M127 108V269M72 192Q123 208 175 192" className="ink-brass"/>
      <path d="M66 269Q122 288 181 269L188 287Q124 311 52 288Z" fill={`url(#${id}-wood)`} stroke="var(--art-brass)" strokeWidth="2"/>
      <path d="M73 284Q124 300 170 285M93 72H146M87 80H155M80 89H164" className="ink-fine"/>
      <path className="lamp-flame anim-flame" d="M117 226Q99 213 115 190Q128 175 125 163Q146 203 130 225Z" fill="var(--art-brass)" stroke="var(--art-metal-light)" strokeWidth="1"/>
      <path d="M100 232Q123 226 146 232V247H100Z" fill="var(--art-timber)" stroke="var(--art-brass)"/>
      <path d="M94 124L90 169M151 132L155 161M84 214L82 240" stroke="var(--art-ivory)" opacity=".7"/>
      {[0,1,2,3,4].map(i => <circle key={i} cx={94+i*13} cy="84" r="1.4" fill="var(--art-ivory)"/>)}
    </g>
  </g>;
}
