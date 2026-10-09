# ABDAN PORTFOLIO

**Abdan Syakuran** (`abdanfx`) · **ABDAN LABS** · Indonesia

A responsive, recruiter-focused engineering portfolio showcasing practical web applications, offline-first software, weather integration, and ongoing AI product work.

**[Live portfolio](https://abdan-portfolio.pages.dev/)** · [GitHub](https://github.com/abdanfx) · [Email](mailto:abdansyakuran@hotmail.com)

## Featured projects

| Project | Status | Engineering focus |
| --- | --- | --- |
| [Microbusiness Operator](https://abdan-microbusiness-operator-staging.pages.dev/) | Offline-first MVP / pilot staging; source private | Sales, payments, expenses, receivables, local persistence, backup and recovery; TypeScript, IndexedDB/Dexie, PWA |
| [SMP Tahfizh Quran Fantastis school website](https://school-website-h15.pages.dev/) | Live production website; [public source](https://github.com/abdanfx/school-website) | Responsive HTML, CSS, JavaScript, accessible editorial motion and verification |
| [ABDAN WEATHER](https://abdan-weather-zero-cost-v01.abdansyakuran.workers.dev/) | Live MVP prototype | Weather-provider APIs, forecast and warning handling, data freshness, Cloudflare Workers |
| ABDAN AI | Active R&D; no public demo linked | OpenAI API integration, conversation workflows, responsive chat interfaces and iterative verification |

The current Microbusiness Operator MVP should not be marketed as AI-powered. ABDAN WEATHER does not claim predictive machine learning or radar. ABDAN AI remains under development. No unverified customer counts, performance results, or commercial outcomes are claimed.

## Product storytelling motion

The four project cards contain **illustrative**, lightweight interface animations:

- **Microbusiness:** fictional sale entry → simulated save → dashboard and chart.
- **School website:** heading → decorative line → editorial content reveal.
- **ABDAN WEATHER:** sample forecast → curve drawing → illustrative indicators.
- **ABDAN AI:** sample prompt → simulated processing → fictional response (no API call).

Each plays automatically once upon entering view, keeps its completed state visible, and offers a keyboard-accessible **Replay demo** control. Motion respects `prefers-reduced-motion`, and meaningful content remains visible with JavaScript disabled. The previews are original CSS/HTML illustrations, **not actual application screenshots, recorded transactions, or live API responses**.

## Technical approach

- Semantic HTML, CSS and vanilla JavaScript; no framework or animation package needed for the portfolio.
- Responsive layout, skip link, keyboard focus, accessible controls and reduced-motion support.
- CSS transforms/keyframes and `IntersectionObserver` for restrained, one-time animations.
- Python static verification, JavaScript syntax checks and manual Firefox desktop/mobile acceptance.
- Cloudflare Pages direct-upload hosting with `_headers` security configuration.

## Run locally

```bash
git clone https://github.com/abdanfx/abdan-portfolio.git
cd abdan-portfolio
python3 -B -m http.server 8765 --bind 127.0.0.1
```

Open http://127.0.0.1:8765/ and stop the server with `Ctrl+C`.

## Verification

```bash
node --check script.js
python3 -B scripts/verify.py
```

Optional `python3 -B scripts/browser-check.py` uses Playwright/Chromium when available. Automated static or browser checks do not replace testing the actual deployment.

## Deployment

**Production:** https://abdan-portfolio.pages.dev/ — Cloudflare Pages direct upload. The M2.2 release was manually accepted on 9 October 2026.

Upload **public assets only**, not `.git`, internal docs or other repository files. The repository includes `scripts/build.sh`, which recreates `dist/` (removing a preexisting `dist/` folder):

```bash
bash scripts/build.sh
npx wrangler pages deploy dist --project-name abdan-portfolio --branch main
```

Cloudflare Pages is managed by **direct uploads**, not automatic Git-based deployment. A README-only commit does not require redeploying the website.

## Repository structure

```text
index.html                  Portfolio content and illustrations
styles.css                  Design system, responsive layout and motion
script.js                   Contact behavior and motion lifecycle
assets/favicon.svg         Original portfolio favicon
_headers                   Cloudflare Pages security headers
robots.txt                 Crawler directives
scripts/verify.py          Static checks
scripts/browser-check.py   Optional browser checks
scripts/build.sh           Public asset packaging
docs/APPLICATION-KIT.md   Job application preparation
```

## Git history and ownership

The repository preserves both modern portfolio milestones and the original GitHub portfolio history. The older version is also accessible from [`legacy/github-original-20261009`](https://github.com/abdanfx/abdan-portfolio/tree/legacy/github-original-20261009).

Built and maintained by **Abdan Syakuran / ABDAN LABS**. Project maturity and source visibility vary as noted above.
