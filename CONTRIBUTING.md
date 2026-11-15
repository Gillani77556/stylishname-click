# Contributing to Stylish Name Generator

Thanks for helping! This project is maintained by one person and used by a
live website, so contributions are reviewed for correctness first — a wrong
glyph ships to real users.

## Getting set up

```bash
git clone https://github.com/Gillani77556/stylishname-click.git
cd stylishname-click
npm test        # no install step — there are no dependencies
```

Open `index.html` in a browser to try the demo.

## Ways to contribute

- **New alphabet / frame / effect** — the most valuable kind of PR
- **Platform limit updates** — include a link to the platform's official
  documentation or a dated in-app screenshot description
- **Bug reports** — use the bug report template; include the input text,
  the style label, what you got and what you expected
- **Demo improvements** — accessibility and mobile fixes are very welcome

## Rules for new alphabets

1. **Verify every glyph.** Each of the 26 uppercase, 26 lowercase and
   (where they exist) 10 digit glyphs must be a real, named Unicode
   character. Say in the PR how you verified them (for example Python's
   `unicodedata` module).
2. **Unicase sets are fine.** If a script has one case (Runic, Braille,
   Cherokee-style sets), pass the same array for upper and lower, like the
   existing `SMALLCAPS` / `RUNIC` definitions do.
3. **Missing digits pass through.** If a set has no digits, pass `null` —
   never invent digit glyphs.
4. **Update the counts together.** A new alphabet changes the totals:
   plain styles grow by 1, and framed/effect totals grow if the alphabet
   joins `FRAME_ALPHABETS` / `EFFECT_ALPHABETS`. Update the numbers in
   `README.md`, the header comment in `src/stylish-name.js`, and the
   count test in `test/stylish-name.test.js` in the same PR.
5. **Add a test** showing one known conversion for your alphabet.

## Pull request checklist

- [ ] `npm test` passes
- [ ] Style counts in README, source header and tests all agree
- [ ] No new dependencies (this is a zero-dependency project)
- [ ] One change per PR where possible

## Code style

Plain ES2017 JavaScript, no build step, no transpiler. The library must keep
working as a single file loaded by a `<script>` tag, so no `import`/`export`
syntax in `src/stylish-name.js` — use the export block at the bottom.
