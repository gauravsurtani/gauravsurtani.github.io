# Prints the HTML on stdin to a one-page US Letter PDF with Playwright's Chromium.
# Usage: python3 scripts/resume/print.py out.pdf < resume.html  (build.mjs calls it)
import sys

from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.set_content(sys.stdin.read(), wait_until="load")
    page.pdf(
        path=sys.argv[1],
        prefer_css_page_size=True,  # @page in build.mjs sets letter and the margins
        scale=0.9484,  # the scale of the old Chrome export: a 749px layout on the 7.4in text width
        tagged=True,
    )
    browser.close()
