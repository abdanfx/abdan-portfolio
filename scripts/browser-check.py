#!/usr/bin/env python3
"""Optional browser smoke tests; needs pip install playwright and a Chromium browser."""
import contextlib
from pathlib import Path
import socket
import subprocess
import time
from playwright.sync_api import sync_playwright

root = Path(__file__).resolve().parents[1]
with socket.socket() as s:
    s.bind(('127.0.0.1', 0))
    port = s.getsockname()[1]
server = subprocess.Popen(['python3', '-m', 'http.server', str(port), '--bind', '127.0.0.1'], cwd=root, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
try:
    time.sleep(.4)
    with sync_playwright() as p:
        browser = p.chromium.launch(executable_path='/usr/bin/chromium', headless=True, args=['--no-sandbox'])
        for name, w, h in [('desktop', 1440, 900), ('tablet', 768, 1024), ('android', 390, 844), ('small-mobile', 320, 720)]:
            page = browser.new_page(viewport={'width': w, 'height': h}, device_scale_factor=1)
            errs = []
            page.on('pageerror', lambda e: errs.append(str(e)))
            page.set_content((root / 'index.html').read_text(), wait_until='load')
            page.add_style_tag(content=(root / 'styles.css').read_text())
            page.add_script_tag(content=(root / 'script.js').read_text())
            assert page.title() == 'Abdan Syakuran — Frontend Developer & Product Builder'
            assert page.locator('h1').count() == 1
            assert page.locator('.project-card').count() == 4
            assert page.locator('a[href*="github.com/abdanfx/school-website"]').count() == 1
            assert page.locator('#contact-primary').get_attribute('href') == 'https://github.com/abdanfx'
            dims = page.evaluate('({viewport: document.documentElement.clientWidth, page: document.documentElement.scrollWidth, body: document.body.scrollWidth})')
            assert dims['page'] <= dims['viewport'] + 1, f'{name} horizontal document overflow: {dims}'
            assert not errs, f'{name} JS errors: {errs}'
            if name in ('desktop', 'android'):
                page.screenshot(path=f'/mnt/data/abdan-portfolio-{name}.png', full_page=True)
            print(f'PASS — {name} {w}×{h}, 4 project cards, 0 JS errors, no horizontal overflow')
            page.close()
        reduced = browser.new_page(reduced_motion='reduce')
        reduced.set_content((root / 'index.html').read_text())
        reduced.add_style_tag(content=(root / 'styles.css').read_text())
        assert reduced.evaluate('matchMedia("(prefers-reduced-motion: reduce)").matches')
        print('PASS — reduced-motion browser preference')
        browser.close()
finally:
    server.terminate()
    with contextlib.suppress(Exception): server.wait(timeout=4)
