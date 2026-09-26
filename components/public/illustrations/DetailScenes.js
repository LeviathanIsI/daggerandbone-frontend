import Drawing from './IllustrationFrame';
import Pigment from './Pigment';
import { Timber, Linen, Comb, Brush, Coil, PaperMarks } from './WorkshopParts';

// Objects of a grooming room and a shipboard workshop, never representations of finished products.
export function ShampooScene() {
  return <Drawing scene="product-shampoo-washbasin">{id => <>
    <ellipse cx="496" cy="390" rx="337" ry="244" fill={`url(#${id}-light)`}/><Timber id={id} x={164} y={532} width={637}/>
    <g className="ink-brass"><path d="M272 373Q295 535 469 551Q659 532 715 372" fill={`url(#${id}-glass)`}/>
      <Pigment id={id} tone="sea" d="M269 373Q311 403 346 394L378 409L411 404Q483 419 545 401L571 408Q643 392 681 383L719 369L710 413L693 430Q672 483 623 504L605 522Q546 545 491 548L465 558L421 542L397 541Q333 516 313 473L298 468L280 423Z M340 442l26 27l19 8l-12-14ZM583 478l39-16l-23 17l-21 7Z"/><ellipse cx="494" cy="376" rx="224" ry="76"/><ellipse cx="494" cy="379" rx="198" ry="58"/><path d="M308 423q58 90 143 107m-102-96q42 64 94 81m183-84q-39 54-87 75" opacity=".5"/><g className="anim-ripple"><path d="M353 381q126-67 287-6M379 397q119-42 241-6M415 411q78-18 153-8" className="ink-fine"/></g></g>
    <g className="ink-ivory"><path d="M634 323l-13-112q-5-44 35-49l28-3l18 32l-19 20l17 81l-66 31Z" fill="var(--art-surface)"/>
      <Pigment id={id} tone="sage" d="M633 167L657 156L684 161L691 176L705 189L693 208L697 237L690 250L704 289L700 301L675 306L633 327L630 304L635 283L624 255L629 236L618 207L624 190Z M647 231l5 30l-4 8l-7-27Z"/><path d="M686 192q93-38 82 37q-6 42-74 20m4-43q48-16 47 13q-2 24-46 17M636 210l16 93"/><g className="anim-pour"><path d="M624 213q-47 11-69 102m75-96q-44 15-66 103"/><path d="M555 317l-3 12m11-5l-4 14"/></g></g>
    <Comb x={244} y={513} angle={14}/><Linen id={id} x={651} y={535} scale={.5}/>
  </>}</Drawing>;
}

export function ConditionerScene() {
  return <Drawing scene="product-conditioner-grooming-tray">{id => <>
    <ellipse cx="518" cy="364" rx="347" ry="247" fill={`url(#${id}-light)`}/>
    <g className="ink-brass"><path d="M181 408L481 243L832 431L524 609Z" fill={`url(#${id}-wood)`}/>
      <Pigment id={id} tone="sage" light d="M176 410L220 380L241 378L279 349L307 342L348 313L374 307L433 270L454 267L481 239L513 253L528 270L574 290L592 307L655 334L672 352L749 389L770 389L837 432L813 453L783 460L739 491L712 497L656 534L632 538L567 579L544 580L523 615L501 596L471 589L423 557L402 553L347 519L322 513L267 476L244 471L218 441Z M239 413l67-36l-29 23l-20 13Z"/><path d="M181 408v24l343 199l308-176v-24M524 609v22M210 406l273-146l318 171L523 591ZM221 420l304 159l263-144"/><path d="M239 416l170-92m159 216l174-103" opacity=".4"/></g>
    <g className="anim-linen"><Linen id={id} x={421} y={340} scale={1.04}/></g>
    <g transform="translate(277 396) rotate(-28)"><Comb/><path d="M11-30q66-31 166-4" className="ink-fine" opacity=".35"/></g>
    <Brush id={id} x={568} y={436} scale={1.1}/>
    <g className="ink-ivory"><ellipse cx="496" cy="222" rx="77" ry="45"/><ellipse cx="496" cy="222" rx="66" ry="35"/><path d="M445 251l-37 95q2 19 16 12l45-98M464 204l48-11m-32 23l33-9m-13 24l36-11"/></g>
  </>}</Drawing>;
}

export function BarSoapScene() {
  return <Drawing scene="product-bar-soap-draining-cradle">{id => <>
    <ellipse cx="494" cy="388" rx="342" ry="237" fill={`url(#${id}-light)`}/><Linen id={id} x={212} y={362} scale={1.56}/>
    <g className="ink-brass"><path d="M373 364L593 296L733 416L512 499Z" fill={`url(#${id}-wood)`}/>
      <Pigment id={id} tone="amber" d="M369 365L399 350L424 353L458 336L483 336L524 317L545 319L594 291L622 314L631 334L666 350L682 374L722 400L737 418L714 428L686 430L652 449L627 450L582 476L556 477L511 505L486 477L468 475L448 449L426 440L402 412L386 404Z M435 386l20 12l29 29l-31-22ZM626 392l21 15l-5 9l-11-19Z"/><path d="M373 364v25l139 137l221-83v-27M512 499v27M389 365l202-57l120 107l-199 68Z"/>{Array.from({length:9},(_,i)=><path key={i} d={`M${408+i*20} ${371-i*6}l98 87l-9 4l-98-87Z`}/>)}</g>
    <g className="ink-ivory"><path d="M705 282l-25-84q-3-11 14-15l70-5q20 3 12 20l-15 82q-29 11-56 2Z" fill={`url(#${id}-glass)`}/>
      <Pigment id={id} tone="coral" d="M686 201L710 203L730 197L753 201L778 196L777 216L767 230L768 259L763 281L742 292L718 284L702 288L697 269L699 250L688 236Z"/><ellipse cx="728" cy="190" rx="43" ry="12"/><path d="M699 212l12 53m12-55l5 58m17-59l-3 57"/><path d="M774 203q56-4 42 33q-9 23-48 8"/></g>
    <g className="anim-ripple ink-fine"><path d="M352 542q58-16 119 0q-41 17-99 8m291-22q47-8 81 8M379 568q48-6 66 0"/></g><Coil x={264} y={543} scale={.39}/>
  </>}</Drawing>;
}

export function BodyWashScene() {
  return <Drawing scene="product-body-wash-bathing-ewer">{id => <>
    <ellipse cx="496" cy="378" rx="348" ry="266" fill={`url(#${id}-light)`}/>
    <g className="ink-brass"><path d="M242 432l26 134q190 86 430-4l27-137" fill={`url(#${id}-wood)`}/>
      <Pigment id={id} tone="coral" d="M240 436L268 445L290 468Q347 492 394 491L421 503Q487 516 554 502L579 508L605 495Q659 492 696 465L727 439L723 466L710 489L713 516L698 534L705 563L677 578L645 581Q577 602 526 599L494 607L467 600Q386 604 333 582L309 583L266 570L266 544L256 528L258 505L244 480Z M292 510l47 19l-30-6l-11-5ZM613 550l32-8l-13 13l-20 4Z"/><ellipse cx="483" cy="432" rx="242" ry="80"/><ellipse cx="483" cy="432" rx="221" ry="63"/><path d="M254 476q233 100 460-4M261 488q228 97 450-3M267 542q215 83 433-4m-430 16q213 85 427-2"/>{Array.from({length:12},(_,i)=><path key={i} d={`M${269+i*38} ${465+Math.sin(i/3)*33}l${15-i*2} 77`} opacity=".6"/>)}</g>
    <g className="ink-ivory"><path d="M402 421Q348 390 380 301L425 212L417 161Q449 178 502 162L492 219Q580 349 539 400Q510 437 402 421Z" fill={`url(#${id}-glass)`}/>
      <Pigment id={id} tone="sea" d="M414 171L443 180L469 175L499 168L490 200L496 225L511 244L514 268L545 303L541 326Q573 371 541 397L537 416L506 425L484 422L454 434L428 428L402 427L386 408L372 405L367 374L373 350L369 333L385 296L384 279L409 248L420 220L418 199Z M397 332l12-27l-4 27l-8 14ZM492 394l24-10l-11 14Z"/><path d="M505 235q119-48 116 49q-2 81-74 70m-31-97q76-22 80 27q-1 40-40 45M401 395q-24-59 40-157M417 393q-15-51 28-139"/><path d="M417 161q-29 4-43-15q11 43 51 44M432 181h53" className="ink-brass"/></g>
    <g className="anim-linen"><Linen id={id} x={617} y={397} scale={.8}/></g><g className="anim-ripple ink-fine"><path d="M296 439q38-13 64 0m208 16q36-10 59-1M318 459l46 2"/></g>
  </>}</Drawing>;
}

export function HandLotionScene() {
  return <Drawing scene="product-hand-lotion-hand-care-tools">{id => <>
    <ellipse cx="497" cy="378" rx="341" ry="236" fill={`url(#${id}-light)`}/>
    <Linen id={id} x={322} y={322} scale={1.45}/>
    <g className="ink-brass"><path d="M258 269q91-52 180 0l-5 126q-85 62-170 0Z" fill={`url(#${id}-glass)`}/>
      <Pigment id={id} tone="sage" d="M254 274L275 267L298 281L323 275L346 286L374 277L404 281L440 266L442 293L433 313L439 342L432 366L438 396L413 414L391 414L361 431L337 424L310 428L291 412L262 404L259 375L265 358L256 333L261 315Z M283 316l3 36l-5 11l-2-37ZM392 376l20-9l-8 13Z"/><ellipse cx="348" cy="269" rx="90" ry="32"/><ellipse cx="348" cy="269" rx="71" ry="24"/><path d="M276 291l3 85m16-79l2 87m15-82l1 87m17-86v89m19-89v90m19-91v87m20-91l-1 86m19-93l-2 81" opacity=".45"/></g>
    <Brush id={id} x={591} y={392} scale={.95}/>
    <g className="ink-ivory"><path d="M483 470l-133 85q-16 12-9 19q9 11 26-4l127-90ZM578 464l-116 91q-9 11-2 19q6 7 16-2l116-96Z" fill="var(--art-timber)"/><path d="M366 549l91-60m26 65l84-70M364 557l91-60"/><path d="M735 447l-72 87q-9 21 8 28q16 3 18-21l56-86m-66 83l-6 13"/></g>
    <g className="anim-paper ink-brass"><path d="M687 304l65-21l35 37l-69 23Z" fill="var(--art-paper)"/>
      <Pigment id={id} tone="coral" light d="M682 305L712 292L727 295L750 279L771 295L774 307L791 320L779 331L760 330L743 341L717 348L708 333L693 326Z"/><path d="M700 307l38-12m-26 23l37-12"/></g>
  </>}</Drawing>;
}

export function BodyLotionScene() {
  return <Drawing scene="product-body-lotion-linen-press">{id => <>
    <ellipse cx="497" cy="374" rx="343" ry="268" fill={`url(#${id}-light)`}/>
    <g className="ink-brass"><path d="M266 265L598 211L731 392L398 470ZM266 265v149l132 178l333-86V392M398 470v122" fill={`url(#${id}-wood)`}/>
      <Pigment id={id} tone="amber" d="M258 269L290 254L315 257L369 241L403 245L450 229L479 232L530 217L559 222L599 207L624 233L627 250L655 281L656 300L684 325L687 343L735 390L724 420L734 450L727 478L735 503L711 517L679 518L625 539L596 540L558 556L529 553L481 574L452 573L398 598L373 566L357 563L334 526L313 513L294 478L273 462L263 422L270 402L264 376L270 354L261 322L268 298Z M416 510l38-13l-16 11l-19 8ZM674 440l30-7l-17 12Z"/><path d="M282 280l309-49l114 154l-304 64ZM275 310l104 140m-104-111l104 140m-104-109l104 140m-104-109l104 140M418 486l287-74m-287 105l287-74m-287 105l287-74M435 463v110m253-163v102"/>
      <path d="M329 237L350 133L678 95L661 207ZM347 231l18-84l296-34l-15 81M369 146l277 48M384 142l262 37"/><path d="M530 463l25-7v31l-25 7Z" fill="var(--art-metal-mid)"/>
    </g>
    <g className="anim-linen"><Linen id={id} x={318} y={287} scale={1.12}/><Linen id={id} x={333} y={270} scale={1.04}/></g>
    <Coil x={289} y={557} scale={.49}/><g className="ink-ivory"><path d="M670 445q66-45 105 15l-12 99l-57 34l-37-65Z" fill="var(--art-paper)"/>
      <Pigment id={id} tone="sage" d="M663 449L685 429L708 431L726 421L750 434L759 447L779 458L773 484L778 504L766 526L767 558L746 571L732 571L706 597L692 577L692 559L674 542L668 522L672 506L665 482Z M699 471l14 25l-4 5l-15-25Z"/><path d="M686 455l32 106m-19-112l32 105m-18-106l30 102M711 577l36-20" opacity=".6"/></g>
  </>}</Drawing>;
}

export function CologneScene() {
  return <Drawing scene="product-cologne-blotter-study">{id => <>
    <ellipse cx="501" cy="373" rx="346" ry="248" fill={`url(#${id}-light)`}/>
    <g className="ink-brass"><ellipse cx="511" cy="469" rx="258" ry="110" fill={`url(#${id}-glass)`}/><Pigment id={id} tone="sea" d="M255 458Q272 420 311 409L332 392Q402 362 471 366L505 359Q584 355 641 383L668 384Q715 402 739 428L759 435L773 467L767 492L750 505Q723 547 660 554L632 568Q559 591 492 576L462 583Q371 574 324 546L300 542L285 522L266 517L251 481Z M327 485l30 25l19 6l-40-30ZM618 529l47-19l-18 15l-30 10Z"/><ellipse cx="511" cy="469" rx="240" ry="95"/><path d="M270 482q218 169 482 2M313 523q199 102 382 0" opacity=".5"/></g>
    <g className="anim-blotters ink-ivory">{[-47,-24,0,24,47].map((angle,i)=><g transform={`rotate(${angle} 494 477)`} key={angle}><path d={`M${481-i} 477L469 184Q493 171 515 184L507 477Z`} fill={i%2 ? 'var(--art-surface)' : 'var(--art-paper)'}/><Pigment id={id} tone={i%2 ? "coral" : "sage"} d="M465 190L481 178L500 181L517 176L514 218L519 240L511 287L518 312L510 351L514 374L508 419L512 445L507 476L481 481L479 451L483 425L476 390L480 357L473 328L478 301L471 271L476 244L469 218Z M483 217l3 28l-5 14l-1-32ZM493 364l4 20l-4 26Z"/><path d="M478 201l28-1M481 453h19" className="ink-brass"/></g>)}</g>
    <g className="ink-brass"><circle cx="494" cy="477" r="9"/><circle cx="494" cy="477" r="3"/><path d="M690 329l101-28l-35 79l-35 70l-11-5l24-77Z" fill={`url(#${id}-glass)`}/><ellipse cx="740" cy="315" rx="52" ry="14" transform="rotate(-16 740 315)"/><path d="M722 333l19 33l-23 62M227 444l79-93l25 11l-73 97m43-103l-61 83m17 20l73-38"/></g>
  </>}</Drawing>;
}

export function CordovanStudyScene() {
  return <Drawing scene="scent-cordovan-glass-study">{id => <>
    <ellipse cx="500" cy="379" rx="345" ry="247" fill={`url(#${id}-light)`}/>
    <g className="ink-ivory"><path d="M215 298L696 179L816 505L320 608Z" fill="var(--art-paper)"/>
      <Pigment id={id} tone="coral" light d="M209 299L255 284L290 284L327 268L362 270L419 249L450 253L502 231L534 234L575 215L607 217L651 197L670 199L699 172L710 206L709 234L731 267L728 293L750 334L748 360L771 403L771 429L795 462L818 507L789 514L757 510L708 529L680 526L624 546L593 543L551 561L519 559L481 578L457 575L409 594L380 589L321 613L300 581L302 563L280 520L281 491L258 453L258 427L238 392L240 367L221 335Z M281 322l72-23l-31 18l-26 7ZM682 487l36-12l22 1l-50 17Z"/><path d="M231 305l455-110l112 300l-470 94Z" className="ink-brass"/><g transform="translate(277 352) rotate(-14)"><PaperMarks count={4} width={100}/><path d="M-7-37h141m-125 216h93"/></g></g>
    <g className="ink-brass"><ellipse cx="523" cy="354" rx="110" ry="55" fill={`url(#${id}-glass)`}/><Pigment id={id} tone="sea" d="M411 348L429 326L449 322L471 306L502 309L533 298L562 308L587 308L612 325L635 347L631 370L619 387L605 390L584 414L560 418L537 436L508 437L484 423L466 423L446 403L430 397L415 373Z M461 345l30-12l17 2l-40 14Z"/><ellipse cx="523" cy="350" rx="100" ry="46"/><path d="M420 362q37 74 104 73q68-3 110-73M448 351q58-48 127-5"/><ellipse cx="659" cy="475" rx="85" ry="37"/><path d="M575 474q29 65 85 63q52-2 83-65" fill={`url(#${id}-glass)`}/>
      <Pigment id={id} tone="sea" d="M570 473L596 465L614 474L639 464L662 472L687 465L712 475L746 470L741 493L725 513L706 516L687 535L660 542L644 534L622 534L606 518L590 514L581 492Z"/><path d="M597 464q37-21 82-11"/></g>
    <g className="anim-caliper ink-brass"><path d="M366 455l57 109l-10 9l-65-108l-30-20m55 11l-17 67l-31 37m34-81l-14 43"/><circle cx="365" cy="454" r="8"/></g>
    <path d="M626 255l58-14m-57 23l55-14M410 552l124-30" className="ink-fine" opacity=".5"/>
  </>}</Drawing>;
}

export function MordantStudyScene() {
  return <Drawing scene="scent-mordant-sailcloth-seam">{id => <>
    <ellipse cx="503" cy="380" rx="350" ry="255" fill={`url(#${id}-light)`}/>
    <g className="anim-linen ink-ivory"><path d="M247 212Q438 265 704 164L762 510Q525 572 290 534Z" fill="var(--art-paper)"/>
      <Pigment id={id} tone="sage" d="M242 207L270 216L302 214L333 228L371 223L401 236L437 228L470 233Q534 223 570 209L599 211L634 192L659 194L700 164L714 172L711 207L723 239L719 263L733 303L727 335L743 371L739 398L753 434L750 464L766 509L741 520L711 518L676 533L646 529L608 544L573 539L533 553L508 545L464 554L438 545L393 549L365 542L327 547L287 536L286 509L275 485L281 459L264 421L269 396L255 354L260 328L249 294L253 265Z M286 254l43 9l21 11l-33-9ZM560 497l62-7l-27 10l-25 4Z"/><Pigment id={id} tone="sea" light d="M251 224L276 239L305 267L340 280L372 311L414 330L440 355L496 381L517 406L564 424L596 452L631 461L660 486L708 500L759 516L709 530L677 513L647 513L604 487L578 483L545 457L515 446L485 420L453 409L427 384L397 374L365 342L332 327L306 298L281 287L253 262Z"/><path d="M247 212q237 216 515 298M247 226q244 213 508 297M262 215q242 213 499 280"/>{Array.from({length:26},(_,i)=><path key={i} d={`M${262+i*18} ${230+i*10.7}l-7 15l13-10`} className="ink-brass"/>)}<path d="M278 251l27 268m25-232l26 241m36-206l24 210m41-178l19 179m42-149l17 145M328 259q159 37 330-33m-304 66q156 33 311-31" opacity=".16"/></g>
    <Coil x={354} y={531} scale={.71}/>
    <g className="ink-brass"><path d="M581 314l88 84l24 68q1 24-19 19l-23-20l-12-57l-73-79Z" fill={`url(#${id}-wood)`}/>
      <Pigment id={id} tone="coral" d="M579 309L601 329L607 344L630 359L642 379L668 395L676 417L675 434L695 461L696 478L679 491L663 481L648 462L646 443L636 422L637 407L615 393L606 376L583 361L580 343L563 331Z"/><path d="M668 414l12 49M575 321l-40-40"/>
      <g className="anim-needle"><path d="M494 509l180-115m-4 8l-176 107"/><path d="M661 400q71-97 110-29q49 94-34 119"/></g>
    </g>
  </>}</Drawing>;
}

export function FlintStudyScene() {
  return <Drawing scene="scent-flint-time-glass">{id => <>
    <ellipse cx="505" cy="370" rx="339" ry="260" fill={`url(#${id}-light)`}/>
    <g transform="rotate(8 500 365)"><g className="ink-brass"><ellipse cx="500" cy="174" rx="138" ry="38" fill={`url(#${id}-wood)`}/><ellipse cx="500" cy="559" rx="147" ry="40" fill={`url(#${id}-wood)`}/><path d="M362 174v12q138 83 276 0v-12M353 559v15q147 82 294 0v-15M383 198v341m234-341v341M399 204v330m202-330v330" strokeWidth="2"/><ellipse cx="500" cy="174" rx="119" ry="25"/></g>
      <g className="ink-ivory"><path d="M420 218Q415 312 494 365Q416 409 419 523Q500 557 581 523Q584 409 506 365Q585 312 580 218Z" fill={`url(#${id}-glass)`}/>
      <Pigment id={id} tone="sea" d="M412 222L439 215L465 223L489 216L514 222L544 214L573 217L584 230L576 258L581 281L564 310L562 327L530 352L510 368L530 396L552 410L559 434L576 460L571 484L586 524L564 536L539 533L512 547L481 537L457 542L420 525L421 498L415 478L430 452L432 428L455 404L467 382L488 366L463 345L449 323L431 312L426 288L415 265Z M447 250l4 29l-6-16ZM540 458l14 30l-8 12l-1-23Z"/><path d="M436 240q0 56 53 106m-48 159q2-68 48-121M568 241q-4 60-52 102" opacity=".65"/><path d="M447 300q55 95 107 0M431 518l69-79l69 79" fill="var(--art-brass)" fillOpacity=".3"/>
      <Pigment id={id} tone="amber" d="M443 300L466 310L484 306L501 317L527 309L558 300L547 324L531 331L526 345L505 362L491 359L479 341L462 332Z M429 518L444 505L453 483L471 477L499 437L515 454L519 470L540 489L548 506L572 519L554 528L529 526L510 535L485 529L457 533Z"/>
        <path className="anim-sand" d="M500 366v71" strokeDasharray="2 6"/>
      </g></g>
    <g className="ink-brass"><path d="M227 499l69-173l73 203Z" fill={`url(#${id}-glass)`}/>
      <Pigment id={id} tone="coral" light d="M233 487L248 455L249 436L263 417L272 385L291 339L302 327L313 361L312 382L329 405L329 427L346 456L347 479L371 525L345 529L325 520L298 522L279 510L252 511L224 500Z"/><path d="M296 326v201l73 2m-124-38l43-117"/><path d="M694 548l96-91l-14 111Z" fill="var(--art-water-crest)"/><path d="M704 545l61 7l25-95"/></g>
  </>}</Drawing>;
}

const productDrawings = { shampoo: ShampooScene, conditioner: ConditionerScene, 'bar soap': BarSoapScene, 'body wash': BodyWashScene, 'hand lotion': HandLotionScene, 'body lotion': BodyLotionScene, cologne: CologneScene };
export function ProductScene({ product }) {
  const Scene = productDrawings[String(product.kind || '').toLowerCase()];
  // A future CMS category with no commissioned scene remains intentionally image-free.
  return Scene ? <Scene/> : null;
}
export function ScentDetailScene({ family }) {
  const Scene = { cordovan: CordovanStudyScene, mordant: MordantStudyScene, flint: FlintStudyScene }[family];
  return Scene ? <Scene/> : null;
}
