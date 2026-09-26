import Drawing from './IllustrationFrame';
import Pigment from './Pigment';
import { Coil, Quill, PaperMarks } from './WorkshopParts';
import { CorrespondenceScene } from './PageScenes';

export function DispatchScene() {
  return <Drawing scene="signup-dispatch-rack">{id => <>
    <ellipse cx="500" cy="390" rx="320" ry="244" fill={`url(#${id}-light)`}/>
    <g className="ink-brass"><path d="M301 558V216L688 170V511Z" fill={`url(#${id}-wood)`}/>
      <Pigment id={id} tone="sage" light d="M295 218L330 209L362 211L407 197L433 201L486 185L515 190L552 176L590 181L643 168L686 168L695 196L687 226L694 267L686 295L695 337L687 364L693 409L686 433L696 478L688 513L658 519L634 515L591 534L564 528L519 544L485 540L438 554L416 548L371 565L340 559L299 567L306 529L297 509L305 475L298 446L303 409L298 378L306 342L298 307L305 276L297 250Z M332 246l57-7l-27 10l-28 4ZM632 464l6 20l-5 14Z"/><path d="M318 538V233l350-43v305ZM319 396l349-47M319 474l349-47"/><path d="M331 472v-66l92-11v65m21-2v-66l93-12v67m20-3v-66l93-12v66"/>
      <g className="anim-paper"><path d="M351 384l-6-96l102-11l-2 95Z" fill="var(--art-paper)"/>
      <Pigment id={id} tone="sea" d="M339 291L364 281L386 285L410 276L448 278L453 296L446 319L451 342L445 373L424 381L399 379L378 389L348 388L350 368L343 348L349 327L342 314Z M365 305l21 12l6 10l-21-16Z"/><path d="M345 288l52 43l50-54m-78 83l57-7"/></g>
      <g className="anim-tag"><path d="M485 368l-19-114l139-18l20 111Z" fill="var(--art-surface)"/>
      <Pigment id={id} tone="coral" d="M461 255L484 246L507 247L530 236L554 240L586 229L606 234L610 252L608 273L619 294L616 315L630 347L614 358L595 354L569 365L547 361L518 372L483 375L484 353L475 337L478 315L468 293Z M544 331l29-6l-17 9Z"/><path d="M466 254l76 46l63-64m-118 123l49-57l89 45"/><circle cx="542" cy="300" r="12"/></g>
      <path d="M285 564l414-51l17 19l-431 54Z" fill="var(--art-timber)"/>
    </g><Coil x={565} y={579} scale={.5}/>
  </>}</Drawing>;
}

export function ClosedFolioScene() {
  return <Drawing scene="unsubscribe-closed-folio">{id => <>
    <ellipse cx="500" cy="395" rx="335" ry="223" fill={`url(#${id}-light)`}/>
    <g className="ink-brass"><path d="M225 343L611 227L765 477L360 594Z" fill={`url(#${id}-wood)`}/>
      <Pigment id={id} tone="sea" d="M219 346L256 329L282 330L326 308L354 310L407 287L435 290L476 269L499 273L549 251L578 250L612 222L635 251L638 274L665 305L667 324L693 356L699 383L726 412L730 434L766 476L750 487L720 487L677 509L651 507L609 529L579 528L530 550L505 548L469 568L441 566L397 587L361 599L342 573L339 555L311 520L308 498L281 466L281 444L257 413L251 388L229 367Z M276 358l46-16l-15 11l-28 10ZM619 472l27-10l-12 12Z"/><path d="M225 343v17l135 255l405-117v-21M360 594v21M247 351l355-105l140 220l-373 110ZM308 319l140 235"/><path d="M350 341l73-20l101 192l-75 20Z" fill="var(--art-clay-wash)"/>
      <Pigment id={id} tone="coral" d="M344 342L371 331L393 334L424 316L438 339L438 356L461 389L463 409L487 442L488 461L513 490L527 515L504 527L484 524L449 539L439 518L439 497L417 472L412 451L392 428L391 408L369 383L367 366Z M413 421l9 15l-2 11l-11-25Z"/><path d="M407 439l42-12l17 32l-43 13Z" fill="var(--art-metal-mid)"/><path d="M427 440l12 23"/><path d="M574 271l54 93m-45-83l54 93" opacity=".35"/></g>
    <Quill id={id} tone="sea" x={665} y={321} angle={58}/><path d="M655 571q-23 34-92 20q-44-12-99 12" className="ink-fine"/>
  </>}</Drawing>;
}

export function ChartCaseScene() {
  return <Drawing scene="notfound-chart-case">{id => <>
    <ellipse cx="507" cy="381" rx="346" ry="238" fill={`url(#${id}-light)`}/>
    <g className="ink-ivory"><path d="M306 257Q312 224 338 235L742 402L654 573L246 388Q281 350 306 257Z" fill="var(--art-paper)"/>
      <Pigment id={id} tone="sage" d="M305 250L326 232L348 236L370 251L395 253L423 271L448 273L477 291L502 293L535 313L563 317L596 337L626 342L657 362L684 368L710 389L745 401L739 422L724 435L719 459L702 474L694 500L679 514L670 545L655 578L630 571L609 554L581 549L556 531L530 528L497 507L470 503L440 481L412 478L379 456L351 452L321 430L296 427L267 405L242 388L256 368L271 355L275 332L290 308L295 281Z M541 375l34 11l17 12l-34-15ZM340 401l22 8l13 11l-33-13Z"/><path d="M324 256l377 156l-57 139L263 382"/>
      <path d="M348 310q23-48 57 0t46 11q40-26 48 14t48 19l86 57m-194-55l-89 62m158-19l-81 63m-67-155l230 211" opacity=".5"/><circle cx="429" cy="356" r="8"/><circle cx="587" cy="430" r="6"/>
    </g>
    <g className="anim-scroll ink-brass"><path d="M259 365L371 181q45-36 76 23L334 397Z" fill={`url(#${id}-wood)`}/>
      <Pigment id={id} tone="sea" d="M253 366L268 337L286 324L290 302L311 281L315 258L333 241L341 216L367 183L382 175L404 177L423 189L449 201L440 227L422 243L419 265L401 285L397 306L378 321L374 342L357 362L347 383L334 402L314 391L298 393L276 374Z M311 313l8-14l12-10l-12 20Z"/><ellipse cx="406" cy="200" rx="40" ry="24" transform="rotate(25 406 200)"/><path d="M280 339l74 31m-64-49l76 30M307 293l78 30m-68-48l77 30"/><path d="M354 302q64-3 70 62t79 74"/></g>
    <Coil x={617} y={578} scale={.46}/>
  </>}</Drawing>;
}

export function RepairScene() {
  return <Drawing scene="error-instrument-repair">{id => <>
    <ellipse cx="490" cy="379" rx="339" ry="234" fill={`url(#${id}-light)`}/>
    <g className="ink-brass"><path d="M283 299l-62 57l88 51l63-51Z" fill={`url(#${id}-wood)`}/>
      <Pigment id={id} tone="coral" d="M278 295L299 306L308 319L337 331L350 345L377 354L360 372L342 378L330 395L308 413L288 399L275 397L254 380L235 377L217 357L230 340L248 334L258 315Z M252 357l21 13l-5 2l-18-12Z"/><path d="M403 368l-63 57l88 52l64-57Z" fill={`url(#${id}-wood)`}/>
      <Pigment id={id} tone="coral" light d="M398 365L422 376L431 390L458 401L471 415L497 418L482 439L465 446L450 464L428 482L409 468L393 466L373 449L355 446L335 425L351 409L367 404L380 384Z"/><path d="M283 310l76 44m-72-39l-28 27m123 83l39 23"/><path d="M340 319l-69 119m76-114l-68 117" strokeWidth="3"/><circle cx="281" cy="340" r="7"/><circle cx="426" cy="418" r="7"/>
      <g className="anim-caliper"><path d="M538 258l-92 276m91-266l116 257M485 421l114-4m-69-165l-10-30l29-9l14 25Z"/>
      <Pigment id={id} tone="sea" light d="M537 268L548 290L551 313L568 340L575 371L592 398L600 429L621 461L628 490L652 521L656 537L640 528L627 502L620 493L607 462L594 448L581 416L570 400L560 372L548 354L540 327L531 315L526 328L520 356L509 373L502 402L490 421L483 451L471 469L465 498L447 537L439 529L451 494L452 474L467 449L471 425L483 402L487 378L501 353L508 324L521 304L527 283Z"/><circle cx="538" cy="258" r="13"/></g>
      <path d="M641 380l112-118l18 17l-113 120m97-132l-109 116M647 381l-46 43q-12 20 6 23l51-47Z" fill="var(--art-metal-dark)"/>
      <g className="anim-mechanism"><Pigment id={id} tone="sea" d="M679 440L696 434L711 437L727 433L737 449L735 462L743 479L733 490L731 502L713 503L700 498L685 503L672 489L674 476L667 462L678 454Z M696 460l10-5l10 10l-8 15l-15-7Z"/><circle cx="705" cy="469" r="35"/><circle cx="705" cy="469" r="25"/><circle cx="705" cy="469" r="6"/><path d="M705 434v29m0 12v29m-35-35h29m12 0h29M680 444l20 20m10 10l20 20m-50 0l20-20m10-10l20-20"/></g>
    </g><g className="ink-fine"><path d="M327 524l37-27m-32 35l37-27M362 561l35-30m-30 38l35-30M686 553l46-12m-43 20l46-12"/><circle cx="370" cy="497" r="6"/><circle cx="404" cy="531" r="6"/></g>
  </>}</Drawing>;
}

export function ShutterScene() {
  return <Drawing scene="unavailable-shutter-latch">{id => <>
    <ellipse cx="500" cy="372" rx="320" ry="262" fill={`url(#${id}-light)`}/>
    <g className="ink-brass"><path d="M286 230Q500 100 714 230V543L286 577Z" fill={`url(#${id}-wood)`}/>
      <Pigment id={id} tone="sage" d="M278 234Q309 208 349 200L372 183Q424 165 470 167L494 157L502 190L497 221L506 252L499 284L505 320L498 345L506 381L498 411L506 450L499 478L506 509L499 542L506 560L477 560L452 570L424 564L393 577L365 571L335 583L314 576L282 586L289 547L279 526L287 492L281 466L288 431L281 402L288 371L281 345L286 306L280 285L285 259Z M319 271l5 30l-5 23l-3-35ZM407 420l6 28l-3 18l-7-27Z"/><Pigment id={id} tone="sea" d="M505 162Q549 155 577 169L602 171Q651 186 679 205L706 215L720 235L714 261L720 293L711 320L718 349L711 378L721 411L713 441L720 470L713 499L720 541L694 550L670 546L643 555L610 550L585 560L559 555L528 566L501 561L508 531L502 508L509 475L502 449L510 418L503 391L509 359L501 330L509 298L503 269L510 238L503 212L510 187Z M647 295l3 42l-6-24ZM544 474l6 22l-4 24l-4-28Z"/><path d="M302 238Q500 120 698 238V528L302 560ZM500 174v370M352 216v338m49-357v350m50-365v363m98-364v357m49-339v334m49-317v312"/>
      <path d="M303 281l395-26v22l-395 28ZM303 485l395-26v22l-395 28Z" fill="var(--art-timber)"/>
      <g className="anim-latch"><path d="M448 380l106-9v25l-106 9Z" fill="var(--art-metal-mid)"/>
      <Pigment id={id} tone="amber" d="M443 380L466 375L484 379L506 371L524 375L551 366L559 378L554 392L539 400L519 398L499 405L477 401L446 410L448 396Z"/><circle cx="463" cy="391" r="5"/><path d="M530 375v-12h17v46h-17v-11"/></g>
      <path d="M327 255l-1 14m350-37v13M327 518v15m351-50v12M468 417q23 20 8 32m17-25q19 23 5 36" opacity=".55"/>
    </g><g transform="translate(355 591) rotate(-6)"><PaperMarks count={2} width={227}/></g>
  </>}</Drawing>;
}

export function UtilityScene({ kind }) {
  const Scene = { contact: CorrespondenceScene, signup: DispatchScene, unsubscribe: ClosedFolioScene, notfound: ChartCaseScene, error: RepairScene, unavailable: ShutterScene }[kind];
  return Scene ? <Scene/> : null;
}
