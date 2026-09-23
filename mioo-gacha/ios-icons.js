/* Mioo UI icon treatment: local SVG line art, no external icon fonts or CDN. */
(() => {
  'use strict';
  const paths = {
    home:'<path d="m3 10 9-7 9 7v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 21v-8h6v8"/>',
    capsule:'<rect x="3" y="7" width="18" height="10" rx="5" transform="rotate(-36 12 12)"/><path d="m8.4 8.4 7.2 7.2"/>',
    gift:'<rect x="3" y="9" width="18" height="12" rx="2"/><path d="M12 9v12M3 13h18M2 9h20"/><path d="M12 9C8 9 5 8 5 5a2.5 2.5 0 0 1 5 0c1 2 2 4 2 4Zm0 0c4 0 7-1 7-4a2.5 2.5 0 0 0-5 0c-1 2-2 4-2 4Z"/>',
    ticket:'<path d="M3 5h18v5a2 2 0 0 0 0 4v5H3v-5a2 2 0 0 0 0-4V5Z"/><path d="M12 5v2m0 4v2m0 4v2"/>',
    rules:'<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4.5V3h6v1.5M9 10h6M9 14h6M9 18h4"/>',
    contact:'<path d="M20 11.5a8 8 0 1 1-3.4-6.5"/><path d="M20 4v6h-6"/><path d="M9 15a4 4 0 0 1 6 0"/><circle cx="9" cy="10" r=".7"/><circle cx="15" cy="10" r=".7"/>',
    volume:'<path d="M11 5 6 9H3v6h3l5 4V5Z"/><path d="M15 9a4 4 0 0 1 0 6M18 6a8 8 0 0 1 0 12"/>',
    muted:'<path d="M11 5 6 9H3v6h3l5 4V5Z"/><path d="m16 9 5 6m0-6-5 6"/>',
    play:'<circle cx="12" cy="12" r="9"/><path d="m10 8 6 4-6 4V8Z"/>',
    image:'<rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8" cy="8" r="1"/><path d="m4 17 5-5 4 4 3-3 4 4"/>',
    flag:'<path d="M5 21V4m0 1c5-4 9 4 15 0v11c-6 4-10-4-15 0"/>',
    medal:'<circle cx="12" cy="15" r="5"/><path d="m8 11-3-8h5l2 6m4 2 3-8h-5l-2 6m-1 6 1 1 2-2"/>',
    receipt:'<path d="M5 3h14v18l-3-2-4 2-4-2-3 2V3Z"/><path d="M9 8h6M9 12h6M9 16h3"/>',
    clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    download:'<path d="M12 3v12m-4-4 4 4 4-4M4 17v3h16v-3"/>',
    check:'<path d="m5 12 5 5L20 7"/>',
    lock:'<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3m-4 5v2"/>',
    sparkles:'<path d="m12 3 2.1 6.9L21 12l-6.9 2.1L12 21l-2.1-6.9L3 12l6.9-2.1L12 3ZM4 3l.5 1.5L6 5l-1.5.5L4 7l-.5-1.5L2 5l1.5-.5L4 3Z"/>',
    info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10v.01"/>',
    close:'<path d="M6 6 18 18M18 6 6 18"/>',
    eye:'<path d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="2.5"/>',
    copy:'<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/>'
  };
  function icon(name, className = '') {
    const namespace = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(namespace, 'svg');
    svg.setAttribute('viewBox','0 0 24 24');
    svg.setAttribute('width','20');
    svg.setAttribute('height','20');
    svg.setAttribute('fill','none');
    svg.setAttribute('stroke','currentColor');
    svg.setAttribute('stroke-width','1.8');
    svg.setAttribute('stroke-linecap','round');
    svg.setAttribute('stroke-linejoin','round');
    svg.setAttribute('focusable','false');
    svg.setAttribute('aria-hidden','true');
    svg.setAttribute('class',`ios-icon ${className}`.trim());
    svg.innerHTML = paths[name] || paths.sparkles;
    return svg;
  }
  function decorate(element, name, {clear = false, strip = false} = {}) {
    if (!element) return;
    if (clear) element.replaceChildren();
    if (strip) {
      element.textContent = element.textContent.replace(/^[\s✦✿♡🎀🏁🎫🎟️🎁♫↓🔒]+/u,'').trim();
    }
    element.prepend(icon(name));
    element.classList.add('ios-icon-label');
  }
  document.querySelectorAll('.nav a').forEach((link,i) => decorate(link,['capsule','gift','rules','contact'][i]));
  document.querySelectorAll('.mobile-nav a').forEach((link,i) => {
    const legacy = link.querySelector('span');
    if (legacy) legacy.remove();
    decorate(link,['home','capsule','gift','rules','contact'][i]);
  });
  document.querySelectorAll('.hero-tags span').forEach((tag,i) => decorate(tag,['medal','ticket','gift'][i],{strip:true}));
  decorate(document.querySelector('.hero-links a'), 'play');
  decorate(document.querySelector('.hero-links button'), 'image');
  document.querySelectorAll('.ticker-inner b').forEach((item,i) => decorate(item,i?'ticket':'sparkles',{clear:true}));
  decorate(document.querySelector('.game-topline strong'),'capsule',{strip:true});
  decorate(document.querySelector('.ticket-icon'),'ticket',{clear:true});
  decorate(document.querySelector('.draw-help > span:first-child'),'info',{clear:true});
  document.querySelectorAll('.quick-flow .flow-symbol').forEach((item,i) => decorate(item,['flag','ticket','gift'][i],{clear:true}));
  const gameFoot = document.querySelector('.game-foot');
  if(gameFoot){
    const first = gameFoot.firstChild;
    if(first?.nodeType === Node.TEXT_NODE) first.textContent = first.textContent.replace(/^\s*♡\s*/,'');
    gameFoot.prepend(icon('receipt'));
    gameFoot.classList.add('ios-icon-label');
  }
  const rulesHeading = document.querySelector('.rules-panel h3');
  decorate(rulesHeading,'medal',{strip:true});
  document.querySelectorAll('.contact-actions button').forEach(button=>decorate(button,'copy'));
  decorate(document.querySelector('#downloadTicket'),'download',{strip:true});
  decorate(document.querySelector('#resultOverlay .result-actions [data-close]'),'home');
  document.querySelectorAll('.close-modal').forEach(button=>decorate(button,'close',{clear:true}));
  const sound = document.querySelector('#soundBtn');
  function refreshSound(){
    if(!sound)return;
    const enabled = sound.getAttribute('aria-pressed') !== 'false';
    sound.textContent = enabled?'音效开':'音效关';
    sound.prepend(icon(enabled?'volume':'muted'));
    sound.classList.add('ios-icon-label');
  }
  refreshSound();
  sound?.addEventListener('click',()=>queueMicrotask(refreshSound));
  // The original draw logic replaces button text as its state changes; keep the SVG-style lock/play glyph singular.
  const drawButton=document.querySelector('#drawBtn');
  function normalizeDrawLabel(){
    if(!drawButton)return;
    const original=drawButton.textContent;
    const cleaned=original.replace(/^[\s🔒✦]+/u,'').trim();
    if(cleaned!==original)drawButton.textContent=cleaned;
  }
  normalizeDrawLabel();
  if(drawButton) new MutationObserver(normalizeDrawLabel).observe(drawButton,{childList:true,characterData:true,subtree:true});
  const heading = document.querySelector('.history-heading h3');
  decorate(heading,'clock',{strip:true});
  decorate(document.querySelector('#saveHistoryReceipt'),'download');
  decorate(document.querySelector('#returnFromHistory'),'home');
  function refreshHistoryIcons(){
    document.querySelectorAll('.history-empty-icon').forEach(el=>{
      if(!el.classList.contains('ios-icon-label')) decorate(el,'receipt',{clear:true});
    });
    document.querySelectorAll('.history-view').forEach(el=>{
      if(!el.classList.contains('ios-icon-label')) decorate(el,'eye');
    });
  }
  const historyList=document.querySelector('#historyList');
  refreshHistoryIcons();
  if(historyList) new MutationObserver(refreshHistoryIcons).observe(historyList,{childList:true});
})();
