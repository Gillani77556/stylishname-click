# Changelog

All notable changes to this project are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/);
versioning follows [Semantic Versioning](https://semver.org/).

## [1.0.0] - 2026-11-15

First public open-source release. The style engine previously ran only
inside the StylishName.click website; it is now published in full.

### Added

- Complete style engine in `src/stylish-name.js`:
  39 alphabets, 21 frames, 5 effects — **617 styles** in total
  (39 plain + 483 framed + 95 effects)
- Per-platform fit checks (`PLATFORMS`, `fits()`, `visibleLength()`)
  for Free Fire (12), PUBG Mobile (16), Instagram (30) and TikTok (30)
- `generate()` API returning every style with per-platform fit flags
- Working browser demo in `index.html` (the GitHub Pages site)
- Node.js example in `examples/node-example.js`
- Dependency-free test suite (15 tests) in `test/stylish-name.test.js`
- MIT `LICENSE`, `CONTRIBUTING.md`, issue and pull-request templates

### Fixed

- Effect styles now actually apply their combining mark to converted
  glyphs. The website's original inline engine only marked ASCII
  letters/digits, so most of the 95 effect styles silently duplicated
  the plain style. The fix is covered by a regression test, and
  `visibleLength()` still ignores the marks, so fit checks are unchanged.

### Notes

- Style counts and glyph mappings are identical to the library that has
  been live on stylishname.click since the 617-style expansion
  (13 November 2026); the expansion alphabets (Greek, Cyrillic, Runic,
  Cherokee, Canadian, Superscript, Braille Dots, Kanji Style, Crazy,
  Keycap, Boxed, Reversed, Segmented Digits, Black Circled, Black
  Squared) were each verified glyph-by-glyph against Unicode 15.0.
