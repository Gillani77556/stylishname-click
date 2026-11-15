# Stylish Name Generator — 617 Unicode Styles, Open Source

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Tests](https://img.shields.io/badge/tests-15%20passing-brightgreen.svg)](#running-the-tests)
[![Dependencies](https://img.shields.io/badge/dependencies-0-brightgreen.svg)](package.json)

Type any name and get **617 decorated Unicode styles** — blackletter, script,
framed and gaming styles — each with a **live fit check** showing whether it
fits the character limit of Free Fire, PUBG Mobile, Instagram or TikTok.
No sign-up, no server, no tracking: everything runs locally in your browser
or in Node.js.

**Live tool:** https://www.stylishname.click/
**Browser demo (GitHub Pages):** https://gillani77556.github.io/stylishname-click/

```text
Input:  Ali
Output: 𝐀𝐥𝐢            (Bold — fits Free Fire, PUBG, Instagram, TikTok)
        𝒜𝓁𝒾            (Script)
        ꧁༒𝐀𝐥𝐢༒꧂        (Dragon Gate · Bold)
        𝐀̶𝐥̶𝐢̶            (Strikethrough · Bold)  …and 613 more
```

## Why this project exists

Gaming and social platforms limit name length, and most fancy-text generators
ignore that — you copy a beautiful name and the game rejects it. This library
pairs every style with the platform limits, so a style is only recommended
when it actually fits. The style engine powers
[StylishName.click](https://www.stylishname.click/) and is released here, in
full, so anyone can reuse the Unicode mappings and fit-check logic.

## Features

- **617 styles** = 39 alphabets + 483 framed styles (21 frames × 23 alphabets)
  + 95 effect styles (5 effects × 19 alphabets)
- **Per-platform fit checks** — Free Fire (12), PUBG Mobile (16),
  Instagram (30), TikTok (30); combining marks are not counted as characters
- **Zero dependencies**, a single source file (`src/stylish-name.js`, ~15 KB)
- Works in **Node.js** (CommonJS), **AMD**, and as a plain browser global
- Unicode-correct: conversions iterate by code point, so astral-plane glyphs
  (mathematical alphanumeric symbols, keycap marks) never split into
  broken surrogate pairs
- Test suite included (`npm test`) — style counts, conversions, fit checks

## Quick start

### Node.js

```js
const StylishName = require('./src/stylish-name.js');

// Every style for a name, each with per-platform fit flags
const results = StylishName.generate('Ali');
console.log(results.length);      // 617
console.log(results[0]);          // { label: 'Bold', category: 'fonts gaming',
//                                     text: '𝐀𝐥𝐢',
//                                     fits: { freefire: true, pubg: true,
//                                             instagram: true, tiktok: true } }

// Only the styles that fit Free Fire's 12-character limit
const fitsFreeFire = results.filter((s) => s.fits.freefire);

// One style at a time
const bold = StylishName.buildStyles().find((s) => s.label === 'Bold');
console.log(bold.make('Ali'));    // 𝐀𝐥𝐢

// Fit check any text yourself
StylishName.fits('꧁༒𝐀𝐥𝐢༒꧂', 'pubg');   // true
StylishName.visibleLength('𝐀𝐥𝐢');          // 3
```

Run the bundled example:

```bash
npm run demo          # or: node examples/node-example.js "YourName"
```

### Browser

```html
<script src="src/stylish-name.js"></script>
<script>
  const results = window.StylishName.generate('Ali');
  document.title = results[0].text;
</script>
```

Or just open `index.html` in a browser — it is a complete working demo
(input, platform filter, one-tap copy) built only on this library.

## API

| Function / property | Description |
| --- | --- |
| `generate(name)` | All 617 styles for `name`: `{ label, category, text, fits }` where `fits` maps each platform key to `true`/`false` |
| `buildStyles()` | The raw style list: `{ label, cat, make(text) }` |
| `convert(text, def)` | Convert text with one alphabet definition |
| `effect(text, mark)` | Add a combining mark (e.g. strikethrough) after each letter/digit |
| `fits(text, platform)` | `true` if `text` fits the platform limit; throws on unknown platform |
| `visibleLength(text)` | Length in code points, ignoring combining marks (U+0300–U+036F) |
| `ALPHABETS` / `FRAMES` / `EFFECTS` | The underlying data tables (39 / 21 / 5) |
| `PLATFORMS` | `{ freefire: 12, pubg: 16, instagram: 30, tiktok: 30 }` with labels |

## Platform limits used

| Platform | Key | Max characters |
| --- | --- | --- |
| Free Fire | `freefire` | 12 |
| PUBG Mobile | `pubg` | 16 |
| Instagram | `instagram` | 30 |
| TikTok | `tiktok` | 30 |

Limits live in one place (`PLATFORMS` in `src/stylish-name.js`) — if a
platform changes its limit, send a pull request with a source link.

## Running the tests

```bash
npm test
```

The suite has no dependencies and checks the exact style count (617),
unique labels, known conversions (Bold, Script exceptions, Upside Down,
Reversed), framed/effect composition, and the fit-check rules.

## Project structure

```
.
├── index.html                  # Working browser demo (GitHub Pages)
├── src/
│   └── stylish-name.js         # The whole library — data + engine + API
├── examples/
│   └── node-example.js         # Node.js usage example
├── test/
│   └── stylish-name.test.js    # Dependency-free test suite
├── CHANGELOG.md
├── CONTRIBUTING.md
└── LICENSE                     # MIT
```

## Contributing

Contributions are welcome — new alphabets, new frames, platform-limit
updates, bug fixes and translations of the demo. Please read
[CONTRIBUTING.md](CONTRIBUTING.md) first. The short version: every new
alphabet must be Unicode-verified glyph by glyph, the style count in this
README and the tests must be updated together, and `npm test` must pass.

## License

[MIT](LICENSE) © 2026 Usman Syed. Use it in your own projects, commercial
or not — just keep the copyright notice.

## Maintainer

Maintained by **Usman Syed** ([@Gillani77556](https://github.com/Gillani77556)),
creator of [StylishName.click](https://www.stylishname.click/) — Semantic SEO
specialist, content writer and web developer based in Pakistan.
