import Drawing from './IllustrationFrame';
import Pigment from './Pigment';

/** A single shipboard apothecary apparatus, authored here rather than composed from other scenes. */
export function ApothecaryStillScene() {
  return <Drawing viewBox="0 0 900 1040" className="apothecary-still-drawing" scene="home-apothecary-still">{id => <>
    <ellipse cx="452" cy="561" rx="351" ry="352" fill={`url(#${id}-light)`}/>

    {/* Curved knees and ribs make the instrument part of a timber interior. */}
    <g className="still-timber ink-brass">
      <path d="M135 816Q175 630 156 376Q143 230 285 104L323 124Q190 245 199 373Q218 636 178 825Z" fill={`url(#${id}-wood)`}/>
      <path d="M727 871Q791 701 778 532Q764 332 666 196L700 178Q811 344 820 533Q830 725 769 880Z" fill={`url(#${id}-wood)`}/>
      <Pigment id={id} tone="coral" d="M286 100L314 115Q236 195 209 270L210 299L190 348Q207 444 202 525L191 548L198 592L185 650L190 700L172 760L176 814L135 833L143 786Q170 650 159 510L165 481L153 446Q163 415 148 367Q151 280 184 232L189 211L211 191Q240 135 286 100ZM171 424l8 60l-5 24l-7-64ZM201 247l23-33l-14 39Z"/>
      <Pigment id={id} tone="coral" light d="M698 177Q747 236 766 289L757 316Q811 423 815 512L810 538L823 578Q826 696 792 788L794 812L771 870L737 881Q784 742 788 614L779 584L787 555Q779 408 727 312L731 286L696 236L674 192Z"/>
      <path d="M148 809Q190 631 171 378Q159 249 300 116M159 813Q201 630 183 376Q174 245 308 120M740 867Q804 694 791 532Q780 330 683 192M752 870Q817 697 804 533Q794 334 694 189" opacity=".5"/>
      <path d="M147 703l47 6m-43-123l49 3m-43-115l44 2m-44-111l44-3m-28-96l40 14m493 488l53 15m-27-131l53 6m-55-120l51-4m-68-105l47-14"/>
      {[0,1,2,3,4].map(i => <g key={i}><circle cx={176+i*2} cy={698-i*112} r="4" fill="var(--art-metal-mid)"/><path d={`M${173+i*2} ${698-i*112}h6`}/></g>)}
      <path d="M177 788Q294 746 404 752M768 793Q681 758 604 773" strokeWidth="2"/>
    </g>

    {/* Permanent fittings: neither these nor the outer illustration translate on entry. */}
    <g className="still-stand ink-brass">
      <path d="M270 457L247 780L273 786L300 462M603 451L632 778L656 773L630 448" fill={`url(#${id}-brass)`}/>
      <path d="M281 479L283 329Q288 284 339 278M619 472L614 340Q611 306 578 293"/>
      <path d="M258 779L205 802L282 818L319 794ZM622 782L602 806L690 817L706 801Z" fill={`url(#${id}-wood)`}/>
      <path d="M257 789l32 6m335-4l49 9M266 512l24 2m-26 34l24 2m-26 34l24 2m-27 34l25 2m-28 34l26 2m-29 35l26 2M629 504l-21 2m24 37l-22 2m25 36l-21 2m25 36l-23 2m26 36l-22 2" opacity=".6"/>
      <ellipse cx="449" cy="520" rx="197" ry="64"/>
      <path d="M254 525Q446 644 645 522M257 536Q447 651 642 534" strokeWidth="2"/>
    </g>

    {/* The retort has one continuous body and an outlet leading to its cooling coil. */}
    <g className="still-retort ink-ivory">
      <path d="M376 405C400 338 382 259 402 210Q416 171 441 171Q471 174 459 214L449 258Q449 301 479 322C555 300 627 287 690 307L747 348Q757 356 749 368Q742 375 733 367L681 331Q625 319 511 350C517 377 556 402 582 438C640 511 599 603 518 633C439 665 347 636 315 573C274 499 304 432 376 405Z" fill={`url(#${id}-glass)`}/>
      <Pigment id={id} tone="sea" light d="M398 206Q420 175 438 183L425 220L431 250L419 280L428 316L423 350Q426 390 389 414L380 437Q341 449 326 481L326 518L311 540Q287 481 321 444L334 419L368 405Q391 373 389 326L397 304L390 280Z"/>
      <path d="M416 214Q404 315 414 367Q418 398 390 423M430 226Q423 319 434 366M485 335Q596 297 680 316L742 358" opacity=".55"/>
      <path d="M370 440Q316 476 324 528M365 452Q332 483 337 518M338 566Q375 614 433 622M581 478Q601 531 572 575M571 483Q588 528 565 562" strokeWidth="2" opacity=".7"/>
      <g className="still-liquid">
        <path d="M309 520Q446 482 607 520C600 571 565 615 511 633Q386 669 329 587Z" fill="var(--art-liquid)" stroke="none"/>
        <Pigment id={id} tone="sea" d="M302 520L333 510L357 516Q405 494 448 502L475 497Q515 511 550 509L610 525L611 546Q588 595 556 610L539 634Q474 655 424 638L403 644Q352 629 327 594L321 571L307 559Z M354 550l47-8l28 3l-30 6l-31 2ZM504 605l23-11l16 1l-30 17Z"/>
        <Pigment id={id} tone="amber" light d="M353 589Q392 597 418 583L441 593L471 588L499 603L558 585L558 607Q506 640 451 633L425 641Q380 634 353 612Z"/>
        <path d="M309 520Q446 482 607 520M330 532Q450 506 585 533M375 552Q451 537 552 550"/>
        <path d="M356 589Q442 571 563 585M381 603Q448 590 535 603" opacity=".4"/>
      </g>
      <g className="still-vapour ink-fine" opacity=".75">
        <path d="M389 511C349 471 426 465 403 427Q389 405 413 384M448 506C405 467 482 449 452 417Q433 398 452 377M512 510C480 476 530 457 493 433"/>
        <path d="M401 507C373 479 435 466 416 433M462 496C435 465 493 450 466 423" opacity=".45"/>
      </g>
      <g className="still-glass-light"><path d="M349 466Q325 505 342 550M535 428Q568 449 579 478" stroke="var(--art-ivory)" strokeWidth="3" opacity=".45"/></g>
    </g>

    <g className="still-clamps ink-brass">
      <path d="M400 202l-1-15q29-17 59-1v16q-28 16-58 0ZM400 209q30 13 57-1M402 218q27 11 52 0" fill={`url(#${id}-brass)`}/>
      <ellipse cx="429" cy="185" rx="28" ry="9"/>
      {Array.from({length:10},(_,i)=><path key={i} d={`M${404+i*5} ${188+Math.sin(i/3)*7}v10`} opacity=".7"/>)}
      <path d="M252 511l47 11v33l-46-10ZM601 519l44-12v34l-41 14Z" fill={`url(#${id}-wood)`}/>
      <circle cx="274" cy="534" r="10" fill={`url(#${id}-brass)`}/><circle cx="624" cy="532" r="10" fill={`url(#${id}-brass)`}/>
      <path d="M270 531l8 6m342-1l8-7M297 550Q450 648 603 550M300 561Q450 657 600 561"/>
      {Array.from({length:17},(_,i)=><path key={i} d={`M${310+i*17} ${568+Math.sin(i/5.1)*52}l-2 7`} opacity=".65"/>)}
    </g>

    {/* Copper tubing is wound as one connected run, with a continuous travelling highlight. */}
    <g className="still-condenser ink-brass">
      <path d="M716 378V639M730 379V641M671 395l-8 238m130-226l-5 230" opacity=".65"/>
      <path d="M744 363C827 399 779 424 705 401C634 379 671 356 740 382C836 419 786 459 704 434C623 409 669 390 742 418C836 453 783 493 701 467C622 442 670 423 742 453C833 489 780 529 700 500C623 472 669 457 741 488C830 527 778 561 699 533C626 507 670 492 740 523C807 552 761 578 711 583L673 595L667 681" strokeWidth="8" stroke="var(--art-shadow)"/>
      <path d="M744 363C827 399 779 424 705 401C634 379 671 356 740 382C836 419 786 459 704 434C623 409 669 390 742 418C836 453 783 493 701 467C622 442 670 423 742 453C833 489 780 529 700 500C623 472 669 457 741 488C830 527 778 561 699 533C626 507 670 492 740 523C807 552 761 578 711 583L673 595L667 681" strokeWidth="3"/>
      <path className="still-coil-flow" d="M744 363C827 399 779 424 705 401C634 379 671 356 740 382C836 419 786 459 704 434C623 409 669 390 742 418C836 453 783 493 701 467C622 442 670 423 742 453C833 489 780 529 700 500C623 472 669 457 741 488C830 527 778 561 699 533C626 507 670 492 740 523C807 552 761 578 711 583L673 595L667 681" stroke="var(--art-metal-light)" strokeWidth="1.8" strokeDasharray="18 90" opacity=".8"/>
      <path d="M650 631q77 32 148 0v14q-77 29-148 0ZM651 384q72 25 150 0"/>
      <path d="M667 681v42" className="still-drip" strokeDasharray="3 12"/>
      <path d="M602 729Q661 698 725 727L709 785Q661 812 619 785Z" fill={`url(#${id}-glass)`}/><ellipse cx="663" cy="729" rx="61" ry="17"/>
      <g className="still-receiver-ripple"><Pigment id={id} tone="sea" d="M619 747L648 738L667 745L694 740L723 749L711 767L708 786L677 798L650 792L628 799L614 777Z M641 770l24-3l14 3l-31 6Z"/><path d="M641 730q20-7 41 0m-34 9h28M635 759q23-12 55 0"/></g>
    </g>

    {/* A small fixed hearth warms the apparatus; the flame is new linework, not a lantern. */}
    <g className="still-hearth ink-brass">
      <path d="M369 727Q448 701 527 727L541 771Q455 814 355 772Z" fill={`url(#${id}-wood)`}/>
      <Pigment id={id} tone="amber" d="M365 731Q396 713 425 721L451 714L476 725L523 721L536 738L532 755L548 770L525 781L498 783L476 798L431 793L413 800L375 785L350 781L361 760Z M396 762l33 8l23-1l-27 8l-25-7Z"/>
      <ellipse cx="448" cy="729" rx="79" ry="24"/><ellipse cx="448" cy="729" rx="63" ry="17"/>
      <path d="M359 768q88 36 179 1M368 777l-13 28m178-28l13 25M387 744v13m20-8v15m21-12v16m21-16v17m22-18v16m22-20v17m22-24v15"/>
      <g className="still-hearth-flame"><path d="M425 727C394 694 439 683 425 659Q451 674 449 694Q468 672 460 651C506 690 492 719 471 731Z" fill="var(--art-lamp-wash)"/><Pigment id={id} tone="coral" d="M421 731Q390 710 421 687L423 663Q439 675 443 696L461 678L462 650Q496 677 491 707L477 737L449 730L435 741Z"/><path d="M442 727Q423 710 446 693Q453 712 466 707Q478 723 461 735" fill="var(--art-brass)" stroke="var(--art-metal-light)"/></g>
      <ellipse className="still-warmth" cx="449" cy="696" rx="100" ry="91" fill={`url(#${id}-light)`} stroke="none"/>
    </g>

    {/* A single carved frond belongs to the timber knee, not a scent or ingredient diagram. */}
    <g className="still-carving ink-fine" opacity=".67">
      <path d="M163 666Q234 628 226 520Q215 430 249 380M188 638Q168 570 191 540M220 582Q272 545 264 508M225 516Q187 481 200 454"/>
      {[0,1,2,3,4,5,6].map(i=><g key={i} transform={`translate(${204+i*5} ${623-i*32}) rotate(${i%2 ? 30 : -45})`}><path d="M0 0Q-25-8-21-42Q8-31 0 0ZM0-3l-16-31"/><path d="M-3-13l-11-1m8-9l-10-4" opacity=".55"/></g>)}
    </g>
    <g className="still-ledge ink-brass"><path d="M116 846Q450 814 807 859L823 884Q468 843 103 869ZM103 869v14q359-26 720 16v-15" fill={`url(#${id}-wood)`}/><path d="M137 857Q422 833 757 868M190 868q108-10 254-3m72 3q126 0 246 12" opacity=".48"/></g>
  </>}</Drawing>;
}
