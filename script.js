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
  // M2.2-B: deterministic fictional sale; no API, storage, or transaction writes.
  const story = document.querySelector('[data-story="microbusiness"]');
  if (story) {
    const replay = story.querySelector('[data-story-replay]');
    const sale = story.querySelector('.business-sale-demo');
    const storyMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (replay && sale) {
      story.dataset.storyState = 'complete'; // progressive-enhancement default
      replay.hidden = storyMotion.matches;

      const playStory = () => {
        if (storyMotion.matches) {
          story.dataset.storyState = 'complete';
          return;
        }
        // Rewind the finite CSS timeline; one layout read only on user replay/start.
        story.dataset.storyState = 'complete';
        void sale.offsetWidth;
        story.dataset.storyState = 'playing';
      };

      replay.addEventListener('click', playStory);
      sale.addEventListener('animationend', (event) => {
        if (event.target === sale && event.animationName === 'business-sale-step') {
          story.dataset.storyState = 'complete';
        }
      });

      if ('IntersectionObserver' in window && !storyMotion.matches) {
        const storyObserver = new IntersectionObserver((entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            storyObserver.unobserve(story);
            playStory();
          }
        }, { threshold: 0.2, rootMargin: '0px 0px -8% 0px' });
        storyObserver.observe(story);
      }
      // If IntersectionObserver is missing, final state and manual Replay still work.
      storyMotion.addEventListener('change', (event) => {
        if (event.matches) story.dataset.storyState = 'complete';
        replay.hidden = event.matches;
      });
    }
  }

  // M2.2-C: three independent illustrative stories, sharing one visibility observer.
  // The M2.2-B Microbusiness controller remains unchanged.
  const extraStories = [...document.querySelectorAll('[data-story="school"], [data-story="weather"], [data-story="ai"]')];
  if (extraStories.length === 3) {
    const storyReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const storyTimelines = {
      school: { stage: '.school-ui', animation: 'school-story-timeline' },
      weather: { stage: '.weather-ui', animation: 'weather-story-timeline' },
      ai: { stage: '.ai-ui', animation: 'ai-story-timeline' }
    };
    let storyObserver = null;
    const playExtraStory = (root, stage) => {
      if (storyReduce.matches) { root.dataset.storyState = 'complete'; return; }
      root.dataset.storyState = 'complete';
      void stage.offsetWidth; // Single restart flush, no per-frame JS.
      root.dataset.storyState = 'playing';
    };

    extraStories.forEach((root) => {
      const replay = root.querySelector('[data-story-replay]');
      const config = storyTimelines[root.dataset.story];
      const stage = config && root.querySelector(config.stage);
      if (!replay || !stage) return;
      root.dataset.storyState = 'complete';
      replay.hidden = storyReduce.matches;
      replay.addEventListener('click', () => playExtraStory(root, stage));
      stage.addEventListener('animationend', (event) => {
        if (event.target === stage && event.animationName === config.animation) {
          root.dataset.storyState = 'complete';
        }
      });
    });

    if ('IntersectionObserver' in window && !storyReduce.matches) {
      storyObserver = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          storyObserver.unobserve(entry.target); // one automatic playback per card
          const config = storyTimelines[entry.target.dataset.story];
          const stage = config && entry.target.querySelector(config.stage);
          if (stage) playExtraStory(entry.target, stage);
        }
      }, { threshold: 0.24, rootMargin: '0px 0px -8% 0px' });
      extraStories.forEach((root) => storyObserver.observe(root));
    }
    // Without IntersectionObserver, the complete mockups remain visible, and manual Replay works.
    storyReduce.addEventListener('change', (event) => {
      if (event.matches && storyObserver) { storyObserver.disconnect(); storyObserver = null; }
      extraStories.forEach((root) => {
        const replay = root.querySelector('[data-story-replay]');
        root.dataset.storyState = 'complete';
        if (replay) replay.hidden = event.matches;
      });
      // Deliberately do not restart auto-play when reduced motion is turned off.
    });
  }

})();
