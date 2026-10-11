const PRODUCTS = [{"id":1,"title":"三角洲护航单","cat":"体验","image":"assets/posters/poster-01.jpg","thumb":"assets/thumbs/poster-01.webp"},{"id":2,"title":"三角洲专属陪玩表","cat":"陪玩","image":"assets/posters/poster-02.jpg","thumb":"assets/thumbs/poster-02.webp"},{"id":3,"title":"趣味单大侦探","cat":"趣味","image":"assets/posters/poster-12.jpg","thumb":"assets/thumbs/poster-12.webp","featured":true,"featuredRank":1},{"id":4,"title":"趣味单大侦探2.0","cat":"趣味","image":"assets/posters/poster-10.jpg","thumb":"assets/thumbs/poster-10.webp"},{"id":6,"title":"黄金矿工2.0","cat":"趣味","image":"assets/posters/poster-11.jpg","thumb":"assets/thumbs/poster-11.webp","featured":true,"featuredRank":4},{"id":7,"title":"极限挑战","cat":"趣味","image":null,"thumb":null},{"id":8,"title":"三角洲专属趣味单","cat":"趣味","image":"assets/posters/poster-05.jpg","thumb":"assets/thumbs/poster-05.webp"},{"id":9,"title":"Galgame大作战","cat":"趣味","image":null,"thumb":null},{"id":10,"title":"猛攻小小巨人","cat":"趣味","image":"assets/posters/poster-06.jpg","thumb":"assets/thumbs/poster-06.webp"},{"id":11,"title":"小小巨人","cat":"趣味","image":"assets/posters/poster-07.jpg","thumb":"assets/thumbs/poster-07.webp"},{"id":12,"title":"重生之我在三角洲加班","cat":"趣味","image":"assets/posters/poster-13.jpg","thumb":"assets/thumbs/poster-13.webp","featured":true,"featuredRank":2},{"id":13,"title":"专属七宗罪","cat":"趣味","image":null,"thumb":null},{"id":14,"title":"神秘黑洞特色单","cat":"趣味","image":null,"thumb":null},{"id":15,"title":"专属趣味单","cat":"趣味","image":null,"thumb":null,"featured":true,"featuredRank":3},{"id":16,"title":"点亮展柜单","cat":"趣味","image":null,"thumb":null},{"id":17,"title":"婚礼进行曲Lite版","cat":"趣味","image":"assets/posters/poster-04.jpg","thumb":"assets/thumbs/poster-04.webp"},{"id":18,"title":"我是千万富翁","cat":"趣味","image":"assets/posters/poster-08.jpg","thumb":"assets/thumbs/poster-08.webp"},{"id":19,"title":"淘金小掌柜","cat":"趣味","image":"assets/posters/poster-14.jpg","thumb":"assets/thumbs/poster-14.webp"},{"id":20,"title":"蛛网赏金计划","cat":"趣味","image":"assets/posters/poster-15.jpg","thumb":"assets/thumbs/poster-15.webp"},{"id":21,"title":"主人与小狗","cat":"趣味","image":"assets/posters/poster-16.jpg","thumb":"assets/thumbs/poster-16.webp"},{"id":22,"title":"极致猛攻清图单","cat":"趣味","image":"assets/posters/poster-03.jpg","thumb":"assets/thumbs/poster-03.webp"},{"id":23,"title":"三角洲行动趣味单","cat":"趣味","image":"assets/posters/poster-17.jpg","thumb":"assets/thumbs/poster-17.webp"},{"id":24,"title":"专属熬鹰单","cat":"趣味","image":null,"thumb":null,"featured":true,"featuredRank":5},{"id":25,"title":"新年厨房","cat":"活动","image":null,"thumb":null},{"id":26,"title":"置办年货","cat":"活动","image":null,"thumb":null},{"id":27,"title":"S11赛季安全箱","cat":"3x3","image":null,"thumb":null}];

const supplement=(id,file,title)=>Object.assign(PRODUCTS.find(item=>item.id===id),{title,image:`assets/posters/supplement-${file}.jpg`,thumb:`assets/posters/supplement-${file}.jpg`});
supplement(3,'01','趣味单大侦探');
supplement(4,'02','趣味单大侦探 2.0');
supplement(6,'04','黄金矿工 2.0');
supplement(7,'05','三角洲极限挑战');
supplement(8,'06','三角洲专属趣味单');
supplement(9,'07','Galgame 大作战');
supplement(10,'08','猛攻小小巨人');
supplement(11,'09','小小巨人');
supplement(12,'10','重生之我在三角洲加班');
supplement(13,'11','专属七宗罪');
supplement(14,'12','神秘黑洞特色单');
supplement(15,'13','三角洲专属趣味单·全览');
supplement(16,'14','点亮展柜单');
supplement(17,'15','婚礼进行曲 Lite 版');
supplement(19,'17','淘金小掌柜');
supplement(20,'18','蛛网赏金计划');
supplement(21,'19','主人与小狗');
supplement(22,'20','极致猛攻清图单');
supplement(23,'21','三角洲行动趣味单');
supplement(25,'22','新年厨房');
supplement(26,'23','置办年货');
supplement(27,'24','S11 赛季安全箱');
PRODUCTS.push(
  {id:28,title:'黄金矿工 1.0',cat:'趣味',image:'assets/posters/supplement-03.jpg',thumb:'assets/posters/supplement-03.jpg'}
);

const original=(id,slug,title,extension='jpg')=>Object.assign(PRODUCTS.find(item=>item.id===id),{
  ...(title?{title}:{}),
  image:`assets/originals/${slug}.${extension}`,
  thumb:`assets/original-thumbs/${slug}.jpg`
});
original(1,'escort');
original(2,'exclusive-companion');
original(8,'space-traveler','航天旅行家');
original(10,'fierce-little-giant-20261010-v2');
original(11,'little-giant');
original(12,'reborn-overtime');
original(13,'seven-sins');
original(14,'mystery-black-hole');
original(15,'fun-menu-overview');
original(17,'wedding-march');
original(18,'millionaire','我是千万富翁');
original(19,'gold-shopkeeper');
original(20,'bounty-display');
original(21,'master-and-dog');
original(22,'extreme-clear');
original(23,'delta-fun-menu');
original(24,'exclusive-eagle');
original(27,'s11-safe',undefined,'png');

const MOBILE_PRODUCTS=[
  {id:101,title:'三角洲手游价格表',cat:'手游',image:'assets/originals/mobile-price-list.jpg',thumb:'assets/original-thumbs/mobile-price-list.jpg'},
  {id:102,title:'三角洲手游趣味单',cat:'手游',image:'assets/originals/mobile-fun-list.jpg',thumb:'assets/original-thumbs/mobile-fun-list.jpg'}
];
const COLLECTION_ONLY_PRODUCTS=[
  {id:103,title:'灰灰电竞代肝价格',cat:'代肝',image:'assets/originals/daigan-price.png',thumb:'assets/original-thumbs/daigan-price.jpg'}
];
const COLLECTION_PRODUCTS=[...PRODUCTS,...COLLECTION_ONLY_PRODUCTS];
const ALL_PRODUCTS=[...COLLECTION_PRODUCTS,...MOBILE_PRODUCTS];

const $=(s,el=document)=>el.querySelector(s);
const $$=(s,el=document)=>[...el.querySelectorAll(s)];

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const hasGSAP = typeof window.gsap !== 'undefined';
const hasScrollTrigger = typeof window.ScrollTrigger !== 'undefined';
if(hasGSAP && hasScrollTrigger) gsap.registerPlugin(ScrollTrigger);

const state={category:null,query:''};
const CATEGORY_ORDER=['体验','陪玩','推荐','趣味','活动','3x3'];
const CART_KEY='huihui_menu_folder_v4';

const categoryColors={
  '体验':['#f0edf7','#675781'],
  '陪玩':['#f3eef5','#7a627d'],
  '趣味':['#f7eef2','#946b7b'],
  '活动':['#f5f1e9','#8d7450'],
  '3x3':['#eceef2','#4e535f'],
};

let cart = loadCart();
let currentProduct=null;
let activePage=null;
let toastTween=null;
let activeCollection='推荐';
let imageZoom=1;
let imagePan={x:0,y:0};
const imagePointers=new Map();
let imageLoadToken=0;

const grid=$('#productGrid');
const resultCount=$('#resultCount');
const empty=$('#emptyState');
const search=$('#searchInput');
const searchAction=$('#searchAction');
const categoryBar=$('#categoryBar');

const sheet=$('#productSheet');
const sheetImage=$('#sheetImage');
const originalLoader=$('#originalLoader');
const sheetPlaceholder=$('#sheetPlaceholder');
const placeholderTitle=$('#placeholderTitle');
const sheetTitle=$('#sheetTitle');
const sheetCat=$('#sheetCat');
const addCurrentToCart=$('#addCurrentToCart');
const imageViewport=$('#imageViewport');
const sheetBody=$('#sheetBody');
const sheetFoot=$('.sheet-foot',sheet);
const collectionGrid=$('#collectionGrid');
const collectionsSheet=$('#collectionsSheet');

const cartSheet=$('#cartSheet');
const cartList=$('#cartList');
const cartEmpty=$('#cartEmpty');
const toast=$('#toast');

function loadCart(){
  try{
    const parsed=JSON.parse(localStorage.getItem(CART_KEY)||'[]');
    return Array.isArray(parsed) ? parsed.filter(id=>ALL_PRODUCTS.some(p=>p.id===id&&p.cartable!==false)) : [];
  }catch{return [];}
}
function saveCart(){try{localStorage.setItem(CART_KEY,JSON.stringify(cart));}catch{}}
function isInCart(id){return cart.includes(id);}

function getFiltered(){
  const q=state.query.trim().toLowerCase();

  let list=PRODUCTS.filter(p=>{
    const qOK=!q || (`${p.title} ${p.cat}`.toLowerCase().includes(q));
    if(!qOK) return false;

    // Search is always global, independent of selected category.
    if(q) return true;

    // No category selected = default "all menus".
    if(!state.category) return true;

    if(state.category==='推荐') return !!p.featured;
    return p.cat===state.category;
  });

  if(!q && state.category==='推荐'){
    list=list.sort((a,b)=>(a.featuredRank||99)-(b.featuredRank||99));
  }
  return list;
}

function placeholderVisual(item,compact=false){
  return `<div class="poster-placeholder${compact?' compact':''}">
    <img src="assets/brand/huihui-mark.webp" alt="">
    <span>HUIHUI CLUB</span>
    <b>${item.title}</b>
    <small>海报待补充</small>
  </div>`;
}

function cardHTML(item){
  const [bg,fg]=categoryColors[item.cat]||['#f2f0f4','#66616d'];
  const visual=item.thumb
    ? `<img src="${item.thumb}" alt="${item.title}" loading="lazy" decoding="async">`
    : placeholderVisual(item,true);
  return `<button class="product-card" type="button" data-id="${item.id}" aria-label="查看 ${item.title}">
    <div class="poster-thumb">
      ${visual}
      ${item.featured?'<span class="hot-badge">推荐</span>':''}
      ${isInCart(item.id)?'<span class="foldered-badge">已收藏</span>':''}
      <span class="open-hint">${item.image?'查看':'待上架'}</span>
    </div>
    <div class="product-meta">
      <span class="cat-pill" style="background:${bg};color:${fg}">${item.cat}</span>
      <h3>${item.title}</h3>
    </div>
  </button>`;
}

function renderProducts(opts={}){
  if(!grid||!resultCount||!empty)return;
  const list=getFiltered();
  grid.innerHTML=list.map(cardHTML).join('');
  resultCount.textContent=list.length;
  empty.hidden=list.length!==0;
  $$('.category-chip',categoryBar).forEach(btn=>btn.classList.toggle('active',btn.dataset.cat===state.category));
  if(opts.animate!==false) animateCards();
}

function animateCards(){
  if(!grid)return;
  const cards=$$('.product-card',grid);
  if(!cards.length) return;
  if(hasGSAP && !reducedMotion){
    gsap.fromTo(cards,
      {opacity:0,y:18,scale:.985},
      {opacity:1,y:0,scale:1,duration:.42,stagger:.035,ease:'power2.out',clearProps:'transform'}
    );
  }
}

function updateCartUI(){
  $$('.hero-cart-count').forEach(el=>el.textContent=cart.length);
  $$('.tab-cart-count').forEach(el=>{el.textContent=cart.length;el.classList.toggle('has-count',cart.length>0);});
  renderProducts({animate:false});
}

function renderCart(){
  if(!cartList||!cartEmpty)return;
  cartList.innerHTML=cart.map(id=>{
    const item=ALL_PRODUCTS.find(p=>p.id===id);
    if(!item)return '';
    const visual=item.thumb
      ? `<img src="${item.thumb}" alt="${item.title}">`
      : `<div class="cart-mini-placeholder"><img src="assets/brand/huihui-mark.webp" alt=""></div>`;
    return `<div class="cart-item" data-cart-id="${item.id}">
      ${visual}
      <div class="cart-item-copy"><b>${item.title}</b><small>${item.cat} · 点击再次查看</small></div>
      <button class="remove-cart ui-press" type="button" data-remove-cart="${item.id}" aria-label="移除 ${item.title}">×</button>
    </div>`;
  }).join('');
  $('#cartSummaryCount').textContent=cart.length;
  cartEmpty.hidden=cart.length>0;
  cartList.hidden=cart.length===0;
}

function addToCart(id){
  if(isInCart(id)){showToast('已经在菜单夹里');return;}
  cart.push(id);saveCart();updateCartUI();renderCart();syncCurrentButton();showToast('已加入菜单夹');
}
function removeFromCart(id){
  cart=cart.filter(x=>x!==id);saveCart();updateCartUI();renderCart();syncCurrentButton();showToast('已移出菜单夹');
}
function clearCart(){
  if(!cart.length)return;
  cart=[];saveCart();updateCartUI();renderCart();showToast('菜单夹已清空');
}
function syncCurrentButton(){
  if(!currentProduct||!addCurrentToCart)return;
  const inside=isInCart(currentProduct.id);
  addCurrentToCart.textContent=inside?'已在菜单夹 ✓':'加入菜单夹';
  addCurrentToCart.classList.toggle('is-added',inside);
}

function showToast(message){
  $('b',toast).textContent=message;
  if(!hasGSAP||reducedMotion){
    toast.classList.add('show');
    setTimeout(()=>toast.classList.remove('show'),1150);
    return;
  }
  if(toastTween)toastTween.kill();
  toastTween=gsap.timeline()
    .fromTo(toast,{autoAlpha:0,y:18,scale:.94},{autoAlpha:1,y:0,scale:1,duration:.28,ease:'back.out(1.6)'})
    .to(toast,{autoAlpha:0,y:8,duration:.24,delay:1.05,ease:'power2.in'});
}

function openProduct(id){
  currentProduct=ALL_PRODUCTS.find(p=>p.id===id);
  if(!currentProduct)return;

  sheetTitle.textContent=currentProduct.title;
  if(sheetCat)sheetCat.textContent=currentProduct.cat;
  placeholderTitle.textContent=currentProduct.title;

  if(sheetFoot)sheetFoot.hidden=currentProduct.cartable===false;
  sheet.classList.toggle('no-cart',currentProduct.cartable===false);
  if(currentProduct.image){
    const loadToken=++imageLoadToken;
    sheetImage.hidden=true;
    imageViewport.hidden=false;
    imageViewport.setAttribute('aria-busy','true');
    sheetPlaceholder.hidden=true;
    sheetImage.alt=currentProduct.title;
    resetImageZoom();
    if(sheetBody)sheetBody.scrollTop=0;
    if(originalLoader){
      originalLoader.hidden=false;
      originalLoader.classList.remove('is-error');
      $('b',originalLoader).textContent='原图加载中…';
    }
    sheetImage.onload=()=>{
      if(loadToken!==imageLoadToken)return;
      imageViewport.removeAttribute('aria-busy');
      sheetImage.hidden=false;
      if(originalLoader)originalLoader.hidden=true;
    };
    sheetImage.onerror=()=>{
      if(loadToken!==imageLoadToken)return;
      imageViewport.removeAttribute('aria-busy');
      if(originalLoader){
        originalLoader.hidden=false;
        originalLoader.classList.add('is-error');
        $('b',originalLoader).textContent='原图加载失败，请重新打开';
      }
    };
    sheetImage.src=currentProduct.image;
  }else{
    imageLoadToken++;
    sheetImage.hidden=true;
    imageViewport.hidden=true;
    sheetImage.removeAttribute('src');
    sheetPlaceholder.hidden=false;
  }

  syncCurrentButton();
  sheet.showModal();
  document.body.classList.add('sheet-open');
  if(hasGSAP&&!reducedMotion){
    gsap.killTweensOf(sheet);
    gsap.fromTo(sheet,{yPercent:14,scale:.985,autoAlpha:0},{yPercent:0,scale:1,autoAlpha:1,duration:.42,ease:'power3.out'});
  }
}
function closeProduct(){
  if(!sheet.open)return;
  const done=()=>{sheet.style.transform='';sheet.close();document.body.classList.remove('sheet-open');imagePointers.clear();};
  if(hasGSAP&&!reducedMotion){gsap.killTweensOf(sheet);gsap.to(sheet,{yPercent:10,autoAlpha:0,duration:.23,ease:'power2.in',onComplete:done});}
  else done();
}

function applyImageTransform(){
  sheetImage.style.transform=`translate(${imagePan.x}px,${imagePan.y}px) scale(${imageZoom})`;
  imageViewport.classList.toggle('is-zoomed',imageZoom>1.01);
}
function resetImageZoom(){
  imageZoom=1;
  imagePan={x:0,y:0};
  applyImageTransform();
}
function changeImageZoom(delta){
  imageZoom=Math.max(1,Math.min(4,Number((imageZoom+delta).toFixed(2))));
  if(imageZoom===1)imagePan={x:0,y:0};
  applyImageTransform();
}
function pointerDistance(){
  const [a,b]=[...imagePointers.values()];
  return Math.hypot(a.x-b.x,a.y-b.y);
}

function collectionItems(category){
  const items=category==='推荐' ? COLLECTION_PRODUCTS.filter(item=>item.featured) : COLLECTION_PRODUCTS.filter(item=>item.cat===category);
  return category==='推荐' ? items.sort((a,b)=>(a.featuredRank||99)-(b.featuredRank||99)) : items;
}
function renderCollection(category){
  activeCollection=category;
  if(!collectionGrid)return;
  const labels={推荐:'热门推荐',体验:'体验玩法',代肝:'代肝专区',陪玩:'陪玩服务',趣味:'趣味玩法',活动:'活动专区','3x3':'3×3 服务'};
  const items=collectionItems(category);
  const title=$('#collectionTitle');
  if(title)title.textContent=labels[category]||'菜单目录';
  $$('.collection-category').forEach(btn=>btn.classList.toggle('active',btn.dataset.collection===category));
  collectionGrid.innerHTML=items.map(item=>{
    const visual=item.thumb
      ? `<img src="${item.thumb}" alt="" loading="lazy" decoding="async">`
      : `<span class="collection-thumb-placeholder"><img src="assets/brand/huihui-mark.webp" alt=""></span>`;
    return `<button class="collection-menu-row" type="button" data-id="${item.id}" aria-label="查看 ${item.title}">
      ${visual}<span><b>${item.title}</b><small>${item.cat} · ${item.image?'查看海报':'海报待补充'}</small></span>
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
    </button>`;
  }).join('');
}
function openCollections(){
  if(!collectionsSheet){location.href='collection.html';return;}
  if(activePage)closeActivePage(false);
  if(sheet.open)sheet.close();
  if(cartSheet.open)cartSheet.close();
  collectionsSheet.showModal();
  document.body.classList.add('sheet-open');
}
function closeCollections(){
  if(!collectionsSheet?.open)return;
  collectionsSheet.style.transform='';
  collectionsSheet.close();
  document.body.classList.remove('sheet-open');
}
function openCollectionPage(category){
  closeCollections();
  if(collectionGrid){
    renderCollection(category);
    history.replaceState(null,'',`collection.html?category=${encodeURIComponent(category)}`);
  }else{
    location.href=`collection.html?category=${encodeURIComponent(category)}`;
  }
}

function openCart(){
  closeActivePage(false);
  if(sheet.open)sheet.close();
  renderCart();
  cartSheet.showModal();
  document.body.classList.add('sheet-open');
  if(hasGSAP&&!reducedMotion){
    const tl=gsap.timeline();
    tl.fromTo(cartSheet,{yPercent:15,autoAlpha:0,scale:.985},{yPercent:0,autoAlpha:1,scale:1,duration:.42,ease:'power3.out'});
    if(cart.length)tl.fromTo('.cart-item',{opacity:0,x:18},{opacity:1,x:0,duration:.32,stagger:.04},'-=.16');
  }
}
function closeCart(){
  if(!cartSheet.open)return;
  const done=()=>{cartSheet.style.transform='';cartSheet.close();document.body.classList.remove('sheet-open');};
  if(hasGSAP&&!reducedMotion)gsap.to(cartSheet,{yPercent:12,autoAlpha:0,duration:.23,ease:'power2.in',onComplete:done});
  else done();
}

function copyCart(){
  if(!cart.length)return showToast('先加入几个玩法吧');
  const lines=cart.map((id,i)=>`${i+1}. ${ALL_PRODUCTS.find(p=>p.id===id)?.title||''}`).join('\n');
  const text=`灰灰电竞｜我的菜单夹\n${lines}\n\n请帮我确认以上玩法。`;
  const done=()=>showToast('菜单清单已复制');
  if(navigator.clipboard?.writeText)navigator.clipboard.writeText(text).then(done).catch(()=>fallbackCopy(text,done));
  else fallbackCopy(text,done);
}
function fallbackCopy(text,done){
  const ta=document.createElement('textarea');ta.value=text;ta.style.position='fixed';ta.style.opacity='0';
  document.body.appendChild(ta);ta.select();try{document.execCommand('copy');done();}finally{ta.remove();}
}

function returnToPreviousPage(){
  let sameSite=false;
  try{sameSite=!!document.referrer&&new URL(document.referrer).origin===location.origin;}catch{}
  if(sameSite&&history.length>1)history.back();
  else location.href='index.html';
}

function openPage(name,push=true){
  const routes={mobile:'mobile.html',recharge:'recharge.html',notice:'notice.html',collection:'collection.html'};
  if(routes[name]){location.href=routes[name];return;}
  if(name==='collection')renderCollection(activeCollection);
  const page=$(`[data-page="${name}"]`);
  if(!page)return;
  if(cartSheet.open)cartSheet.close();
  if(sheet.open)sheet.close();
  if(activePage&&activePage!==page)closeActivePage(false);

  activePage=page;
  page.setAttribute('aria-hidden','false');
  page.classList.add('open');
  document.body.classList.add('subpage-open');
  if(push && location.hash!==`#${name}`){
    try{ history.pushState({page:name},'',`#${name}`); }catch{}
  }

  if(hasGSAP&&!reducedMotion){
    gsap.fromTo(page,{xPercent:100,autoAlpha:.7},{xPercent:0,autoAlpha:1,duration:.42,ease:'power3.out'});
    gsap.fromTo($('.subpage-head',page),{y:-10,opacity:0},{y:0,opacity:1,duration:.3,delay:.12});
    gsap.fromTo($('.subpage-body',page),{y:12,opacity:0},{y:0,opacity:1,duration:.34,delay:.14});
  }
}
function closeActivePage(updateHistory=true){
  if(!activePage)return;
  const page=activePage;
  const done=()=>{
    page.classList.remove('open');
    page.setAttribute('aria-hidden','true');
    document.body.classList.remove('subpage-open');
    if(activePage===page)activePage=null;
  };
  if(hasGSAP&&!reducedMotion)gsap.to(page,{xPercent:100,autoAlpha:.7,duration:.30,ease:'power2.in',onComplete:done});
  else done();
  if(updateHistory && location.hash){
    try{ history.pushState(null,'',location.pathname+location.search); }catch{}
  }
}

function handleHash(){
  const name=location.hash.replace('#','');
  if(name==='cart')openCart();
}
window.addEventListener('popstate',()=>{
  const name=location.hash.replace('#','');
  if(['mobile','recharge','notice','collection'].includes(name))openPage(name,false);
  else closeActivePage(false);
});

categoryBar?.addEventListener('click',e=>{
  const btn=e.target.closest('.category-chip');
  if(!btn) return;

  const clicked=btn.dataset.cat;
  state.category = state.category===clicked ? null : clicked;
  state.query='';
  search.value='';

  renderProducts();

  if(hasGSAP&&!reducedMotion){
    gsap.fromTo(btn,{scale:.95},{scale:1,duration:.28,ease:'back.out(1.8)'});
  }
});

search?.addEventListener('input',e=>{state.query=e.target.value;renderProducts();});
search?.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();search.blur();}});
searchAction?.addEventListener('click',()=>{state.query=search.value;renderProducts();search.blur();});

grid?.addEventListener('click',e=>{
  const card=e.target.closest('.product-card');
  if(card)openProduct(Number(card.dataset.id));
});
collectionGrid?.addEventListener('click',e=>{
  const row=e.target.closest('[data-id]');
  if(row)openProduct(Number(row.dataset.id));
});

addCurrentToCart?.addEventListener('click',()=>{if(currentProduct)addToCart(currentProduct.id);});
$('#clearCart')?.addEventListener('click',clearCart);
$('#copyCart')?.addEventListener('click',copyCart);

cartList?.addEventListener('click',e=>{
  const remove=e.target.closest('[data-remove-cart]');
  if(remove){removeFromCart(Number(remove.dataset.removeCart));return;}
  const item=e.target.closest('.cart-item');
  if(item){closeCart();setTimeout(()=>openProduct(Number(item.dataset.cartId)),220);}
});

$$('[data-open-cart]').forEach(b=>b.addEventListener('click',openCart));
$$('[data-close-cart]').forEach(b=>b.addEventListener('click',closeCart));
$$('[data-open-collections]').forEach(b=>b.addEventListener('click',openCollections));
$$('[data-close-collections]').forEach(b=>b.addEventListener('click',closeCollections));
$$('[data-collection]').forEach(b=>b.addEventListener('click',()=>openCollectionPage(b.dataset.collection)));
$('[data-cart-jump]')?.addEventListener('click',()=>{closeCart();const menu=$('#menu');if(menu)menu.scrollIntoView({behavior:'auto',block:'start'});else location.href='index.html#menu';});
cartSheet.addEventListener('click',e=>{if(e.target===cartSheet)closeCart();});
collectionsSheet?.addEventListener('click',e=>{if(e.target===collectionsSheet)closeCollections();});

$$('[data-close-sheet]').forEach(b=>b.addEventListener('click',closeProduct));
sheet.addEventListener('click',e=>{if(e.target===sheet)closeProduct();});

$('#zoomIn')?.addEventListener('click',()=>changeImageZoom(.35));
$('#zoomOut')?.addEventListener('click',()=>changeImageZoom(-.35));
$('#zoomReset')?.addEventListener('click',resetImageZoom);
imageViewport.addEventListener('wheel',e=>{
  if(!currentProduct?.image)return;
  if(!e.ctrlKey&&!e.metaKey)return;
  e.preventDefault();
  changeImageZoom(e.deltaY<0?.18:-.18);
},{passive:false});
imageViewport.addEventListener('dblclick',()=>imageZoom>1?resetImageZoom():changeImageZoom(1));
imageViewport.addEventListener('pointerdown',e=>{
  if(!currentProduct?.image)return;
  imagePointers.set(e.pointerId,{x:e.clientX,y:e.clientY});
  if(imageZoom>1)imageViewport.setPointerCapture?.(e.pointerId);
});
imageViewport.addEventListener('pointermove',e=>{
  if(!imagePointers.has(e.pointerId))return;
  const previous=imagePointers.get(e.pointerId);
  imagePointers.set(e.pointerId,{x:e.clientX,y:e.clientY});
  if(imagePointers.size===2){
    e.preventDefault();
    const distance=pointerDistance();
    const before=imageViewport.dataset.pinchDistance;
    if(before)changeImageZoom((distance-Number(before))/180);
    imageViewport.dataset.pinchDistance=String(distance);
  }else if(imageZoom>1){
    e.preventDefault();
    imagePan.x+=e.clientX-previous.x;
    imagePan.y+=e.clientY-previous.y;
    applyImageTransform();
  }
});
function releaseImagePointer(e){
  imagePointers.delete(e.pointerId);
  if(imagePointers.size<2)delete imageViewport.dataset.pinchDistance;
}
imageViewport.addEventListener('pointerup',releaseImagePointer);
imageViewport.addEventListener('pointercancel',releaseImagePointer);

$$('[data-open-product]').forEach(button=>button.addEventListener('click',()=>openProduct(Number(button.dataset.openProduct))));

function enableSheetDrag(dialog,header,close){
  let startY=0,offset=0,dragging=false;
  header.addEventListener('pointerdown',e=>{
    if(e.button!==undefined&&e.button!==0)return;
    if(e.target.closest('button,a'))return;
    startY=e.clientY;offset=0;dragging=true;
    header.setPointerCapture?.(e.pointerId);
  });
  header.addEventListener('pointermove',e=>{
    if(!dragging)return;
    offset=Math.max(0,e.clientY-startY);
    dialog.style.transform=`translateY(${offset}px)`;
  });
  const finish=()=>{
    if(!dragging)return;
    dragging=false;
    if(offset>92)close();
    else dialog.style.transform='';
  };
  header.addEventListener('pointerup',finish);
  header.addEventListener('pointercancel',finish);
}
enableSheetDrag(sheet,$('.sheet-head',sheet),closeProduct);
enableSheetDrag(cartSheet,$('.cart-head',cartSheet),closeCart);
if(collectionsSheet)enableSheetDrag(collectionsSheet,$('.collections-head',collectionsSheet),closeCollections);

$$('[data-open-page]').forEach(b=>b.addEventListener('click',()=>openPage(b.dataset.openPage)));
$$('[data-close-page]').forEach(b=>b.addEventListener('click',()=>closeActivePage()));
$$('[data-history-back]').forEach(b=>b.addEventListener('click',returnToPreviousPage));

$$('[data-jump]').forEach(el=>el.addEventListener('click',()=>{
  if(activePage)closeActivePage(false);
  const target=$(el.dataset.jump);if(target)target.scrollIntoView({behavior:'auto',block:'start'});
}));

$$('[data-filter]').forEach(btn=>btn.addEventListener('click',()=>{
  state.category=btn.dataset.filter;
  state.query='';
  search.value='';
  renderProducts();
  $('#menu').scrollIntoView({behavior:'auto',block:'start'});
}));

document.addEventListener('keydown',e=>{
  if(e.key==='Escape'){
    if(sheet.open)closeProduct();
    else if(cartSheet.open)closeCart();
    else if(collectionsSheet?.open)closeCollections();
    else if(activePage)closeActivePage();
  }
});

function initNavObserver(){
  const navItems=$$('.tab-item[data-jump]');
  if(!navItems.length)return;
  const observer=new IntersectionObserver(entries=>{
    if(activePage)return;
    const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
    if(!visible)return;
    $$('.tab-item').forEach(n=>n.classList.remove('active'));
    const match=navItems.find(n=>n.dataset.jump==='#'+visible.target.id);
    if(match)match.classList.add('active');
  },{rootMargin:'-20% 0px -65% 0px',threshold:[0,.2,.5]});
  ['#home','#menu'].forEach(s=>{const el=$(s);if(el)observer.observe(el);});
}

function initGSAP(){
  if(!hasGSAP||reducedMotion)return;
  const intro=gsap.timeline({defaults:{duration:.52,ease:'power3.out'}});
  // Keep essential navigation visible at all times.
  // Only animate position/scale so a CDN/timeline interruption can never leave it blank.
  intro.from('.appbar',{y:-12,duration:.32})
    .from('.store-card',{y:18,scale:.988},'-=.08')
    .from('.store-head > *',{y:8,stagger:.045},'-=.22')
    .from('.store-actions > *',{y:8,scale:.985,stagger:.055},'-=.20')
    .from('.quick-item',{y:8,scale:.985,stagger:.045},'-=.16');

  gsap.to('.hero-glow-a',{x:12,y:10,scale:1.10,duration:6,yoyo:true,repeat:-1,ease:'sine.inOut'});
  gsap.to('.hero-glow-b',{x:-8,y:-8,scale:1.08,duration:7,yoyo:true,repeat:-1,ease:'sine.inOut'});
  gsap.to('.orb-a',{x:18,y:16,duration:9,yoyo:true,repeat:-1,ease:'sine.inOut'});
  gsap.to('.orb-b',{x:-20,y:18,duration:10,yoyo:true,repeat:-1,ease:'sine.inOut'});

  if(hasScrollTrigger){
    $$('.gs-reveal').forEach(el=>{
      if(el.closest('.hero')||el.closest('.quick'))return;
      gsap.from(el,{opacity:0,y:18,duration:.60,scrollTrigger:{trigger:el,start:'top 92%',once:true}});
    });
  }

  $$('.ui-press').forEach(el=>{
    el.addEventListener('pointerdown',()=>gsap.to(el,{scale:.97,duration:.10}));
    el.addEventListener('pointerup',()=>gsap.to(el,{scale:1,duration:.20,ease:'back.out(2)'}));
    el.addEventListener('pointercancel',()=>gsap.to(el,{scale:1,duration:.18}));
  });
}

if(grid){
  const requested=new URLSearchParams(location.search).get('category');
  if(['体验','陪玩','推荐','趣味','活动','3x3'].includes(requested))state.category=requested;
}
renderProducts({animate:false});
if(collectionGrid){
  const requested=new URLSearchParams(location.search).get('category');
  renderCollection(['推荐','体验','代肝','陪玩','趣味','活动','3x3'].includes(requested)?requested:'推荐');
}
renderCart();
updateCartUI();
initNavObserver();
initGSAP();
handleHash();
