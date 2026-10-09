# ABDAN PORTFOLIO — Career Launch v1.0

A job-focused, responsive portfolio for **Abdan Syakuran**. Built with HTML, CSS, and a small amount of JavaScript. **No framework, build tools, dependencies, accounts, or running backend are required.** Intended as a credible entry point for frontend/web developer applications.

## What it includes

- A recruiter-oriented, English-language introduction
- Three working project highlights with direct demo links
- ABDAN AI shown accurately as **in development**
- Engineering decisions, technology stack, skills, and personal background
- Responsive layout, skip link, native anchors, keyboard focus, reduced-motion preference, SEO metadata, and security headers for Cloudflare Pages
- Original **CSS illustrations**, clearly identified as illustrative, not actual screenshots
- A configurable email CTA, defaulting to the known GitHub profile until a verified email is supplied
- `docs/APPLICATION-KIT.md` for job applications and a CV outline

## IMPORTANT: customize before public launch

1. **Contact:** Open `script.js` and set `CONTACT_EMAIL = 'your.real.email@example.com'`; this changes the primary contact CTA to a mailto link. Until you do, the primary CTA opens GitHub. Never publish a guessed email address.
2. **Copy:** Review all job titles, technology labels, project descriptions and current project status. They were drafted from existing project information and may need updating.
3. **URLs:** Verify all three demo URLs from your own browser. Some Cloudflare-hosted demos could not be checked with the retrieval tool during preparation.
4. **Screenshots:** Optional future enhancement: replace CSS mockups with **your own actual, optimized WebP screenshots**, which are stronger evidence for hiring managers. Avoid sharing customer data or private keys.
5. **Resume:** Link a PDF resume when you have a reviewed, verified CV ready. A fictional placeholder CV link was deliberately not included.

## Run locally (Debian / Linux)

```bash
cd ~/dev/projects/abdan-labs/abdan-portfolio
python3 -m http.server 8080
# Open http://localhost:8080
```

If you downloaded the ZIP, extract it into `~/dev/projects/abdan-labs/abdan-portfolio` first. The website is static and also opens directly as a local `index.html` file.

## Deploy to Cloudflare Pages (direct upload)

Create your own `abdan-portfolio` Pages project first using the Cloudflare dashboard or Wrangler. Then run from the project root:

```bash
npx wrangler login
npx wrangler pages project create abdan-portfolio --production-branch main
npx wrangler pages deploy . --project-name abdan-portfolio --branch main
```

**Safer upload option:** create a `dist/` folder and copy only `index.html`, `styles.css`, `script.js`, `robots.txt`, `_headers`, and `assets/favicon.svg` into it. Then deploy `dist/` instead of the repository root. This prevents deploying README and docs files or a future `.git` directory. The command to prepare `dist/` is:

```bash
bash ./scripts/build.sh
npx wrangler pages deploy dist --project-name abdan-portfolio --branch main
```

This repo includes that `scripts/build.sh` build helper and `scripts/verify.py` static checks. The provided deployment name is a **suggestion**, not a claimed registered Pages URL. Cloudflare may require you to authenticate and choose an available project name.

> Cloudflare note: A direct-upload Pages project cannot subsequently be switched to Git integration. If automatic Git-based deployments are important from day one, create the project with Git integration instead.

Cloudflare documentation: https://developers.cloudflare.com/pages/get-started/direct-upload/

## Project presentation standards

- Microbusiness Operator: offline-first, local storage, backup, sales and receivables; **not marketed as AI-powered in the current MVP**.
- School Website: public source: https://github.com/abdanfx/school-website
- ABDAN Weather: a live prototype, no claim of predictive ML model or real-time radar.
- ABDAN AI: actively developed OpenAI API product; no finished-product claims and no public link unless one is separately verified.
- No invented outcomes, user counts, revenue, Lighthouse scores, or testimonials.

## Structure

```text
index.html              page content + accessible markup
styles.css              design system and responsive CSS
script.js               email CTA + navigation enhancement
assets/favicon.svg      compact original brand icon
_headers                Cloudflare Pages response security headers
robots.txt              crawler directive
scripts/build.sh        prepare safe deploy artifact
scripts/verify.py       validation checks
docs/APPLICATION-KIT.md job-search positioning & templates
```

## Ownership

© 2026 Abdan Syakuran / ABDAN LABS. Adapt for your own personal portfolio. Project showcase links point to separate apps with their own terms and privacy boundaries.

## Testing

```bash
python3 scripts/verify.py   # dependency-free static checks
python3 scripts/browser-check.py  # optional: requires Playwright + Chromium
```

The optional browser test uses browser-injected static HTML/CSS/JS for sandbox compatibility. It confirms responsive layouts and behavior but does **not** replace a live HTTP/Cloudflare deployment test.
