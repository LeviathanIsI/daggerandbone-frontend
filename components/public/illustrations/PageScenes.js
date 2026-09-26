import Drawing from './IllustrationFrame';
import Pigment from './Pigment';
import { BotanicalBranch, Pulley } from './EngravedParts';
import { Timber, Coil, Quill, Linen, PaperMarks } from './WorkshopParts';

export function ProvisioningScene({ family = 'all' }) {
  return <Drawing viewBox="-20 -40 1040 780" scene="collection-provisioning" className={`provisioning-drawing provisioning-${family}`}>{id => <>
    <ellipse cx="546" cy="370" rx="385" ry="275" fill={`url(#${id}-light)`}/>
    <g className="ink-fine" opacity=".4"><path d="M80 527L811 409L970 522M191 443L238 153L741 91L884 399M207 441L251 171L733 108L864 401M251 171L207 116L694 61L733 108"/>{Array.from({length:9},(_,i)=><path key={i} d={`M${240+i*53} ${174-i*6}l-39 250`}/>)}</g>
    <g className="provision-bay provision-cordovan" data-family="cordovan">
      <g className="ink-brass"><path d="M164 420L364 384L477 454L266 503ZM164 420v119l101 69V503m0 105l211-52V454" fill={`url(#${id}-wood)`}/>
      <Pigment id={id} tone="coral" d="M156 425L202 413L227 420L274 402L299 408L364 383L396 409L416 413L475 451L479 481L465 507L481 552L443 571L421 570L357 589L337 584L267 615L233 581L211 574L163 541L169 506L156 483Z M285 546l51-14l-17 11l-28 9ZM184 476l34 20l-15-3Z"/><path d="M176 443l76 51m-76-21l76 51m-76-20l76 51m-76-20l76 52M280 518l183-47m-183 77l183-48m-183 78l183-49M177 427l177-30l95 57M284 505v92M452 461v102"/>
      <g><path d="M209 381Q182 305 269 299Q350 285 382 353L363 412L239 440Z" fill="var(--art-paper)"/>
      <Pigment id={id} tone="sage" d="M199 329Q221 299 250 302L272 293Q323 283 345 308L367 314L389 351L379 374L362 380L369 414L340 418L316 433L289 429L243 446L222 418L223 399L203 385Z M231 333l22-14l13-2l-20 16ZM330 385l21 11l-9 2l-17-9Z"/><path d="M269 299Q240 365 239 440M276 300Q316 352 363 412M215 365l154-17m-157 24l161-17"/><path className="provision-tie" d="M266 364q-27-28-37-5q11 20 37 5q20-34 32-13q2 16-32 13l-9 56"/></g></g>
    </g>
    <g className="provision-bay provision-mordant" data-family="mordant"><g className="ink-ivory"><path d="M453 259L697 229L772 309L519 354Z" fill="var(--art-timber)"/>
      <Pigment id={id} tone="sage" light d="M448 265L483 252L507 255L541 241L572 245L613 233L652 236L698 223L719 252L739 262L775 304L757 325L718 323L688 337L661 334L604 350L571 347L520 361L493 337L470 329Z"/><path d="M453 259v122l66 80V354l253-45v119l-253 33M470 291l216-29m-204 44l216-29m-203 45l216-28M533 368v77m69-88v78m70-90v78M697 229v79M489 250l64 97m62-113l68 90"/></g><g className="provision-linen"><Linen id={id} tone="sage" x={480} y={207} scale={.83}/></g><Coil x={654} y={367} scale={.53}/></g>
    <g className="provision-bay provision-flint" data-family="flint"><g className="ink-brass"><path d="M721 423Q774 392 830 418L850 523Q788 556 735 538Z" fill={`url(#${id}-wood)`}/>
      <Pigment id={id} tone="sea" d="M721 416L743 408L764 412L792 404L817 414L832 411L842 431L838 452L849 475L845 496L857 524L834 538L809 537L786 552L767 544L734 548L729 526L733 502L720 477L723 450L715 435Z M758 455l5 34l-6-12ZM813 477l8 20l-4 14l-6-25Z"/><ellipse cx="777" cy="421" rx="55" ry="21"/><path d="M728 443q52 24 106-2m-102 15q52 24 105-2m-99 54q52 25 108-2m-106 16q52 25 108-2M751 439l8 100m19-100l6 106m19-109l10 105"/><g className="provision-tag"><path d="M776 428l24 37m-11-8l29-5l16 41l-34 8Z" fill="var(--art-paper)"/>
      <Pigment id={id} tone="coral" d="M787 459L809 450L822 454L825 470L838 490L824 497L809 498L801 508L795 488L799 479Z"/><circle cx="803" cy="465" r="2"/><path d="M803 478l17-5m-13 14l14-4"/></g></g></g>
    <g transform="translate(366 103)"><g className="provision-tackle"><Pulley size={.65}/><path d="M-9-75V-29M9-75V-29M-10 38Q-57 155-26 203" className="ink-brass"/></g></g>
    <Coil x={451} y={591} scale={.65}/><Timber id={id} tone="sea" x={131} y={618} width={679} height={31}/>
  </>}</Drawing>;
}

export function CraftWorkbenchScene() {
  return <Drawing viewBox="-40 -65 1080 850" scene="about-craft-workbench">{id => <>
    <ellipse cx="510" cy="384" rx="365" ry="280" fill={`url(#${id}-light)`}/>
    <g className="ink-brass"><path d="M173 521L749 443L887 571L276 674Z" fill={`url(#${id}-wood)`}/>
      <Pigment id={id} tone="coral" light d="M169 524L228 512L257 518L337 492L376 496L479 480L509 484L621 456L652 459L750 445L782 482L803 489L883 565L896 584L857 584L816 599L780 596L685 620L659 617L560 639L528 634L452 654L419 650L331 672L299 665L272 680L247 647L219 632Z M303 589l130-14l-59 15l-49 7Z"/><path d="M276 674v17l611-105v-15M188 539l559-77M218 566l558-78M241 597l562-80M265 629l565-79M294 658l560-79" opacity=".6"/></g>
    <g className="workbench-balance ink-brass"><path d="M583 216V487M575 218v267M542 496q37-29 76-4l19 13l-111 12Z" fill="var(--art-metal-dark)"/><circle cx="579" cy="213" r="11"/>
      <g className="anim-balance"><path d="M431 227L712 196M434 234L713 203M439 228l-51 131m51-131l69 116M700 198l-43 127m43-127l65 116"/><path d="M378 359Q443 425 518 344ZM647 326Q715 382 775 313Z" fill={`url(#${id}-glass)`}/>
      <Pigment id={id} tone="sea" d="M373 356L401 361L424 351L450 356L482 343L516 346L504 371L484 378L474 390L438 393L414 379L394 379Z M644 326L665 320L691 325L717 315L739 320L777 310L766 337L747 342L731 355L704 355L685 343L665 343Z"/><path d="M402 368q41 26 91-11m174-24q49 21 84-12"/></g>
    </g>
    <g className="ink-ivory"><path d="M260 460Q267 532 300 550L365 546Q399 514 410 455Z" fill="var(--art-clay-wash)"/>
      <Pigment id={id} tone="coral" d="M255 465L277 454L301 460L326 452L356 458L376 450L413 457L405 483L402 510L382 529L370 550L346 551L323 557L297 551L285 527L273 522L261 493Z M289 485l11 28l-9-8ZM357 522l14-11l-8 17Z"/><ellipse cx="335" cy="459" rx="75" ry="24"/><ellipse cx="335" cy="459" rx="58" ry="14"/><path d="M282 482q6 32 22 48m15-44l4 45m18-44l-2 44m23-48l-6 44" opacity=".5"/><g className="anim-pestle"><path d="M315 463L373 313Q387 296 399 310L354 466Q336 482 315 463Z" fill={`url(#${id}-wood)`}/><path d="M330 456l50-136"/></g></g>
    <g transform="translate(97 212) scale(.65)"><BotanicalBranch id={id} className="anim-botanical"/></g>
    <g className="ink-brass"><path d="M457 537l121-52m-114 61l121-52M473 530l-8-23m23 17l-8-23M709 487l78 77m-72-82l78 77M753 533l-44 36m49-31l-44 36"/><circle cx="464" cy="542" r="10"/><circle cx="582" cy="489" r="8"/><path d="M711 569q-23 37-33 21q-7-10 29-23m6 9q8 34 22 18q7-13-18-26"/></g>
    <Linen id={id} x={515} y={553} scale={.66}/><path d="M262 689l-15 42m550-128l16 42" className="ink-brass"/>
  </>}</Drawing>;
}

export function CorrespondenceScene() {
  return <Drawing scene="contact-writing-desk">{id => <>
    <ellipse cx="482" cy="360" rx="350" ry="247" fill={`url(#${id}-light)`}/>
    <g className="ink-brass"><path d="M184 475L344 228L765 263L854 535L344 598Z" fill={`url(#${id}-wood)`}/>
      <Pigment id={id} tone="amber" light d="M177 478L216 428L221 403L264 343L274 316L344 225L376 236L425 231L476 245L516 239L603 252L634 248L763 263L777 294L777 320L799 354L803 388L825 432L826 463L853 529L839 545L797 545L756 557L705 553L628 572L594 568L532 583L503 578L346 603L310 579L280 569L248 540L216 529Z M216 478l49-67l-21 47l-19 26ZM494 559l93-10l-40 11l-39 5Z"/><path d="M184 475v47l160 106l510-60v-33M344 598v30M204 476l149-229l393 31l83 240L346 576ZM214 489l125 84M366 613l459-54"/><path d="M219 515l99 66m53 27l198-22m102-12l140-14" opacity=".45"/></g>
    <g className="anim-paper ink-ivory"><path d="M302 411L403 290L661 315L721 485L374 525Z" fill="var(--art-paper)"/>
      <Pigment id={id} tone="sea" d="M296 410L325 379L328 363L354 342L365 317L401 287L433 296L462 290L504 302L537 299L583 310L610 305L661 315L677 340L675 361L698 392L693 411L713 448L727 482L702 493L671 490L643 504L601 499L560 512L526 508L488 523L458 518L375 530L350 499L341 472L315 449Z M337 412l29-25l-16 23l-12 8ZM519 483l55-6l-21 10l-31 2Z"/><path d="M316 411l93-108l239 24l55 146l-325 36" opacity=".45"/><PaperMarks x={402} y={348} count={7} width={209}/><path d="M412 469q11-20 26-8t29-1m16 0l76-4"/></g>
    <g className="ink-brass"><path d="M474 530L656 505L734 565L544 596Z" fill="var(--art-paper)"/>
      <Pigment id={id} tone="coral" light d="M466 532L507 522L531 526L566 514L590 518L650 502L676 513L686 531L728 552L741 568L707 576L688 574L645 587L618 581L583 596L548 600L526 582L506 577Z"/><path d="M474 530l133 29l49-54M544 596l40-43m150 12l-106-15"/><circle cx="608" cy="559" r="17" fill="var(--art-clay)"/><circle cx="608" cy="559" r="11"/><path d="M602 553l10 13m-11-1l10-12"/></g>
    <g className="ink-brass"><path d="M234 389v-45q-12-18 14-23h45q27 6 12 23v45q-35 16-71 0Z" fill={`url(#${id}-glass)`}/><ellipse cx="270" cy="326" rx="27" ry="10"/><path d="M247 346v32m10-30v34" className="ink-fine"/></g>
    <Quill id={id} tone="sea" x={252} y={157} angle={-20}/><Coil x={772} y={604} scale={.36}/>
  </>}</Drawing>;
}

export function HandbookScene() {
  return <Drawing scene="faq-navigators-handbook">{id => <>
    <ellipse cx="526" cy="377" rx="362" ry="256" fill={`url(#${id}-light)`}/>
    <g className="ink-brass"><path d="M129 300Q270 233 469 300Q638 198 814 243L875 540Q682 504 516 601Q302 539 171 575Z" fill={`url(#${id}-wood)`}/><path d="M141 290Q299 225 474 289Q636 190 802 228L861 526Q680 492 514 588Q310 522 183 557Z" fill="var(--art-surface)"/>
      <path d="M469 300l45 288M159 315q138-47 290 5m-286 6q138-47 286 5m-284 6q138-47 286 5M537 562q138-89 308-53m-304 41q138-89 301-53" opacity=".5"/>
    </g>
    <g className="anim-page ink-ivory"><path d="M158 285Q317 232 474 290Q633 180 792 218L846 506Q677 480 508 581Q347 509 183 542Z" fill="var(--art-paper)"/>
      <Pigment id={id} tone="sage" d="M151 285Q198 262 232 269L260 257Q308 257 337 266L362 262Q424 270 472 289L480 325L474 347L488 396L482 421L495 478L492 507L510 579L479 566L457 568Q402 540 361 542L342 534Q285 529 257 538L232 531L182 545L180 517L170 493L174 466L161 425L166 401L159 354L164 324Z M192 322l30-11l24 2l-31 7ZM372 508l36 6l15 9l-43-9Z"/><Pigment id={id} tone="sea" d="M469 288Q501 264 538 253L562 235L590 235Q667 203 718 214L741 207L794 215L800 247L795 269L812 308L809 330L825 385L820 412L839 461L848 509L820 508L798 501Q751 506 722 514L699 512Q638 525 605 547L583 547L546 568L510 584L504 550L512 528L497 477L501 447L485 399L489 365Z M749 250l20 14l-5 12l-4-14ZM647 493l34-8l20 1l-42 14Z"/><path d="M474 290Q481 434 508 581M491 295q12 155 18 228" className="ink-brass"/>
      <g transform="translate(224 336) rotate(8)"><path d="M0 73q21-61 54-54t75-19l15 68q-65 63-144 5Z"/><path d="M11 75l72-66M47 96L86 7M0 49l149 4" opacity=".45"/><circle cx="63" cy="49" r="4"/><PaperMarks y={128} count={3} width={155}/></g>
      <g transform="translate(553 285) rotate(-9)"><PaperMarks count={6} width={161}/><path d="M3 142h171M24 113v62m28-79v79m28-44v44m28-65v65m28-36v36"/><path d="M7 113q11-21 20 0t22 0m43-99l32-30m-28 16l17-11" opacity=".6"/></g>
    </g>
    <g className="ink-brass"><path d="M493 576l39 58l29-4l-52-53" fill="var(--art-clay)"/>{Array.from({length:9},(_,i)=><path key={i} d={`M${482+i*3} ${328+i*25}l12-5`}/>)}<path d="M775 249q50-70 58 1l-2 54m-12-57q25-33 7 5"/></g>
  </>}</Drawing>;
}

export function PreparationScene() {
  return <Drawing scene="campaign-preparation-table">{id => <>
    <ellipse cx="490" cy="370" rx="360" ry="245" fill={`url(#${id}-light)`}/><Timber id={id} x={151} y={558} width={681} height={63}/>
    <g className="ink-brass"><path d="M253 534V159H600V509M268 532V176H585V513" strokeWidth="2"/><path d="M235 161H616v-17H235ZM236 527l42-4v24l-42 6m299-43l79-11v26l-79 11" fill={`url(#${id}-wood)`}/><path d="M286 221H571M283 298H568M280 375H565"/>
      {[0,1,2].map(row=><g key={row} className={`anim-tag tag-${row}`}><path d={`M${304+row*13} ${220+row*77}v9l-8 11v41l44-5v-39l-11-9v-10Z`} fill="var(--art-paper)"/><Pigment id={id} tone="sage" transform={`translate(${296+row*13} ${220+row*77})`} d="M8-5L26-2L29 9L48 19L42 32L46 57L32 58L19 66L-3 61L2 43L-3 33L3 15Z"/><path d={`M${321+row*13} ${245+row*77}l2 15m48-29l111-8m-107 28l81-6`} opacity=".6"/><path d={`M${409+row*24} ${218+row*77}v11l-6 9v39l48-5v-39l-13-7v-10Z`} fill="var(--art-clay-wash)"/></g>)}
    </g>
    <g className="ink-ivory"><path d="M627 441l104-21l78 76l-119 34Z" fill="var(--art-paper)"/>
      <Pigment id={id} tone="coral" d="M622 442L650 430L667 432L696 418L730 417L750 433L753 448L779 465L811 494L802 508L780 509L763 518L738 517L710 530L688 534L671 513L653 501L649 483Z M711 485l22 11l-9 1l-21-11Z"/><path d="M627 452l63 88l119-34m-182-43l63 86l119-32m-179-45l60 85l119-31M681 433l77 77m-60-81l77 77"/>
      <g className="anim-press"><path d="M674 443l-28-45l18-51l30 7l-4 58l37 16Z" fill={`url(#${id}-wood)`}/><path d="M667 357l14 3m-35 38l44 14"/></g>
    </g><Coil x={415} y={522} scale={.62}/><Linen id={id} tone="sage" x={183} y={574} scale={.71}/>
    <g className="ink-brass"><path d="M762 529l51 29m-57-21l54 29m-37-9q-7-25-23-13t20 17m10 1q14-17 25-2t-25 2"/></g>
  </>}</Drawing>;
}
