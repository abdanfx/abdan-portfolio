/** ABDAN PORTFOLIO — progressive enhancements only. Main content works without JS. */
(() => {
  'use strict';

  // Set your email here before going public, e.g. 'contact@example.com'.
  // Leave as an empty string to keep the GitHub contact button instead.
  const CONTACT_EMAIL = 'abdansyakuran@hotmail.com';

  const year = document.getElementById('copyright-year');
  if (year) year.textContent = String(new Date().getFullYear());

  if (CONTACT_EMAIL && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(CONTACT_EMAIL)) {
    const primary = document.getElementById('contact-primary');
    const note = document.getElementById('contact-note');
    if (primary) {
      primary.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Opportunity to collaborate — ABDAN PORTFOLIO')}`;
      primary.removeAttribute('target');
      primary.removeAttribute('rel');
      primary.innerHTML = 'Send me an email <span aria-hidden="true">↗</span>';
    }
    if (note) { note.textContent = `Email: ${CONTACT_EMAIL}`; note.hidden = false; }
  }

  // Navigation uses real anchors; this only adds an unobtrusive active marker.
  const links = [...document.querySelectorAll('.site-nav a[href^="#"]')];
  if ('IntersectionObserver' in window && links.length) {
    const sections = [...document.querySelectorAll('main section[id]')];
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      links.forEach(link => {
        if (link.getAttribute('href') === `#${visible.target.id}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }, { rootMargin: '-15% 0px -55% 0px', threshold: [0, 0.25, 0.5] });
    sections.forEach(section => observer.observe(section));
  }
  // M2.1: progressive one-time entrances; no content is hidden without JS.
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion) {
    document.documentElement.classList.add('motion-enabled');
    if ('IntersectionObserver' in window) {
      const targets = document.querySelectorAll(
        '.section-head, .project-card, .expertise-card, .method-layout, .about-layout, .contact-inner'
      );
      const revealObserver = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('motion-visible');
          revealObserver.unobserve(entry.target);
        }
      }, { threshold: 0.07, rootMargin: '0px 0px -8% 0px' });
      targets.forEach(target => {
        // Do not hide any item already visible on initial load or refresh.
        if (target.getBoundingClientRect().top > window.innerHeight * 0.95) {
          target.classList.add('motion-pending');
          revealObserver.observe(target);
        }
      });
    }
  }
})();
