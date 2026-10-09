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
})();
