#!/usr/bin/env python3
"""Zero-dependency validation for the ABDAN PORTFOLIO static site."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
html = (ROOT / 'index.html').read_text(encoding='utf-8')
css = (ROOT / 'styles.css').read_text(encoding='utf-8')
js = (ROOT / 'script.js').read_text(encoding='utf-8')

class Audit(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.ids = set()
        self.hrefs = []
        self.images = []
        self.links = []
        self.heading_levels = []
        self.errors = []
        self.sections = []
        self.main_count = 0

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if 'id' in a:
            if a['id'] in self.ids:
                self.errors.append(f'Duplicate ID: {a["id"]}')
            self.ids.add(a['id'])
        if tag == 'main':
            self.main_count += 1
        if re.fullmatch(r'h[1-6]', tag):
            self.heading_levels.append(int(tag[1]))
        if tag == 'section':
            self.sections.append(a.get('id'))
        if tag == 'a':
            self.hrefs.append(a.get('href'))
            if a.get('target') == '_blank':
                rel = set((a.get('rel') or '').split())
                if not {'noopener', 'noreferrer'}.issubset(rel):
                    self.errors.append(f'External target missing rel: {a.get("href")}')
        if tag in ('link', 'script'):
            self.links.append(a.get('href') or a.get('src'))
        if tag == 'img':
            self.images.append(a)

audit = Audit()
audit.feed(html)
errors = list(audit.errors)
assert_true = lambda test, why: errors.append(why) if not test else None
assert_true(audit.main_count == 1, 'Exactly one main element required')
assert_true(audit.heading_levels.count(1) == 1, 'Exactly one H1 required')
assert_true(all(i in audit.ids for i in ('main', 'work', 'expertise', 'about', 'contact')), 'Missing named section')
assert_true('<meta name="description"' in html, 'Missing SEO description')
assert_true('prefers-reduced-motion: reduce' in css, 'Missing reduced-motion support')
assert_true('focus-visible' in css, 'Missing keyboard focus CSS')
assert_true('.brand-symbol { display: flex; align-items: center; justify-content: center;' in css, 'Navbar logo must align its lettermark horizontally')
assert_true('portfolio-enter' in css and 'motion-pending.motion-visible' in css, 'Editorial motion styles missing')
assert_true('prefers-reduced-motion: no-preference' in css, 'Motion must be opt-in')
assert_true('const reduceMotion' in js and 'revealObserver.unobserve' in js, 'One-time reduced-motion-aware reveal missing')
assert_true("const CONTACT_EMAIL = 'abdansyakuran@hotmail.com';" in js, 'Professional email not configured')
assert_true('href="mailto:abdansyakuran@hotmail.com?subject=Portfolio%20inquiry"' in html, 'No-JS email link missing')
assert_true('Email: abdansyakuran@hotmail.com' in html, 'Visible contact email missing')
assert_true('Illustrative product interface' in html and 'Illustrative product direction' in html, 'Missing illustrative preview disclosures')
assert_true('https://github.com/abdanfx/school-website' in html, 'Missing public school repo')
assert_true((ROOT / '_headers').exists(), 'Missing security headers')
assert_true((ROOT / 'assets/favicon.svg').exists(), 'Missing favicon')
assert_true(css.count('{') == css.count('}'), 'Unbalanced CSS braces')
assert_true(not re.search(r'javascript:\s*', html, re.I), 'Dangerous link scheme')
for href in audit.hrefs + audit.links:
    if not href or href.startswith(('mailto:', 'https://', 'http://')):
        continue
    if href.startswith('#'):
        assert_true(href[1:] in audit.ids, f'Broken internal anchor: {href}')
    else:
        assert_true((ROOT / href.lstrip('./')).exists(), f'Missing local asset: {href}')
for img in audit.images:
    assert_true('alt' in img, 'Image missing alt text')
for f in ('index.html', 'styles.css', 'script.js', 'assets/favicon.svg'):
    assert_true((ROOT / f).stat().st_size > 0, f'Empty file: {f}')
if errors:
    print(f'FAIL: {len(errors)} issue(s)')
    for error in errors: print(' -', error)
    sys.exit(1)
print('PASS — semantic HTML, IDs/anchors, assets, external link security, reduced motion, metadata, project links, CSS structure')
print(f'PASS — {len(audit.sections)} sections, {len(audit.hrefs)} links, {len(audit.heading_levels)} headings checked')
