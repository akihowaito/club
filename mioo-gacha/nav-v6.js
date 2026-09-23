/* Selected state follows both taps and the visible section; works without external libraries. */
(() => {
  'use strict';
  const links = [...document.querySelectorAll('.mobile-nav a[href^="#"]')];
  const sections = links.map(link => document.getElementById(link.hash.slice(1)));
  if (!links.length || sections.some(section => !section)) return;
  let pending = false;
  function select(index) {
    links.forEach((link, i) => {
      link.classList.toggle('is-active', i === index);
      if (i === index) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
  }
  function activeFromScroll() {
    pending = false;
    // Use the bottom tab bar and the header as natural visible-area limits.
    const trigger = Math.min(180, window.innerHeight * .34);
    let index = 0;
    sections.forEach((section, i) => {
      if (section.getBoundingClientRect().top <= trigger) index = i;
    });
    const atEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8;
    if (atEnd) index = sections.length - 1;
    select(index);
  }
  function schedule() {
    if (pending) return;
    pending = true;
    requestAnimationFrame(activeFromScroll);
  }
  links.forEach((link, i) => link.addEventListener('click', () => {
    select(i); // Show the touch feedback immediately, before smooth scrolling finishes.
    // Scrolling and hash changes will update the state as the target comes into view.
  }));
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });
  window.addEventListener('hashchange', schedule);
  activeFromScroll();
})();
