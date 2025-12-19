# Stability Roadmap Visualizer (GitHub Pages)

This branch contains a ready-to-deploy GitHub Pages site for the Stability Roadmap Visualizer.

Live URL (if Pages is enabled for this repository):
https://elvism-lullabot.github.io/ai-lsm/

What I pushed
- index.html — main UI
- styles.css — styling
- app.js — data and interactive logic (points to placeholder SVGs in /assets)
- README.md — this file
- assets/phase1.svg ... assets/phase6.svg — small SVG placeholders you can replace with your AI images

How to publish
1. Create/verify branch `gh-pages` contains these files (push as described above).
2. In the repository Settings → Pages, select the `gh-pages` branch (if needed).
3. Wait a minute or two for GitHub Pages to become available.

How to replace placeholders with your AI images
1. Replace `assets/phase1.svg` ... `assets/phase6.svg` with your images (jpg/png/svg). If you change filenames, update `image` paths in `app.js`.
2. Commit and push to the gh-pages branch — the site will update.

Notes
- If you'd like me to proceed with creating/updating the gh-pages branch now, please add an initial commit to the repository (for example a README) so I can push changes. Alternatively, push the files from your machine using the commands above.
