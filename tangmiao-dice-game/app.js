(() => {
  "use strict";

  const VALID_CODES = new Set(["TANGMIAO0913", "TOMIA2026ONCE"]);
  const TEST_CODES = new Set(["TANGMIAO0913"]);
  const STORAGE_PREFIX = "tangmiao_dice_v2:";
  const HISTORY_KEY = "tangmiao_dice_v2:history";
  const MAX_HISTORY = 30;
  const FACE_TRANSFORMS = {
    1: "rotateX(0deg) rotateY(0deg)",
    2: "rotateX(0deg) rotateY(-90deg)",
    3: "rotateX(0deg) rotateY(180deg)",
    4: "rotateX(0deg) rotateY(90deg)",
    5: "rotateX(-90deg) rotateY(0deg)",
    6: "rotateX(90deg) rotateY(0deg)"
  };

  const form = document.getElementById("redeemForm");
  const input = document.getElementById("codeInput");
  const redeemButton = document.getElementById("redeemButton");
  const formMessage = document.getElementById("formMessage");
  const rollButton = document.getElementById("rollButton");
  const rollLabel = document.getElementById("rollLabel");
  const dice = document.getElementById("dice");
  const resultCopy = document.getElementById("resultCopy");
  const statusPill = document.getElementById("statusPill");
  const imageDialog = document.getElementById("imageDialog");
  const closeImage = document.getElementById("closeImage");
  const fullRuleImage = document.getElementById("fullRuleImage");
  const imageDialogTitle = document.getElementById("imageDialogTitle");
  const receiptDialog = document.getElementById("receiptDialog");
  const closeReceipt = document.getElementById("closeReceipt");
  const receiptCanvas = document.getElementById("receiptPreview");
  const historyList = document.getElementById("historyList");
  const historyCount = document.getElementById("historyCount");
  const emptyHistory = document.getElementById("emptyHistory");
  const canvas = document.getElementById("fxCanvas");
  const ctx = canvas.getContext("2d");
  const gameCard = document.getElementById("gameCard");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let activeCode = null;
  let activeIsTest = false;
  let currentResult = null;
  let currentReceiptRecord = null;
  let isRolling = false;
  let particles = [];
  let animationFrame = 0;

  function normalizeCode(value) {
    return value.trim().toUpperCase().replace(/\s+/g, "");
  }

  function storageKey(code) {
    return `${STORAGE_PREFIX}code:${code}`;
  }

  function readJSON(key, fallback = null) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  }

  function writeJSON(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  }

  function readState(code) {
    const parsed = readJSON(storageKey(code));
    return parsed && typeof parsed === "object" ? parsed : null;
  }

  function saveState(code, state) {
    return writeJSON(storageKey(code), state);
  }

  function getHistory() {
    const history = readJSON(HISTORY_KEY, []);
    return Array.isArray(history) ? history.filter(Boolean).slice(0, MAX_HISTORY) : [];
  }

  function saveHistory(history) {
    return writeJSON(HISTORY_KEY, history.slice(0, MAX_HISTORY));
  }

  function addHistory(record) {
    const history = getHistory();
    history.unshift(record);
    saveHistory(history);
    renderHistory();
  }

  function setMessage(text, type = "") {
    formMessage.textContent = text;
    formMessage.className = `form-message${type ? ` ${type}` : ""}`;
  }

  function setStatus(text, type = "") {
    statusPill.textContent = text;
    statusPill.className = `status-pill${type ? ` ${type}` : ""}`;
  }

  function setRedeemLocked(locked, code = "") {
    input.disabled = locked;
    redeemButton.disabled = locked;
    if (code) input.value = code;
    redeemButton.querySelector("span").textContent = locked ? "已兑换" : "验证口令";
  }

  function showReady(code, isTest) {
    activeCode = code;
    activeIsTest = isTest;
    currentResult = null;
    setRedeemLocked(true, code);
    rollButton.disabled = false;
    rollLabel.textContent = isTest ? "掷骰子 · 测试无限次数" : "掷骰子";
    setStatus(isTest ? "测试模式" : "剩余 1 次", isTest ? "test" : "ready");
    setMessage(isTest ? "测试口令验证成功，可无限重复掷骰。" : "兑换成功，现在可以掷骰 1 次。", isTest ? "test" : "success");
    resultCopy.textContent = "口令已验证，点击下方按钮开始。";
  }

  function showFinished(code, result) {
    activeCode = code;
    activeIsTest = false;
    currentResult = Number(result);
    setRedeemLocked(true, code);
    rollButton.disabled = true;
    rollLabel.textContent = "本次机会已使用";
    setStatus("已完成", "done");
    setMessage("该正式口令已经使用。", "success");
    resultCopy.innerHTML = `本次结果：<strong>${currentResult} 点</strong>`;
    dice.style.transform = FACE_TRANSFORMS[currentResult] || FACE_TRANSFORMS[1];
  }

  function randomFace() {
    if (window.crypto && crypto.getRandomValues) {
      const data = new Uint32Array(1);
      crypto.getRandomValues(data);
      return (data[0] % 6) + 1;
    }
    return Math.floor(Math.random() * 6) + 1;
  }

  function createRecord(code, result, isTest) {
    const now = new Date();
    return {
      id: `${now.getTime()}-${Math.random().toString(36).slice(2, 8)}`,
      code,
      result,
      isTest,
      rolledAt: now.toISOString(),
      timeText: formatDateTime(now),
      device: getDeviceSummary(),
      userAgent: navigator.userAgent || "Unknown browser"
    };
  }

  function formatDateTime(value) {
    const d = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(d.getTime())) return "时间未知";
    const pad = n => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  }

  function getBrowserName() {
    const ua = navigator.userAgent || "";
    if (/Edg\//.test(ua)) return "Edge";
    if (/OPR\//.test(ua)) return "Opera";
    if (/Chrome\//.test(ua)) return "Chrome";
    if (/Safari\//.test(ua) && !/Chrome\//.test(ua)) return "Safari";
    if (/Firefox\//.test(ua)) return "Firefox";
    return "Browser";
  }

  function getOSName() {
    const ua = navigator.userAgent || "";
    const platform = navigator.platform || "";
    if (/Android/.test(ua)) return "Android";
    if (/iPhone|iPad|iPod/.test(ua) || (/Mac/.test(platform) && navigator.maxTouchPoints > 1)) return "iOS/iPadOS";
    if (/Win/.test(platform) || /Windows/.test(ua)) return "Windows";
    if (/Mac/.test(platform)) return "macOS";
    if (/Linux/.test(platform)) return "Linux";
    return platform || "Unknown OS";
  }

  function getDeviceSummary() {
    const width = Math.round((screen && screen.width) || window.innerWidth || 0);
    const height = Math.round((screen && screen.height) || window.innerHeight || 0);
    const touch = navigator.maxTouchPoints > 0 ? "Touch" : "Pointer";
    return `${getOSName()} · ${getBrowserName()} · ${width}×${height} · ${touch}`;
  }

  function resizeCanvas() {
    const rect = gameCard.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.floor(rect.width * dpr));
    canvas.height = Math.max(1, Math.floor(rect.height * dpr));
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function burstParticles() {
    if (prefersReducedMotion) return;
    resizeCanvas();
    const rect = gameCard.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = Math.min(300, rect.height * .42);
    const palette = ["#ff79ad", "#7ac8f5", "#ffd46f", "#a7d98d", "#caa4ff"];
    particles = Array.from({ length: 76 }, (_, i) => {
      const angle = (Math.PI * 2 * i) / 76 + Math.random() * .22;
      const speed = 2.4 + Math.random() * 4.8;
      return {
        x: cx + (Math.random() - .5) * 24,
        y: cy + (Math.random() - .5) * 16,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.5,
        g: .075 + Math.random() * .05,
        life: 56 + Math.random() * 34,
        size: 3 + Math.random() * 5,
        color: palette[i % palette.length],
        spin: Math.random() * Math.PI,
        spinV: (Math.random() - .5) * .18
      };
    });
    cancelAnimationFrame(animationFrame);
    renderParticles();
  }

  function renderParticles() {
    const rect = gameCard.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);
    particles = particles.filter(p => p.life > 0);
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.g;
      p.vx *= .992;
      p.spin += p.spinV;
      p.life -= 1;
      const alpha = Math.min(1, p.life / 24);
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.spin);
      ctx.fillStyle = p.color;
      if (Math.round(p.size) % 2 === 0) {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      }
      ctx.restore();
    }
    if (particles.length) animationFrame = requestAnimationFrame(renderParticles);
  }

  function playRollTone() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ac = new AudioCtx();
      const gain = ac.createGain();
      gain.gain.setValueAtTime(.0001, ac.currentTime);
      gain.gain.exponentialRampToValueAtTime(.08, ac.currentTime + .02);
      gain.gain.exponentialRampToValueAtTime(.0001, ac.currentTime + .36);
      gain.connect(ac.destination);
      [0, .09, .18].forEach((offset, idx) => {
        const osc = ac.createOscillator();
        osc.type = "sine";
        osc.frequency.value = 280 + idx * 120;
        osc.connect(gain);
        osc.start(ac.currentTime + offset);
        osc.stop(ac.currentTime + offset + .12);
      });
      setTimeout(() => ac.close().catch(() => {}), 700);
    } catch {
      // Optional sound only.
    }
  }

  function drawRoundedRect(c, x, y, w, h, r, fill, stroke) {
    c.beginPath();
    c.roundRect(x, y, w, h, r);
    if (fill) { c.fillStyle = fill; c.fill(); }
    if (stroke) { c.strokeStyle = stroke; c.lineWidth = 2; c.stroke(); }
  }

  function drawDie2D(c, x, y, size, face) {
    const radius = size * .18;
    drawRoundedRect(c, x, y, size, size, radius, "#fff", "rgba(215,98,146,.25)");
    const positions = {
      tl: [x + size * .28, y + size * .28], tr: [x + size * .72, y + size * .28],
      ml: [x + size * .28, y + size * .50], mr: [x + size * .72, y + size * .50],
      c: [x + size * .50, y + size * .50], bl: [x + size * .28, y + size * .72], br: [x + size * .72, y + size * .72]
    };
    const map = {1:["c"],2:["tl","br"],3:["tl","c","br"],4:["tl","tr","bl","br"],5:["tl","tr","c","bl","br"],6:["tl","tr","ml","mr","bl","br"]};
    c.fillStyle = face % 2 === 0 ? "#5db5ec" : "#ed5f96";
    for (const key of map[face] || map[1]) {
      const [px, py] = positions[key];
      c.beginPath(); c.arc(px, py, size * .075, 0, Math.PI * 2); c.fill();
    }
  }

  function wrapCanvasText(c, text, maxWidth) {
    const chars = String(text).split("");
    const lines = [];
    let current = "";
    for (const ch of chars) {
      const test = current + ch;
      if (c.measureText(test).width > maxWidth && current) {
        lines.push(current);
        current = ch;
      } else current = test;
    }
    if (current) lines.push(current);
    return lines;
  }

  function drawReceipt(record, targetCanvas = receiptCanvas) {
    const c = targetCanvas.getContext("2d");
    const w = targetCanvas.width = 1080;
    const h = targetCanvas.height = 1440;
    c.clearRect(0, 0, w, h);

    const bg = c.createLinearGradient(0, 0, w, h);
    bg.addColorStop(0, "#fff9fc"); bg.addColorStop(.55, "#fffdfd"); bg.addColorStop(1, "#eef8ff");
    c.fillStyle = bg; c.fillRect(0, 0, w, h);

    for (let i = 0; i < 36; i++) {
      const px = 40 + ((i * 151) % 980), py = 30 + ((i * 197) % 1350);
      c.globalAlpha = .10 + (i % 4) * .03;
      c.fillStyle = i % 2 ? "#ff7eae" : "#70bdf2";
      c.beginPath(); c.arc(px, py, 6 + (i % 5), 0, Math.PI * 2); c.fill();
    }
    c.globalAlpha = 1;

    drawRoundedRect(c, 64, 70, 952, 1290, 54, "rgba(255,255,255,.92)", "rgba(196,128,163,.20)");

    c.fillStyle = "#c15b86";
    c.font = "800 30px sans-serif";
    c.fillText("TANGMIAO CLUB · RESULT", 112, 146);
    c.fillStyle = "#493f56";
    c.font = "900 62px sans-serif";
    c.fillText("糖喵电竞 · 骰子结果", 112, 226);

    const glow = c.createRadialGradient(540, 535, 20, 540, 535, 260);
    glow.addColorStop(0, "rgba(255,150,193,.28)"); glow.addColorStop(1, "rgba(255,255,255,0)");
    c.fillStyle = glow; c.fillRect(240, 250, 600, 570);
    drawDie2D(c, 350, 350, 380, Number(record.result));

    c.fillStyle = "#4a3f59";
    c.font = "900 56px sans-serif";
    c.textAlign = "center";
    c.fillText(`本次结果 · ${record.result} 点`, 540, 810);
    c.textAlign = "left";

    const rows = [
      ["掷骰时间", record.timeText || formatDateTime(record.rolledAt)],
      ["兑换口令", record.code],
      ["设备信息", record.device],
      ["记录编号", record.id],
      ["口令类型", record.isTest ? "测试口令 · 无限测试" : "正式口令 · 一次有效"]
    ];
    let y = 878;
    for (const [label, value] of rows) {
      c.fillStyle = "#a48d9d"; c.font = "700 24px sans-serif"; c.fillText(label, 120, y);
      c.fillStyle = "#514658"; c.font = "700 27px sans-serif";
      const lines = wrapCanvasText(c, value, 690).slice(0, 2);
      lines.forEach((line, idx) => c.fillText(line, 300, y + idx * 36));
      y += lines.length > 1 ? 92 : 72;
      c.strokeStyle = "rgba(161,126,150,.13)"; c.beginPath(); c.moveTo(120, y - 31); c.lineTo(960, y - 31); c.stroke();
    }

    drawRoundedRect(c, 112, 1236, 856, 72, 28, "#fff0f6", null);
    c.fillStyle = "#c05583"; c.font = "800 24px sans-serif"; c.textAlign = "center";
    c.fillText("糖喵电竞 ♡ Tomia Club · Made by akihowaito", 540, 1282);
    c.fillStyle = "#aa95a3"; c.font = "500 20px sans-serif";
    c.fillText("最终解释权归糖喵电竞所有", 540, 1330);
    c.textAlign = "left";
  }

  function receiptFilename(record) {
    const cleanTime = (record.timeText || formatDateTime(record.rolledAt)).replace(/[ :]/g, "-");
    return `糖喵电竞-骰子结果-${record.result}点-${cleanTime}.png`;
  }

  function downloadReceipt(record) {
    const temp = document.createElement("canvas");
    temp.width = 1080; temp.height = 1440;
    drawReceipt(record, temp);
    const link = document.createElement("a");
    link.download = receiptFilename(record);
    link.href = temp.toDataURL("image/png");
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  function autoDownloadReceipt(record) {
    try {
      downloadReceipt(record);
      setMessage(activeIsTest ? "结果截图已自动下载。测试口令仍可继续掷骰。" : "结果截图已自动下载，可在历史记录再次查看。", activeIsTest ? "test" : "success");
    } catch {
      setMessage("自动下载被浏览器阻止，可在历史记录中查看截图。", "success");
    }
  }

  function escapeHTML(value) {
    return String(value).replace(/[&<>'"]/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[ch]));
  }

  function renderHistory() {
    const history = getHistory();
    historyCount.textContent = `${history.length} 条`;
    emptyHistory.hidden = history.length > 0;
    historyList.innerHTML = history.map(record => `
      <article class="history-item" data-record-id="${escapeHTML(record.id)}">
        <div class="history-die">${Number(record.result) || "-"}</div>
        <div class="history-main">
          <strong>${Number(record.result) || "-"} 点 · ${record.isTest ? "测试记录" : "正式记录"}</strong>
          <span>${escapeHTML(record.timeText || formatDateTime(record.rolledAt))} · ${escapeHTML(record.device || "设备未知")}</span>
        </div>
        <div class="history-actions">
          <button class="small-button" type="button" data-action="view">查看截图</button>
        </div>
      </article>
    `).join("");
  }

  function getRecordById(id) {
    return getHistory().find(item => item.id === id) || null;
  }

  function openReceipt(record) {
    if (!record) return;
    currentReceiptRecord = record;
    drawReceipt(record, receiptCanvas);
    if (typeof receiptDialog.showModal === "function") receiptDialog.showModal();
    else receiptDialog.setAttribute("open", "");
  }

  function openRuleImage(src, title) {
    fullRuleImage.src = src;
    fullRuleImage.alt = `${title}原图`;
    imageDialogTitle.textContent = title;
    if (typeof imageDialog.showModal === "function") imageDialog.showModal();
    else imageDialog.setAttribute("open", "");
  }

  function rollDice() {
    if (!activeCode || isRolling) return;
    const state = readState(activeCode);
    if (!activeIsTest && (!state || state.rolled)) {
      if (state && state.result) showFinished(activeCode, state.result);
      return;
    }

    isRolling = true;
    rollButton.disabled = true;
    rollLabel.textContent = "正在掷骰…";
    setStatus("翻滚中");
    resultCopy.textContent = "骰子正在决定结果…";
    playRollTone();
    if (navigator.vibrate) navigator.vibrate([20, 35, 20]);

    const result = randomFace();
    const duration = prefersReducedMotion ? 120 : 1450;
    const xTurns = 4 + Math.floor(Math.random() * 3);
    const yTurns = 5 + Math.floor(Math.random() * 3);
    const final = FACE_TRANSFORMS[result];

    const animation = dice.animate(
      [
        { transform: dice.style.transform || "rotateX(-14deg) rotateY(24deg)" },
        { transform: `rotateX(${xTurns * 360 + 80}deg) rotateY(${yTurns * 360 + 145}deg)` },
        { transform: final }
      ],
      { duration, easing: "cubic-bezier(.18,.72,.17,1)", fill: "forwards" }
    );

    animation.onfinish = () => {
      dice.style.transform = final;
      animation.cancel();
      const now = new Date();
      if (!activeIsTest) {
        saveState(activeCode, {
          redeemedAt: state && state.redeemedAt ? state.redeemedAt : now.toISOString(),
          rolled: true,
          result,
          rolledAt: now.toISOString()
        });
      }
      currentResult = result;
      const record = createRecord(activeCode, result, activeIsTest);
      addHistory(record);
      resultCopy.innerHTML = `本次结果：<strong>${result} 点</strong>`;
      burstParticles();
      isRolling = false;

      if (activeIsTest) {
        setStatus("测试模式", "test");
        rollLabel.textContent = "再掷一次 · 测试无限次数";
        rollButton.disabled = false;
      } else {
        setStatus("已完成", "done");
        rollLabel.textContent = "本次机会已使用";
        rollButton.disabled = true;
      }

      window.setTimeout(() => autoDownloadReceipt(record), prefersReducedMotion ? 20 : 260);
    };
  }

  form.addEventListener("submit", event => {
    event.preventDefault();
    if (input.disabled) return;
    const code = normalizeCode(input.value);
    if (!code) {
      setMessage("请输入兑换口令。", "error"); input.focus(); return;
    }
    if (!VALID_CODES.has(code)) {
      setMessage("口令无效，请检查后重新输入。", "error"); input.select(); return;
    }

    const isTest = TEST_CODES.has(code);
    if (isTest) {
      showReady(code, true);
      return;
    }

    const existing = readState(code);
    if (existing) {
      if (existing.rolled && existing.result) showFinished(code, existing.result);
      else showReady(code, false);
      return;
    }

    const ok = saveState(code, { redeemedAt: new Date().toISOString(), rolled: false, result: null });
    if (!ok) {
      setMessage("无法记录兑换状态，请刷新页面后重试。", "error"); return;
    }
    showReady(code, false);
  });

  rollButton.addEventListener("click", rollDice);

  historyList.addEventListener("click", event => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;
    const item = button.closest("[data-record-id]");
    const record = item ? getRecordById(item.dataset.recordId) : null;
    if (!record) return;
    if (button.dataset.action === "view") openReceipt(record);
  });

  document.querySelectorAll("[data-rule-src]").forEach(button => {
    button.addEventListener("click", () => openRuleImage(button.dataset.ruleSrc, button.dataset.ruleTitle || "查看原图"));
  });
  closeImage.addEventListener("click", () => imageDialog.close());
  imageDialog.addEventListener("click", event => { if (event.target === imageDialog) imageDialog.close(); });

  closeReceipt.addEventListener("click", () => receiptDialog.close());
  receiptDialog.addEventListener("click", event => { if (event.target === receiptDialog) receiptDialog.close(); });

  window.addEventListener("resize", resizeCanvas, { passive: true });

  renderHistory();
  resizeCanvas();
})();
