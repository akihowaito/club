(() => {
  'use strict';
  const root = document.documentElement;
  const bgm = document.getElementById('bgMusic');
  const soundBtn = document.getElementById('soundBtn');
  const volume = document.getElementById('musicVolume');
  const volumeValue = document.getElementById('volumeValue');
  const heroVideo = document.querySelector('.hero-video');
  let bgLoaded = false;

  function volumeNumber() {
    return Math.max(0, Math.min(1, Number(volume?.value ?? 20) / 100));
  }
  function syncVolume() {
    if (!bgm) return;
    bgm.volume = volumeNumber();
    bgm.muted = false;
    const pct = Math.round(bgm.volume * 100) + '%';
    if (volumeValue) volumeValue.textContent = pct;
    if (volume) volume.setAttribute('aria-valuetext', pct);
  }
  function isEnabled() {
    return !soundBtn || soundBtn.getAttribute('aria-pressed') !== 'false';
  }
  async function tryPlayMusic() {
    if (!bgm || !isEnabled()) return;
    syncVolume();
    try { await bgm.play(); } catch (_) {}
  }
  function syncMusicState() {
    if (!bgm) return;
    if (isEnabled()) tryPlayMusic();
    else bgm.pause();
  }
  function enableAnimatedBackground() {
    if (bgLoaded) return;
    bgLoaded = true;
    root.classList.add('bg-animated');
  }
  function startMediaFromGesture() {
    tryPlayMusic();
    if (heroVideo) {
      heroVideo.muted = true;
      heroVideo.defaultMuted = true;
      heroVideo.volume = 0;
      heroVideo.play().catch(() => {});
    }
  }

  syncVolume();
  if (heroVideo) {
    heroVideo.muted = true;
    heroVideo.defaultMuted = true;
    heroVideo.volume = 0;
    heroVideo.setAttribute('playsinline','');
    heroVideo.setAttribute('webkit-playsinline','');
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) heroVideo.play().catch(() => {});
          else heroVideo.pause();
        }
      }, { threshold: .08 });
      observer.observe(heroVideo);
    }
  }

  volume?.addEventListener('input', () => {
    syncVolume();
    if (isEnabled()) tryPlayMusic();
  });
  soundBtn?.addEventListener('click', () => queueMicrotask(syncMusicState));

  ['pointerdown','touchstart','keydown'].forEach(type => {
    window.addEventListener(type, startMediaFromGesture, { once:true, passive:true });
  });

  const startBackground = () => {
    if (bgLoaded) return;
    if ('requestIdleCallback' in window) requestIdleCallback(enableAnimatedBackground, { timeout: 1800 });
    else setTimeout(enableAnimatedBackground, 900);
  };
  // Prioritize the HERO MP4 first. The animated GIF background starts after the video
  // can play, or after a delayed fallback if the browser/network is slow.
  if (heroVideo) {
    heroVideo.addEventListener('canplay', () => setTimeout(startBackground, 700), { once:true });
    heroVideo.load();
    heroVideo.play().catch(() => {});
    setTimeout(startBackground, 4500);
  } else if (document.readyState === 'complete') {
    startBackground();
  } else {
    window.addEventListener('load', startBackground, { once:true });
  }

  tryPlayMusic();

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      heroVideo?.pause();
      bgm?.pause();
      root.classList.remove('bg-animated');
    } else {
      if (bgLoaded) root.classList.add('bg-animated');
      if (heroVideo) heroVideo.play().catch(() => {});
      syncMusicState();
    }
  });
})();