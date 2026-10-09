#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
rm -rf dist
mkdir -p dist/assets
cp index.html styles.css script.js robots.txt _headers dist/
cp assets/favicon.svg dist/assets/favicon.svg
printf 'PASS — dist/ created with five approved root files and one asset.\n'
