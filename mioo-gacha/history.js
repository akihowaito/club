'use strict';
// History belongs to this browser. No server or other users' results are queried.
(() => {
  const prizesSection = document.querySelector('#prizes');
  const grid = prizesSection?.querySelector('.prize-grid');
  if (!grid || typeof readResults !== 'function' || typeof createReceipt !== 'function') return;

  const layout = document.createElement('div');
  layout.className = 'surprise-layout';
  grid.parentNode.insertBefore(layout, grid);
  layout.append(grid);
  const panel = document.createElement('aside');
  panel.className = 'history-panel';
  panel.setAttribute('aria-labelledby', 'historyTitle');
  panel.innerHTML = '<div class="history-heading"><div><small>MY CAPSULE HISTORY</small><h3 id="historyTitle">♡ 历史扭蛋记录</h3></div><span class="history-count" id="historyCount">0 条</span></div><div class="history-list" id="historyList" aria-live="polite"></div><p class="history-note">仅显示当前浏览器的中奖记录，可随时查看与保存凭证 ♡</p>';
  layout.append(panel);
  const list = panel.querySelector('#historyList');
  const counter = panel.querySelector('#historyCount');

  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  overlay.id = 'historyReceiptOverlay';
  overlay.hidden = true;
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-labelledby', 'historyReceiptTitle');
  overlay.innerHTML = '<div class="modal history-receipt-modal"><button type="button" class="close-modal" id="closeHistoryReceipt" aria-label="关闭中奖凭证">×</button><div class="modal-overline">MIOO CLUB · LUCKY CAPSULE</div><h2 id="historyReceiptTitle">♡ 我的中奖凭证</h2><div class="history-preview-scroll"><img id="historyReceiptImage" alt="完整中奖凭证预览" hidden></div><p class="history-preview-status" id="historyPreviewStatus" role="status">正在生成凭证预览…</p><div class="result-actions"><button type="button" class="btn btn-primary btn-sm" id="saveHistoryReceipt" disabled>↓ 保存 PNG 凭证</button><button type="button" class="btn btn-secondary btn-sm" id="returnFromHistory">返回记录</button></div></div>';
  document.body.append(overlay);
  const image = overlay.querySelector('#historyReceiptImage');
  const previewStatus = overlay.querySelector('#historyPreviewStatus');
  const saveBtn = overlay.querySelector('#saveHistoryReceipt');
  const closeBtn = overlay.querySelector('#closeHistoryReceipt');
  const mainResult = document.querySelector('#resultOverlay');
  const poster = document.querySelector('#posterOverlay');
  let previousButton = null;
  let previewUrl = '';
  let selectedResult = null;
  let generation = 0;

  function allHistory() {
    const saved = readResults();
    if (!saved || typeof saved !== 'object' || Array.isArray(saved)) return [];
    return Object.entries(saved).filter(([code, item]) => {
      return typeof code === 'string' && item && typeof item === 'object' &&
        item.prize && typeof item.prize.name === 'string' && item.receiptId && item.time;
    }).sort((a, b) => (Date.parse(b[1].time) || 0) - (Date.parse(a[1].time) || 0));
  }

  function renderHistory() {
    const saved = allHistory();
    counter.textContent = `${saved.length} 条`;
    list.replaceChildren();
    if (!saved.length) {
      const empty = document.createElement('div');
      empty.className = 'history-empty';
      empty.innerHTML = '<span class="history-empty-icon" aria-hidden="true">🎟️</span><strong>还没有扭蛋记录</strong><p>完成第一次扭蛋后，中奖凭证会出现在这里。</p>';
      list.append(empty);
      return;
    }
    const fragment = document.createDocumentFragment();
    for (const [code, item] of saved) {
      const row = document.createElement('article');
      row.className = 'history-item';
      const emoji = document.createElement('span');
      emoji.className = 'history-emoji';
      emoji.setAttribute('aria-hidden', 'true');
      emoji.textContent = typeof item.prize.emoji === 'string' ? item.prize.emoji : '🎁';
      const details = document.createElement('div');
      details.className = 'history-item-details';
      const name = document.createElement('strong');
      name.textContent = item.prize.name;
      const date = document.createElement('time');
      const parsed = new Date(item.time);
      date.dateTime = Number.isFinite(parsed.getTime()) ? parsed.toISOString() : '';
      date.textContent = typeof formatTime === 'function' ? formatTime(parsed) : String(item.time);
      const view = document.createElement('button');
      view.type = 'button';
      view.className = 'history-view';
      view.textContent = '查看凭证';
      view.setAttribute('aria-label', `查看${item.prize.name}的中奖凭证`);
      view.addEventListener('click', () => openReceipt(item, code));
      details.append(name, date, view);
      row.append(emoji, details);
      fragment.append(row);
    }
    list.append(fragment);
  }

  function closeReceipt() {
    generation++;
    overlay.hidden = true;
    image.hidden = true;
    image.removeAttribute('src');
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    previewUrl = '';
    selectedResult = null;
    saveBtn.disabled = true;
    if (mainResult.hidden && poster.hidden) document.body.classList.remove('modal-open');
    if (previousButton?.isConnected) previousButton.focus();
  }

  async function openReceipt(item, code) {
    if (!overlay.hidden) closeReceipt();
    selectedResult = typeof normalizeResult === 'function' ? normalizeResult(item, code) : null;
    if (!selectedResult || !Number.isFinite(selectedResult.time.getTime())) {
      notify('这条凭证记录无法读取，请联系客服。');
      return;
    }
    previousButton = document.activeElement;
    overlay.hidden = false;
    document.body.classList.add('modal-open');
    closeBtn.focus();
    image.hidden = true;
    saveBtn.disabled = true;
    previewStatus.textContent = '正在生成完整 PNG 凭证…';
    const request = ++generation;
    try {
      // createReceipt reads latestResult; save and restore it without changing the active draw.
      const oldResult = latestResult;
      latestResult = selectedResult;
      let canvas;
      try { canvas = await createReceipt(); }
      finally { latestResult = oldResult; }
      const blob = await new Promise((resolve, reject) => canvas.toBlob(b => b ? resolve(b) : reject(Error('无法生成 PNG')), 'image/png'));
      if (request !== generation || overlay.hidden) return;
      previewUrl = URL.createObjectURL(blob);
      image.src = previewUrl;
      image.hidden = false;
      saveBtn.disabled = false;
      previewStatus.textContent = '感谢板板，请保存凭证并联系客服核销 ♡';
    } catch (error) {
      console.error('History receipt preview failed:', error);
      if (request === generation) previewStatus.textContent = '凭证预览暂不可用，请联系客服核对记录。';
    }
  }

  saveBtn.addEventListener('click', () => {
    if (!previewUrl || !selectedResult) return;
    const link = document.createElement('a');
    link.href = previewUrl;
    link.download = `MIOO-中奖凭证-${selectedResult.receiptId}.png`;
    document.body.append(link);
    link.click();
    link.remove();
    previewStatus.textContent = '已尝试保存 PNG；若下载受限，可长按凭证图片保存。';
  });
  closeBtn.addEventListener('click', closeReceipt);
  overlay.querySelector('#returnFromHistory').addEventListener('click', closeReceipt);
  overlay.addEventListener('mousedown', event => { if (event.target === overlay) closeReceipt(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && !overlay.hidden) closeReceipt(); });
  window.addEventListener('storage', event => { if (event.key === STORAGE_KEY) renderHistory(); });
  const originalWriteResults = writeResults;
  writeResults = function (results) { const value = originalWriteResults(results); renderHistory(); return value; };
  renderHistory();
})();
