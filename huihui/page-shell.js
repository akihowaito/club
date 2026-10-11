(() => {
  const active = document.body.dataset.activeNav || '';
  const current = (name) => active === name ? ' active' : '';
  const ariaCurrent = (name) => active === name ? ' aria-current="page"' : '';

  document.body.insertAdjacentHTML('beforeend', `
    <nav class="tabbar" aria-label="手机底部导航">
      <a class="tab-item${current('home')}" href="index.html#home"${ariaCurrent('home')}>
        <svg viewBox="0 0 24 24"><path d="M3 10.5 12 3l9 7.5V21h-6v-6H9v6H3Z"/></svg><span>首页</span>
      </a>
      <a class="tab-item${current('menu')}" href="index.html#menu"${ariaCurrent('menu')}>
        <svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/></svg><span>菜单</span>
      </a>
      <a class="tab-item${current('collection')}" href="collection.html"${ariaCurrent('collection')}>
        <svg viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/><circle cx="7" cy="6" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="17" cy="18" r="1"/></svg><span>合集</span>
      </a>
      <button class="tab-item cart-tab" type="button" data-open-cart>
        <svg viewBox="0 0 24 24"><path d="M4 7h16v13H4z"/><path d="M8 7V4h8v3"/></svg><span>菜单夹</span><i class="tab-cart-count">0</i>
      </button>
      <a class="tab-item${current('notice')}" href="notice.html"${ariaCurrent('notice')}>
        <svg viewBox="0 0 24 24"><path d="M6 3h12v18H6z"/><path d="M9 8h6M9 12h6M9 16h4"/></svg><span>须知</span>
      </a>
    </nav>

    <dialog class="product-sheet" id="productSheet">
      <div class="sheet-head">
        <button class="sheet-grabber" type="button" data-close-sheet aria-label="关闭菜单详情"><span></span></button>
        <div class="sheet-head-copy"><b id="sheetTitle">菜单</b></div>
        <span class="sheet-favorite-mark" aria-hidden="true">✦</span>
      </div>
      <div class="sheet-body" id="sheetBody">
        <div class="image-viewport" id="imageViewport" aria-label="海报查看器：双指缩放，放大后可拖动查看细节">
          <div class="original-loader" id="originalLoader" role="status" aria-live="polite" hidden><span aria-hidden="true"></span><b>原图加载中…</b></div>
          <img id="sheetImage" alt="">
        </div>
        <div class="sheet-placeholder" id="sheetPlaceholder" hidden>
          <img src="assets/brand/huihui-mark.webp" alt="">
          <span>HUIHUI CLUB</span>
          <b id="placeholderTitle">菜单海报</b>
          <p>海报待补充</p>
        </div>
      </div>
      <div class="sheet-foot">
        <button class="add-cart-btn ui-press" type="button" id="addCurrentToCart">加入菜单夹</button>
      </div>
    </dialog>

    <dialog class="cart-sheet" id="cartSheet">
      <div class="cart-head">
        <div><span class="section-kicker">MENU FOLDER</span><h2>我的菜单夹</h2></div>
        <button class="sheet-grabber" type="button" data-close-cart aria-label="关闭菜单夹"><span></span></button>
      </div>
      <div class="cart-summary">
        <span>已选 <b id="cartSummaryCount">0</b> 个玩法</span>
        <button class="clear-cart ui-press" id="clearCart" type="button">清空</button>
      </div>
      <div class="cart-list" id="cartList"></div>
      <div class="cart-empty" id="cartEmpty">
        <div class="empty-folder">🗂️</div>
        <b>菜单夹还是空的</b>
        <p>看到喜欢的玩法，点进海报加入这里。</p>
        <a class="soft-btn ui-press" href="index.html#menu">去逛菜单</a>
      </div>
      <div class="cart-foot">
        <button class="copy-cart ui-press" id="copyCart" type="button">复制菜单清单</button>
        <a class="contact-cart ui-press" href="notice.html">查看下单须知</a>
      </div>
    </dialog>

    <div class="toast" id="toast" role="status" aria-live="polite"><span>✓</span><b>已加入菜单夹</b></div>
  `);
})();
