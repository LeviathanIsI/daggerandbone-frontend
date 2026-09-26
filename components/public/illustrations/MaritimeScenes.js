import Drawing from './IllustrationFrame';
import { SailRig, EngravedWater, ApothecaryCase, BotanicalBranch, Lantern, Pulley, Vessel } from './EngravedParts';
import Pigment from './Pigment';

export function CabinetScene({ className = '' }) {
  return <Drawing viewBox="-65 -70 1230 830" className={`cabinet-drawing ${className}`} scene="guide-cabinet">{id => <>
    <ellipse cx="610" cy="371" rx="355" ry="260" fill={`url(#${id}-light)`}/>
    <g transform="translate(40 292) scale(1.02)"><BotanicalBranch id={id} className="anim-botanical"/></g>
    <g transform="translate(1055 262) scale(-.78 .78)"><BotanicalBranch id={id} className="anim-botanical"/></g>
    <g transform="translate(242 78) scale(1.16)"><ApothecaryCase id={id}/></g>
    <g className="workbench ink-brass"><path d="M38 620H1058L1091 650H5ZM39 627H1057M5 650H1091V661H5Z" fill={`url(#${id}-wood)`}/><path d="M70 639Q286 632 522 640T1003 640M107 645Q309 639 468 646M831 646H1040" opacity=".45"/></g>
    <g transform="translate(118 505) scale(1.01)"><Vessel id={id} form={2}/></g>
    <g transform="translate(197 544) scale(.65)"><Vessel id={id} form={1}/></g>
    <g className="ink-fine" opacity=".6"><path d="M65 603Q152 615 231 600M885 597Q981 585 1042 611M910 605Q998 598 1030 616"/></g>
  </>}</Drawing>;
}

export function SailsScene({ className = '' }) {
  return <Drawing viewBox="-90 -95 1280 910" className={`sails-drawing ${className}`} scene="guide-sailing-ship">{id => <>
    <g className="stays ink-fine" opacity=".38"><path d="M165 0Q272 274 186 634M195 0Q296 281 209 642M25 169L995 108M32 177L1003 117"/><path d="M170 136L41 279M162 225L67 407M267 481L1092 470"/></g>
    <g transform="translate(206 470) scale(.75 .47)" opacity=".5"><EngravedWater id={id} className="anim-water-back"/></g>
    <g transform="translate(292 -11) scale(1.08)"><SailRig id={id}/></g>
    <g transform="translate(-10 523) scale(.94 .65)"><EngravedWater id={id} className="anim-water-mid" filled/></g>
    <g transform="translate(-90 591) scale(1.07 .66)"><EngravedWater id={id} className="anim-water-front" filled/></g>
    <g transform="translate(150 370)"><Pulley size={1.05}/><path d="M-23 39Q-100 171-2 219Q80 243 47 155Q18 117-17 163Q-44 222 16 230Q66 236 71 187" className="ink-brass" strokeWidth="2"/><path d="M-19 43Q-90 168-1 213Q68 235 42 162Q18 130-10 167Q-30 214 17 220" className="ink-fine"/></g>
  </>}</Drawing>;
}

export function CurrentScene({ className = '' }) {
  return <Drawing viewBox="-65 -55 1230 775" className={`current-drawing cabin-drawing ${className}`} scene="guide-lantern">{id => <>
    <defs><radialGradient id={`${id}-cabin-wall`}><stop stopColor="var(--art-timber)"/><stop offset=".62" stopColor="var(--art-timber)" stopOpacity=".85"/><stop offset="1" stopColor="var(--art-timber)" stopOpacity="0"/></radialGradient></defs>
    {/* Original cabin joinery, drawn around the retained lantern. The outer frame's
        organic mask softens the wood into the page; it is not an image backdrop. */}
    <g className="cabin-paneling">
      <ellipse cx="585" cy="340" rx="478" ry="294" fill={`url(#${id}-cabin-wall)`}/>
      <Pigment id={id} tone="coral" light d="M223 146L362 115L361 178L344 209L353 289L339 337L355 377L346 477L351 550L316 567L213 540L228 497L222 445L235 393L216 342L231 295L217 241Z M249 193l11-26l-5 47l-9 19ZM307 443l-7 37l-5-20l6-28Z"/>
      <Pigment id={id} tone="coral" light d="M699 100L818 109L839 122L821 187L827 246L813 301L835 357L825 406L838 442L832 531L817 559L710 578L717 528L703 473L718 418L701 355L710 297L698 224Z M747 153l9 7l-4 54l-8-21ZM791 461l8 18l-5 43l-7-31Z"/>
      <g className="ink-fine" opacity=".55">
        {[209,282,354,451,531,613,696,779,862,941].map((x,i) => <path key={x} d={`M${x} ${110-i*2}Q${x-9} 307 ${x+10} ${583+i%3*8}M${x+5} ${121-i*2}Q${x-3} 315 ${x+16} ${581+i%3*8}`}/>)}
        <path d="M230 175Q256 251 240 348T251 531M299 202Q288 279 312 391T317 544M469 134Q490 265 476 353M548 497Q560 540 553 582M718 424Q731 502 724 550M869 122Q876 202 882 249M929 394Q914 467 941 541"/>
        <path d="M292 388q20-23 27 2q-4 27-22 18q-14-7-5-20ZM299 389q10-8 12 3q-3 12-8 10M735 485q-14-25-22-10q-11 18 7 38q11 2 15-28ZM723 480q-8-7-8 4l10 17"/>
        <path d="M179 182l10-2M180 443l10 1M328 139l9-1M333 533l10 1M665 117h9M674 567l10-1M948 163l10 1M966 525l9-1"/>
      </g>
    </g>
    <g className="cabin-woodlight anim-lantern">
      <ellipse cx="576" cy="340" rx="271" ry="262" fill={`url(#${id}-light)`}/>
      <Pigment id={id} tone="amber" light d="M450 209Q492 162 546 179L583 169L620 204L648 198L676 252L665 282L692 326L677 379L689 424L658 477L627 480L601 517L551 503L513 518L480 472L452 467L439 413L447 376L425 337L441 296L431 258Z M466 288l6-20l-2 51l-7 11ZM648 367l-5 25l8 24l6-14Z"/>
    </g>
    <g className="cabin-rib">
      <path d="M174 600C55 383 145 152 354 55L397 65C189 183 126 377 221 599Z" fill={`url(#${id}-wood)`} stroke="var(--art-brass)" strokeWidth="2.3"/>
      <Pigment id={id} tone="coral" d="M349 66L381 65Q254 153 205 259L187 271L181 321L168 345Q158 458 208 587L182 585L165 535Q126 411 157 280L170 258L180 214L208 183Q263 107 349 66Z M177 416l-5 30l8 22l-2-38Z"/>
      <path d="M185 583C105 397 157 196 362 79M193 578C119 381 177 199 366 88M196 217l22 12M153 359l26 4M165 494l26-6M304 113l15 19" className="ink-fine"/>
      {[{x:312,y:118},{x:207,y:224},{x:166,y:360},{x:178,y:493}].map(({x,y}) => <g key={y} className="ink-brass"><circle cx={x} cy={y} r="5"/><path d={`M${x-3} ${y-2}l6 4`}/></g>)}
    </g>
    <g className="cabin-wall-beam">
      <path d="M369 83L416 77L427 592L377 600Z" fill={`url(#${id}-wood)`} stroke="var(--art-brass)" strokeWidth="2"/>
      <Pigment id={id} tone="coral" d="M378 92L410 84L408 148L415 179L408 238L419 295L411 343L420 418L412 459L420 583L382 590L383 521L377 479L383 408L377 363L384 286L376 249L382 188Z"/>
      <path d="M378 96L387 581M403 92Q398 322 416 579M385 352q17-24 21 6q-5 19-16 12M391 354q9-14 10 2M380 121l28-3M385 549l30-3" className="ink-fine"/>
      <circle cx="391" cy="111" r="3" fill="var(--art-brass)"/><circle cx="402" cy="565" r="3" fill="var(--art-brass)"/>
    </g>
    <g className="cabin-porthole" transform="translate(829 287)">
      <circle r="106" fill={`url(#${id}-wood)`} stroke="var(--art-brass)" strokeWidth="2"/>
      <circle r="93" fill="var(--art-shadow)" stroke="var(--art-brass)" strokeWidth="1.5"/>
      <circle r="82" fill={`url(#${id}-glass)`} stroke="var(--art-sea)" strokeWidth="1.4"/>
      <Pigment id={id} tone="sea" d="M-47-66Q-13-91 30-71L50-48L59-19L75 9L61 36L54 56L26 70L-4 69L-33 77L-62 49L-75 12L-69-22Z M-38-45l-9 25l7-2l8-29ZM34 45l-2 15l7-6l2-13Z"/>
      <path d="M-47-48L17-68M-57-23L42-55M-41 25L61-10M-31 56L40 35" stroke="var(--art-ivory)" strokeWidth="1" opacity=".6"/>
      <g className="ink-fine">{Array.from({length:12},(_,i) => <g transform={`rotate(${i*30})`} key={i}><circle cy="-99" r="3"/><path d="M-2-101L2-97"/></g>)}</g>
      <path d="M-15-108V-119H15V-108M-9-119V-127H9V-119M-102 17H-115V-16H-102M102 17H115V-16H102" className="ink-brass"/>
      <path d="M-12 86L-16 113H16L12 86Z" fill="var(--art-surface)" stroke="var(--art-brass)"/><path d="M-7 104H7" className="ink-ivory"/>
    </g>
    <g className="cabin-bracket">
      {/* The iron plate is bolted to the beam. Its arm and lower brace meet
          the suspension eye at (588,180), the pendulum's exact pivot. */}
      <path d="M384 121L409 118L412 263L386 266Z" fill="var(--art-surface)" stroke="var(--art-ivory)" strokeWidth="1.6"/>
      <path d="M410 139H573Q593 139 593 161V175H583V162Q583 151 572 151H410ZM411 230Q478 219 524 160L534 167Q490 228 412 241Z" fill="var(--art-shadow)" stroke="var(--art-ivory)" strokeWidth="2"/>
      <path d="M419 145H569M420 234Q482 220 525 166M576 143Q588 146 588 162" className="ink-brass"/>
      <path d="M588 168V174M581 180a7 7 0 1 0 14 0a7 7 0 1 0-14 0" className="ink-ivory"/>
      <circle cx="397" cy="132" r="4" className="ink-ivory"/><circle cx="400" cy="252" r="4" className="ink-ivory"/>
      <path d="M395 130l4 4M398 250l4 4" className="ink-fine"/>
    </g>
    <g transform="translate(450 180) scale(1.15)"><g className="cabin-hanging-lantern"><Lantern id={id}/></g></g>
    <g className="cabin-lower-rail"><path d="M220 589Q583 635 982 576L991 597Q588 659 223 612Z" fill={`url(#${id}-wood)`} stroke="var(--art-brass)" strokeWidth="1.6"/><path d="M235 599Q586 644 976 588M287 606l9 1M430 622l10 1M786 622l10-1M926 602l9-2" className="ink-fine"/></g>
  </>}</Drawing>;
}

export function ScentGuideScene({ family }) {
  return family === 'cordovan' ? <CabinetScene/> : family === 'mordant' ? <SailsScene/> : <CurrentScene/>;
}
