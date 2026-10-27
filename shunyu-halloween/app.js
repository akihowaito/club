(() => {
  'use strict';
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];
  const STORAGE_KEY = 'shunyu-halloween-v1';
  const TIERS = {688: {target: 1, floor: 2888, lights: 35}, 1288: {target: 2, floor: 4688, lights: 70}};
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let state, busy = false, toastTimer, soundOn = false, audioContext, pendingConfirm;
  let hostSelection = [];
  let calm = reduceMotion.matches;
  const pickRandom = (count, lights) => {
    const pool = Array.from({length: lights}, (_, i) => i + 1);
    for (let i = pool.length - 1; i > 0; i--) {
      const values = new Uint32Array(1);
      crypto.getRandomValues(values);
      const j = Math.floor(values[0] / 4294967296 * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    return pool.slice(0, count);
  };
  const createRound = (tier = 688, mode = 'demo', hidden = null, allowance = 5) => ({tier, mode, hidden: hidden || pickRandom(TIERS[tier].target, TIERS[tier].lights), opened: [], allowance});
  const found = () => state.opened.filter(n => state.hidden.includes(n)).length;
  const isComplete = () => found() >= TIERS[state.tier].target;
  const remaining = () => Math.max(0, state.allowance - state.opened.length);
  function validState(value) {
    const validPositions = list => Array.isArray(list) && list.every(n => Number.isInteger(n) && n >= 1 && n <= TIERS[value.tier].lights) && new Set(list).size === list.length;
    return value && Object.hasOwn(TIERS, value.tier) && ['demo', 'host'].includes(value.mode) && validPositions(value.hidden) && value.hidden.length === TIERS[value.tier].target && validPositions(value.opened) && Number.isSafeInteger(value.allowance) && value.allowance >= value.opened.length;
  }
  try { const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)); state = validState(saved) ? saved : createRound(); } catch { state = createRound(); }
  function save() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch { toast('浏览器未允许保存，本轮进度仅在当前页面保留。'); }
  }
  function toast(message) {
    clearTimeout(toastTimer); $('#toast').textContent = message; $('#toast').classList.add('visible');
    toastTimer = setTimeout(() => $('#toast').classList.remove('visible'), 3200);
  }
  function showDialog(dialog) { dialog.showModal(); document.body.classList.add('dialog-open'); }
  $$('.themed-dialog').forEach(dialog => {
    dialog.addEventListener('close', () => { if (!$('dialog[open]')) document.body.classList.remove('dialog-open'); });
    dialog.addEventListener('click', event => { if (event.target === dialog) { const b = dialog.getBoundingClientRect(); if (event.clientX < b.left || event.clientX > b.right || event.clientY < b.top || event.clientY > b.bottom) dialog.close(); } });
  });
  $$('.close-dialog').forEach(button => button.addEventListener('click', () => button.closest('dialog').close()));
  function confirmReset(action) {
    if (!state.opened.length) return action();
    pendingConfirm = action; showDialog($('#confirm-dialog'));
  }
  $('#confirm-cancel').addEventListener('click', () => { pendingConfirm = null; $('#confirm-dialog').close(); });
  $('#confirm-ok').addEventListener('click', () => { $('#confirm-dialog').close(); const action = pendingConfirm; pendingConfirm = null; action?.(); });
  $('#confirm-dialog').addEventListener('cancel', () => { pendingConfirm = null; });
  function render() {
    const complete = isComplete(), lights = TIERS[state.tier].lights;
    $('#hero-light-count').textContent = lights; $('#rule-light-count').textContent = lights;
    $('#pumpkin-grid').setAttribute('aria-label', `${lights}盏南瓜灯`);
    $('#remaining-count').textContent = remaining(); $('#mobile-remaining').textContent = remaining();
    $('#found-count').textContent = `${found()} / ${TIERS[state.tier].target}`;
    $('#mode-label').textContent = state.mode === 'demo' ? '趣味体验' : '老板开局';
    $('#local-caption').textContent = state.mode === 'demo' ? `体验场 · 随机藏鬼 · 本轮 ${state.allowance} 次机会` : `当面开局 · 本轮 ${state.allowance} 次机会 · 进度保存在本机`;
    $('#new-demo').textContent = state.mode === 'demo' ? '再来一轮 ↻' : '重新开局 ↻';
    $('#stage-instruction').textContent = complete ? '捣蛋鬼已集齐！本轮可结单，恭喜接住今晚的好运。' : !remaining() ? '本轮机会已用完。看看次数计算，或让老板补充机会吧。' : `还藏着 ${TIERS[state.tier].target - found()} 只捣蛋鬼，下一盏，也许就是它。`;
    $('#pumpkin-grid').innerHTML = Array.from({length: lights}, (_, i) => {
      const n = i + 1, opened = state.opened.includes(n), ghost = opened && state.hidden.includes(n);
      return `<button type="button" class="pumpkin${opened ? ' opened' : ''}${ghost ? ' ghost-found' : ''}" data-pumpkin="${n}" aria-label="${n}号南瓜灯${opened ? ghost ? '，已找到捣蛋鬼' : '，已打开，里面是空的' : '，点击寻找'}"${opened || complete || !remaining() ? ' disabled' : ''}><span class="pumpkin-visual"><svg class="pumpkin-drawing" viewBox="0 0 140 112" aria-hidden="true"><use href="#i-pumpkin"/></svg>${ghost ? '<svg class="found-ghost" viewBox="0 0 100 112" aria-hidden="true"><use href="#i-ghost"/></svg>' : ''}</span><span class="pumpkin-number">${ghost ? '抓到啦' : opened ? '空空如也' : String(n).padStart(2, '0')}</span></button>`;
    }).join('');
    $$('.tier-option').forEach(button => { const selected = Number(button.dataset.tier) === state.tier; button.classList.toggle('selected', selected); button.setAttribute('aria-pressed', String(selected)); });
  }
  function startDemo(tier = state.tier) { state = createRound(tier); busy = false; save(); render(); toast('新的一轮开始了！小幽灵已经重新藏好。'); }
  $$('.tier-option').forEach(button => button.addEventListener('click', () => {
    const tier = Number(button.dataset.tier);
    if (tier === state.tier) return;
    confirmReset(() => { if (state.mode === 'host') { $('#host-tier').value = tier; openHost(true); } else startDemo(tier); });
  }));
  $('#new-demo').addEventListener('click', () => { if (state.mode === 'host') openHost(); else confirmReset(() => startDemo()); });
  $('#pumpkin-grid').addEventListener('click', event => {
    const button = event.target.closest('[data-pumpkin]');
    if (!button || button.disabled || busy || isComplete() || remaining() < 1) return;
    const n = Number(button.dataset.pumpkin), box = button.getBoundingClientRect();
    const nextFocus = n, currentRound = state;
    state.opened.push(n); save(); render();
    const current = $(`[data-pumpkin="${n}"]`); current.classList.add('revealing');
    const next = $$('.pumpkin:not(:disabled)').find(b => Number(b.dataset.pumpkin) > nextFocus) || $('.pumpkin:not(:disabled)');
    if (event.detail === 0) (next || $('#new-demo')).focus({preventScroll:true});
    const caught = state.hidden.includes(n);
    burst(box.x + box.width / 2, box.y + box.height / 2, caught ? 65 : 17, caught);
    chime(caught ? 'found' : 'open');
    if (caught) {
      busy = true;
      setTimeout(() => { if (state !== currentRound) return; busy = false; presentResult(isComplete() ? 'win' : 'found', n); }, calm ? 100 : 650);
    } else {
      toast(`${String(n).padStart(2, '0')} 号只有一缕南瓜香。${remaining() ? '再找找，它就在这里。' : '本轮机会用完啦。'}`);
      if (!remaining()) { busy = true; setTimeout(() => { if (state !== currentRound) return; busy = false; if (!remaining()) presentResult('empty'); }, calm ? 100 : 850); }
    }
  });
  function presentResult(type, number) {
    const title = type === 'win' ? '抓到你啦，捣蛋鬼！' : type === 'found' ? '找到一只，还差一点点！' : '小幽灵，真会躲呀。';
    $('#result-label').textContent = type === 'win' ? 'CAUGHT YOU!' : type === 'found' ? 'HELLO, LITTLE GHOST' : 'THE NIGHT GOES ON';
    $('#result-title').textContent = title;
    $('#result-description').textContent = type === 'win' ? `你已找到 ${found()} 只捣蛋鬼，点亮了 ${state.opened.length} 盏南瓜灯。本轮可结单，记得请老板确认。` : type === 'found' ? `${number} 号南瓜里藏着一只可爱鬼！还需找到 ${TIERS[state.tier].target - found()} 只，${remaining() ? `剩余 ${remaining()} 次寻找机会。` : '本轮机会已用完，可让老板补充。'}` : `这次点亮了 ${state.opened.length} 盏南瓜灯，已找到 ${found()} / ${TIERS[state.tier].target} 只鬼。${state.mode === 'demo' ? '再来一轮，也许下一盏就是好运。' : '本轮机会已用完，可由老板确认后补充。'}`;
    $('#result-action').textContent = type === 'win' ? '收下这份好运' : type === 'found' && remaining() ? '继续寻找下一只' : state.mode === 'demo' ? '再来一轮，继续捣蛋' : '返回南瓜秘境';
    $('#result-action').onclick = () => { $('#result-dialog').close(); if (type === 'empty' && state.mode === 'demo' || type === 'found' && !remaining() && state.mode === 'demo') startDemo(); };
    showDialog($('#result-dialog'));
    if (type === 'win') burst(innerWidth / 2, innerHeight * .33, 110, true);
  }
  $('#copy-result').addEventListener('click', async () => {
    const text = `顺宇电竞 · 万圣节南瓜寻鬼\n档位：${state.tier}，保底 ${TIERS[state.tier].floor}，5局接单\n已找到：${found()} / ${TIERS[state.tier].target} 只捣蛋鬼\n已打开：${state.opened.length} / ${TIERS[state.tier].lights} 盏灯\n剩余机会：${remaining()} 次\n状态：${isComplete() ? '已集齐，请老板确认结单' : '寻找中'}\n本地互动记录，实际结果请由老板确认。`;
    try {
      if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(text);
      else { const area = document.createElement('textarea'); area.value = text; area.style.cssText = 'position:fixed;left:-9999px'; document.body.append(area); area.select(); const copied = document.execCommand('copy'); area.remove(); if (!copied) throw new Error('copy unavailable'); }
      toast('本轮结果已复制，发给老板确认吧。');
    } catch { toast('复制未成功，请截图保存当前结果。'); }
  });
  const numeric = id => Number($(id).value);
  function calculateChances(amount, reds, kills) {
    if (![amount, reds, kills].every(Number.isFinite) || amount < 0 || reds < 0 || kills < 0 || ![amount, reds, kills].every(Number.isInteger) || amount > 99999999 || reds > 9999 || kills > 9999) return null;
    const extraction = amount < 1000 ? 0 : Math.min(5, 1 + Math.floor((amount - 1000) / 100));
    const killChances = Math.floor(kills / 2);
    return {extraction, reds, killChances, total: extraction + reds + killChances};
  }
  function updateCalculation() {
    const inputs = ['#extraction', '#red-items', '#kills'];
    const result = inputs.some(id => $(id).value.trim() === '') ? null : calculateChances(...inputs.map(numeric));
    $('#calculated-chances').textContent = result ? `${result.total} 次` : '—';
    $('#calculation-note').textContent = result ? `撤离 ${result.extraction} 次 + 红色物品 ${result.reds} 次 + 击杀 ${result.killChances} 次` : '请填写范围内的非负整数。';
    $('#chance-error').textContent = ''; return result;
  }
  $('#chance-form').addEventListener('input', updateCalculation);
  $('#chance-form').addEventListener('submit', event => {
    event.preventDefault(); const result = updateCalculation();
    if (!result) { $('#chance-error').textContent = '请正确填写金额、红色物品个数和击杀人数。'; return; }
    if (!result.total) { $('#chance-error').textContent = '本次没有可追加的机会，请填写成功撤离后的数据。'; return; }
    if (!Number.isSafeInteger(state.allowance + result.total)) { $('#chance-error').textContent = '累计次数过大，请核对本次填写的数据。'; return; }
    state.allowance += result.total; save(); render(); toast(`已追加 ${result.total} 次机会，还可寻找 ${remaining()} 次。`);
  });
  function hostTarget() { return TIERS[Number($('#host-tier').value)].target; }
  function renderHost() {
    $('#host-selection-count').textContent = `${hostSelection.length} / ${hostTarget()}`;
    $('#host-grid').innerHTML = Array.from({length: TIERS[Number($('#host-tier').value)].lights}, (_, i) => { const n = i + 1, selected = hostSelection.includes(n); return `<button type="button" data-hide="${n}" class="host-pumpkin${selected ? ' selected' : ''}" aria-label="${selected ? '取消' : '选择'}${n}号藏鬼位置" aria-pressed="${selected}"><svg viewBox="0 0 140 112" aria-hidden="true"><use href="#i-pumpkin"/></svg><span>${String(n).padStart(2, '0')}</span></button>`; }).join('');
    $('#host-error').textContent = '';
  }
  function openHost(keepTier = false) {
    if (!keepTier) $('#host-tier').value = state.tier;
    $('#host-chances').value = state.allowance || 5; hostSelection = []; renderHost(); showDialog($('#host-dialog'));
  }
  $('#host-open').addEventListener('click', () => openHost());
  $('#host-tier').addEventListener('change', () => { hostSelection = []; renderHost(); });
  $('#host-random').addEventListener('click', () => { hostSelection = pickRandom(hostTarget(), TIERS[Number($('#host-tier').value)].lights); renderHost(); });
  $('#host-grid').addEventListener('click', event => {
    const button = event.target.closest('[data-hide]'); if (!button) return;
    const n = Number(button.dataset.hide);
    if (hostSelection.includes(n)) hostSelection = hostSelection.filter(value => value !== n);
    else if (hostSelection.length < hostTarget()) hostSelection.push(n);
    else { $('#host-error').textContent = `这一档只需要藏 ${hostTarget()} 只鬼，先取消已有位置再选。`; return; }
    renderHost(); $(`[data-hide="${n}"]`).focus({preventScroll:true});
  });
  $('#host-form').addEventListener('submit', event => {
    event.preventDefault(); const allowance = numeric('#host-chances');
    if (hostSelection.length !== hostTarget()) { $('#host-error').textContent = `请先选择 ${hostTarget()} 个藏鬼位置，或点击「帮我随机藏」。`; return; }
    if (!Number.isInteger(allowance) || allowance < 1 || allowance > 99999) { $('#host-error').textContent = '寻找次数请填写 1 到 99999 之间的整数。'; return; }
    const nextRound = createRound(Number($('#host-tier').value), 'host', [...hostSelection], allowance);
    $('#host-dialog').close();
    confirmReset(() => { state = nextRound; hostSelection = []; $('#host-grid').replaceChildren(); busy = false; save(); render(); toast('南瓜已封存。现在，把页面交给寻找的人吧。'); $('#pumpkin-world').scrollIntoView({behavior:calm?'instant':'smooth'}); });
  });
  function setMotion(value) {
    calm = !value; document.documentElement.classList.toggle('calm', calm);
    if (calm) { particles = []; ctx.clearRect(0, 0, innerWidth, innerHeight); $('#hero-art').style.transform = ''; resetGhostDrag(); }
  }
  reduceMotion.addEventListener('change', event => setMotion(!event.matches));
  $('#sound-toggle').addEventListener('click', async () => {
    try { if (!audioContext) audioContext = new (window.AudioContext || window.webkitAudioContext)(); await audioContext.resume(); soundOn = !soundOn; $('#sound-toggle').classList.toggle('sound-off', !soundOn); $('#sound-toggle').setAttribute('aria-pressed', String(soundOn)); $('#sound-toggle').setAttribute('aria-label', soundOn ? '关闭音效' : '开启音效'); if (soundOn) chime('found'); toast(soundOn ? '音效开启，听听南瓜里的小秘密。' : '音效已关闭，安静地寻找吧。'); }
    catch { soundOn = false; toast('当前浏览器暂不支持音效，仍然可以正常寻找。'); }
  });
  function chime(type) {
    if (!soundOn || !audioContext) return;
    (type === 'found' ? [523.25, 659.25, 783.99, 1046.5] : [261.63, 392]).forEach((frequency, i) => {
      const oscillator = audioContext.createOscillator(), gain = audioContext.createGain(), start = audioContext.currentTime + i * .09;
      oscillator.type = 'sine'; oscillator.frequency.setValueAtTime(frequency, start); oscillator.connect(gain); gain.connect(audioContext.destination); gain.gain.setValueAtTime(0, start); gain.gain.linearRampToValueAtTime(.045, start + .015); gain.gain.exponentialRampToValueAtTime(.001, start + .55); oscillator.start(start); oscillator.stop(start + .56);
    });
  }
  const quips = ['是我呀，今晚最可爱的鬼。', '再点我，南瓜要吃醋啦。', '别告诉别人，我把好运藏进去了。', '没有吓你，是在和你打招呼！']; let quip = 0;
  const ghostButton = $('#hero-ghost'), whisper = $('#ghost-whisper');
  let ghostDrag = null, suppressGhostClick = false, greetingTimer, whisperTimer;
  function greetGhost(dragged = false) {
    const message = dragged ? '被你抓到啦！我又飘回来了。' : quips[quip++ % quips.length];
    toast(message); chime('found');
    whisper.querySelector('.whisper-words').textContent = dragged ? '嘿嘿，抓不住我吧！' : ['你好呀，小伙伴！', '再点点，我会害羞。', '好运藏好啦！', '送你一点小魔法。'][(quip - 1) % 4];
    whisper.classList.add('is-talking'); clearTimeout(whisperTimer);
    whisperTimer = setTimeout(() => { whisper.querySelector('.whisper-words').textContent = '嘘…我藏好了！'; whisper.classList.remove('is-talking'); }, 3000);
    ghostButton.classList.remove('ghost-sparked'); clearTimeout(greetingTimer);
    if (!calm) requestAnimationFrame(() => { ghostButton.classList.add('ghost-sparked'); greetingTimer = setTimeout(() => ghostButton.classList.remove('ghost-sparked'), 1100); });
    const box = ghostButton.getBoundingClientRect(); burst(box.x + box.width * .5, box.y + box.height * .73, 48, true, true);
  }
  function resetGhostDrag() {
    ghostDrag = null; ghostButton.classList.remove('is-dragging');
    ['--ghost-drag-x', '--ghost-drag-y', '--ghost-lean'].forEach(name => ghostButton.style.removeProperty(name));
  }
  $('#ghost-whisper').addEventListener('click', () => greetGhost());
  ghostButton.addEventListener('click', () => { if (!suppressGhostClick) greetGhost(); });
  ghostButton.addEventListener('pointerdown', event => {
    if (calm || !event.isPrimary || event.button !== 0) return;
    ghostDrag = {id:event.pointerId, x:event.clientX, y:event.clientY, moved:false}; ghostButton.setPointerCapture(event.pointerId);
  });
  ghostButton.addEventListener('pointermove', event => {
    if (!ghostDrag || ghostDrag.id !== event.pointerId || calm) return;
    const dx = event.clientX - ghostDrag.x, dy = event.clientY - ghostDrag.y;
    if (Math.abs(dx) + Math.abs(dy) > 7) ghostDrag.moved = true;
    if (!ghostDrag.moved) return;
    ghostButton.classList.add('is-dragging');
    ghostButton.style.setProperty('--ghost-drag-x', `${Math.max(-65,Math.min(65,dx * .65))}px`);
    ghostButton.style.setProperty('--ghost-drag-y', `${Math.max(-25,Math.min(25,dy * .4))}px`);
    ghostButton.style.setProperty('--ghost-lean', `${Math.max(-12,Math.min(12,dx * .08))}deg`);
  });
  function releaseGhost(event) {
    if (!ghostDrag || ghostDrag.id !== event.pointerId) return;
    const moved = ghostDrag.moved; resetGhostDrag();
    if (ghostButton.hasPointerCapture(event.pointerId)) ghostButton.releasePointerCapture(event.pointerId);
    if (moved) { suppressGhostClick = true; setTimeout(() => { suppressGhostClick = false; }, 100); if (event.type === 'pointerup') greetGhost(true); }
  }
  ghostButton.addEventListener('pointerup', releaseGhost); ghostButton.addEventListener('pointercancel', releaseGhost);
  let parallaxPending = false;
  $('.hero').addEventListener('pointermove', event => {
    if (calm || event.pointerType !== 'mouse' || innerWidth < 801 || parallaxPending) return;
    parallaxPending = true; requestAnimationFrame(() => { const dx = (event.clientX / innerWidth - .5) * 9, dy = (event.clientY / innerHeight - .5) * 5; $('#hero-art').style.transform = `translate(${dx}px,${dy}px)`; parallaxPending = false; });
  });
  $('.hero').addEventListener('pointerleave', () => { $('#hero-art').style.transform = ''; });
  const canvas = $('#magic-canvas'), ctx = canvas.getContext('2d'); let particles = [], fireflies = [], lastFrame = 0, lastEmber = 0, lastTrail = 0, lanternBounds;
  function updateSceneBounds() { lanternBounds = $('#hero-pumpkins').getBoundingClientRect(); }
  function resizeCanvas() {
    const dpr = Math.min(devicePixelRatio || 1, 1.6); canvas.width = innerWidth * dpr; canvas.height = innerHeight * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    fireflies = Array.from({length: innerWidth < 600 ? 28 : 55}, (_,i) => ({x: Math.random() * innerWidth, y: Math.random() * innerHeight, size: Math.random() * 1.6 + .5, speed: Math.random() * .3 + .12, phase: Math.random() * Math.PI * 2, color:i % 3 ? '#dce6a6' : '#ffbf77'}));
    updateSceneBounds();
  }
  function burst(x, y, count, special, hearts = false) {
    if (calm || document.hidden) return;
    const colors = special ? ['#ffac61', '#e3ceff', '#d6eda5', '#fff4d7'] : ['#ffad61', '#c18555'];
    for (let i = 0; i < count; i++) { const angle = Math.random() * Math.PI * 2, force = Math.random() * 4 + 1; particles.push({x, y, vx: Math.cos(angle) * force, vy: Math.sin(angle) * force - 1, life: 1, decay: .009 + Math.random() * .012, size: 1.5 + Math.random() * (hearts ? 5 : 3), color: hearts && i % 3 === 0 ? '#f2b2ce' : colors[i % colors.length], star: special && i % 4 === 0, heart:hearts && i % 3 === 0}); }
    particles = particles.slice(-230);
  }
  function animate(time) {
    requestAnimationFrame(animate); if (document.hidden || calm || time - lastFrame < 32) return;
    const delta = Math.min(2, (time - lastFrame) / 33 || 1); lastFrame = time;
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    fireflies.forEach(fly => { fly.y -= fly.speed * delta; fly.x += Math.sin(time * .0004 + fly.phase) * .2 * delta; if (fly.y < -5) fly.y = innerHeight + 5; ctx.globalAlpha = .14 + (Math.sin(time * .0012 + fly.phase) + 1) * .22; ctx.fillStyle = fly.color; ctx.shadowColor = fly.color; ctx.shadowBlur = fly.size > 1.3 ? 7 : 0; ctx.beginPath(); ctx.arc(fly.x, fly.y, fly.size, 0, Math.PI * 2); ctx.fill(); });
    ctx.shadowBlur = 0;
    if (lanternBounds?.bottom > 0 && lanternBounds.top < innerHeight && time - lastEmber > 160) {
      lastEmber = time; const box = lanternBounds;
      for (let i=0;i<2;i++) particles.push({x:box.x + box.width * (.4 + Math.random() * .3),y:box.y + box.height * (.38 + Math.random() * .25),vx:(Math.random() - .5) * .5,vy:-.9-Math.random()*.6,gravity:-.003,life:.8,decay:.009,size:Math.random()*2+.7,color:i?'#ffd68d':'#ff9c4a',star:false});
    }
    particles = particles.filter(particle => particle.life > 0);
    particles.forEach(particle => { particle.x += particle.vx * delta; particle.y += particle.vy * delta; particle.vy += (particle.gravity ?? .055) * delta; particle.life -= particle.decay * delta; ctx.globalAlpha = Math.max(0, particle.life); ctx.fillStyle = particle.color; ctx.save(); ctx.translate(particle.x, particle.y); ctx.rotate(time * .002); if (particle.heart) { const s=particle.size; ctx.beginPath(); ctx.moveTo(0,s*.8); ctx.bezierCurveTo(-s*1.5,-s*.1,-s*.8,-s,0,-s*.3); ctx.bezierCurveTo(s*.8,-s,s*1.5,-s*.1,0,s*.8); ctx.fill(); } else if (particle.star) { ctx.beginPath(); for (let i = 0; i < 8; i++) { const radius = i % 2 ? particle.size * .3 : particle.size; const angle = i * Math.PI / 4; ctx.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius); } ctx.closePath(); ctx.fill(); } else ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size); ctx.restore(); });
    ctx.globalAlpha = 1;
  }
  addEventListener('resize', resizeCanvas, {passive:true});
  addEventListener('scroll', updateSceneBounds, {passive:true});
  $('.hero').addEventListener('pointermove', event => { const now=performance.now(); if (calm || event.pointerType !== 'mouse' || now-lastTrail<70 || particles.length>160) return; lastTrail=now; burst(event.clientX,event.clientY,2,true); });
  new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.target.classList.contains('hero')) $('.mobile-game-bar').classList.toggle('visible', !entry.isIntersecting); }); }, {threshold:.05}).observe($('.hero'));
  render(); updateCalculation(); resizeCanvas(); setMotion(!calm); requestAnimationFrame(animate); save();
})();
