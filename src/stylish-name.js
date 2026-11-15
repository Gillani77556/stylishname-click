/**
 * stylish-name-generator — a free, open-source Unicode stylish name generator.
 *
 * Converts plain text into 617 decorated styles (39 alphabets, 21 frames x 23
 * alphabets, 5 effects x 19 alphabets) and checks each result against the
 * character limits of popular platforms (Free Fire, PUBG Mobile, Instagram,
 * TikTok). No dependencies, no network calls, no tracking — everything runs
 * locally in the browser or in Node.js.
 *
 * Live tool: https://www.stylishname.click/
 * Repository: https://github.com/Gillani77556/stylishname-click
 * License: MIT — Copyright (c) 2026 Usman Syed
 */
'use strict';
var StylishName = (function () {
function rng(A, a, d, exc) { return { t: 'r', A: A, a: a, d: d, exc: exc || {}};}
function map(m, rev) { return { t: 'm', map: m, rev:!!rev};}
function buildMap(upper, lower, digits) {
var m = {}, U = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', L = 'abcdefghijklmnopqrstuvwxyz', D = '0123456789', i;
if (upper) for (i = 0; i < 26; i++) m[U[i]] = upper[i];
if (lower) for (i = 0; i < 26; i++) m[L[i]] = lower[i];
if (digits) for (i = 0; i < 10; i++) m[D[i]] = digits[i];
return m;
}
var SMALLCAPS = map(buildMap(['ᴀ','ʙ','ᴄ','ᴅ','ᴇ','ꜰ','ɢ','ʜ','ɪ','ᴊ','ᴋ','ʟ','ᴍ','ɴ','ᴏ','ᴘ','ǫ','ʀ','ꜱ','ᴛ','ᴜ','ᴠ','ᴡ','x','ʏ','ᴢ'],
['ᴀ','ʙ','ᴄ','ᴅ','ᴇ','ꜰ','ɢ','ʜ','ɪ','ᴊ','ᴋ','ʟ','ᴍ','ɴ','ᴏ','ᴘ','ǫ','ʀ','ꜱ','ᴛ','ᴜ','ᴠ','ᴡ','x','ʏ','ᴢ'], null));
var FLIP = map(buildMap(
['∀','𐐒','Ɔ','ᗡ','Ǝ','Ⅎ','⅁','H','I','ſ','ꓘ','⅂','W','N','O','Ԁ','Ό','ᴚ','S','⊥','∩','Λ','M','X','⅄','Z'],
['ɐ','q','ɔ','p','ǝ','ɟ','ɓ','ɥ','ı','ɾ','ʞ','l','ɯ','u','o','d','b','ɹ','s','ʇ','n','ʌ','ʍ','x','ʎ','z'],
['0','Ɩ','ᄅ','Ɛ','ㄣ','ϛ','9','ㄥ','8','6']), true);
var LEET = map(buildMap(null,
['4','b','c','d','3','f','g','h','1','j','k','l','m','n','0','p','q','r','5','7','u','v','w','x','y','2'], null));
var SUPERSCRIPT = map(buildMap(['ᵃ','ᵇ','ᶜ','ᵈ','ᵉ','ᶠ','ᵍ','ʰ','ᶦ','ʲ','ᵏ','ˡ','ᵐ','ⁿ','ᵒ','ᵖ','𐞥','ʳ','ˢ','ᵗ','ᵘ','ᵛ','ʷ','ˣ','ʸ','ᶻ'],
['ᵃ','ᵇ','ᶜ','ᵈ','ᵉ','ᶠ','ᵍ','ʰ','ᶦ','ʲ','ᵏ','ˡ','ᵐ','ⁿ','ᵒ','ᵖ','𐞥','ʳ','ˢ','ᵗ','ᵘ','ᵛ','ʷ','ˣ','ʸ','ᶻ'],
['⁰','¹','²','³','⁴','⁵','⁶','⁷','⁸','⁹']));
var BRAILLE = map(buildMap(['⠁','⠃','⠉','⠙','⠑','⠋','⠛','⠓','⠊','⠚','⠅','⠇','⠍','⠝','⠕','⠏','⠟','⠗','⠎','⠞','⠥','⠧','⠺','⠭','⠽','⠵'],
['⠁','⠃','⠉','⠙','⠑','⠋','⠛','⠓','⠊','⠚','⠅','⠇','⠍','⠝','⠕','⠏','⠟','⠗','⠎','⠞','⠥','⠧','⠺','⠭','⠽','⠵'],
['⠚','⠁','⠃','⠉','⠙','⠑','⠋','⠛','⠓','⠊']));
var RUNIC = map(buildMap(['ᚨ','ᛒ','ᚲ','ᛞ','ᛖ','ᚠ','ᚷ','ᚺ','ᛁ','ᛃ','ᚴ','ᛚ','ᛗ','ᚾ','ᛟ','ᛈ','ᛩ','ᚱ','ᛋ','ᛏ','ᚢ','ᚡ','ᚹ','ᛪ','ᚤ','ᛉ'],
['ᚨ','ᛒ','ᚲ','ᛞ','ᛖ','ᚠ','ᚷ','ᚺ','ᛁ','ᛃ','ᚴ','ᛚ','ᛗ','ᚾ','ᛟ','ᛈ','ᛩ','ᚱ','ᛋ','ᛏ','ᚢ','ᚡ','ᚹ','ᛪ','ᚤ','ᛉ'], null));
var CANADIAN = map(buildMap(['ᗩ','ᗷ','ᑕ','ᗪ','ᗴ','ᖴ','Ꮐ','ᕼ','Ꭵ','ᒍ','Ꮶ','ᒪ','ᗰ','ᑎ','ᗝ','ᑭ','ᑫ','ᖇ','ᔕ','ᖶ','ᑌ','ᐯ','ᗯ','᙭','ᖻ','ᘔ'],
['ᗩ','ᗷ','ᑕ','ᗪ','ᗴ','ᖴ','Ꮐ','ᕼ','Ꭵ','ᒍ','Ꮶ','ᒪ','ᗰ','ᑎ','ᗝ','ᑭ','ᑫ','ᖇ','ᔕ','ᖶ','ᑌ','ᐯ','ᗯ','᙭','ᖻ','ᘔ'], null));
var CHEROKEE = map(buildMap(['Ꭺ','Ꮟ','Ꮯ','Ꭰ','Ꭼ','Ᏸ','Ꮐ','Ꮋ','Ꭵ','Ꭻ','Ꮶ','Ꮮ','Ꮇ','Ꮑ','Ꮎ','Ꮲ','Ꮕ','Ꮢ','Ꮥ','Ꮏ','Ꮼ','Ꮴ','Ꮿ','Ꮙ','Ꭹ','Ꮓ'],
['Ꭺ','Ꮟ','Ꮯ','Ꭰ','Ꭼ','Ᏸ','Ꮐ','Ꮋ','Ꭵ','Ꭻ','Ꮶ','Ꮮ','Ꮇ','Ꮑ','Ꮎ','Ꮲ','Ꮕ','Ꮢ','Ꮥ','Ꮏ','Ꮼ','Ꮴ','Ꮿ','Ꮙ','Ꭹ','Ꮓ'], null));
var GREEK = map(buildMap(['Α','Β','Ϲ','Δ','Ε','Ϝ','Γ','Η','Ι','ϳ','Κ','Λ','Μ','Ν','Ο','Π','Ϙ','Ρ','Σ','Τ','Υ','Ѵ','Ω','Χ','ϒ','Ζ'],
['α','β','ϲ','δ','ε','ϝ','γ','η','ι','ϳ','κ','λ','μ','ν','ο','π','ϙ','ρ','σ','τ','υ','ѵ','ω','χ','ϒ','ζ'], null));
var CYRILLIC = map(buildMap(['А','В','С','Ԁ','Е','Ф','Г','Н','І','Ј','К','Ӆ','М','И','О','Р','Ԛ','Я','Ѕ','Т','Ц','Ѵ','Ԝ','Х','У','З'],
['а','в','с','ԁ','е','ф','г','н','і','ј','к','ӆ','м','и','о','р','ԛ','я','ѕ','т','ц','ѵ','ԝ','х','у','з'], null));
var KANJI = map(buildMap(['卂','乃','匚','刀','乇','下','Ꮆ','卄','工','丁','长','乚','从','𠘨','口','尸','㔿','尺','丂','丅','凵','ᐯ','山','乂','丫','乙'],
['卂','乃','匚','刀','乇','下','Ꮆ','卄','工','丁','长','乚','从','𠘨','口','尸','㔿','尺','丂','丅','凵','ᐯ','山','乂','丫','乙'], null));
var CRAZY = map(buildMap(['ꍏ','ꌃ','ꉓ','ꀸ','ꏂ','ꎇ','ꁅ','ꀍ','ꀤ','ꀭ','ꀗ','꒒','ꎭ','ꈤ','ꂦ','ꉣ','ꆰ','ꋪ','ꌗ','꓄','ꀎ','ꃴ','ꅏ','ꉧ','ꌩ','ꁴ'],
['ꍏ','ꌃ','ꉓ','ꀸ','ꏂ','ꎇ','ꁅ','ꀍ','ꀤ','ꀭ','ꀗ','꒒','ꎭ','ꈤ','ꂦ','ꉣ','ꆰ','ꋪ','ꌗ','꓄','ꀎ','ꃴ','ꅏ','ꉧ','ꌩ','ꁴ'], null));
var KEYCAP = map(buildMap(['A\u20e3','B\u20e3','C\u20e3','D\u20e3','E\u20e3','F\u20e3','G\u20e3','H\u20e3','I\u20e3','J\u20e3','K\u20e3','L\u20e3','M\u20e3','N\u20e3','O\u20e3','P\u20e3','Q\u20e3','R\u20e3','S\u20e3','T\u20e3','U\u20e3','V\u20e3','W\u20e3','X\u20e3','Y\u20e3','Z\u20e3'],
['a\u20e3','b\u20e3','c\u20e3','d\u20e3','e\u20e3','f\u20e3','g\u20e3','h\u20e3','i\u20e3','j\u20e3','k\u20e3','l\u20e3','m\u20e3','n\u20e3','o\u20e3','p\u20e3','q\u20e3','r\u20e3','s\u20e3','t\u20e3','u\u20e3','v\u20e3','w\u20e3','x\u20e3','y\u20e3','z\u20e3'],
['0\u20e3','1\u20e3','2\u20e3','3\u20e3','4\u20e3','5\u20e3','6\u20e3','7\u20e3','8\u20e3','9\u20e3']));
var BOXED = map(buildMap(['A\u20de','B\u20de','C\u20de','D\u20de','E\u20de','F\u20de','G\u20de','H\u20de','I\u20de','J\u20de','K\u20de','L\u20de','M\u20de','N\u20de','O\u20de','P\u20de','Q\u20de','R\u20de','S\u20de','T\u20de','U\u20de','V\u20de','W\u20de','X\u20de','Y\u20de','Z\u20de'],
['a\u20de','b\u20de','c\u20de','d\u20de','e\u20de','f\u20de','g\u20de','h\u20de','i\u20de','j\u20de','k\u20de','l\u20de','m\u20de','n\u20de','o\u20de','p\u20de','q\u20de','r\u20de','s\u20de','t\u20de','u\u20de','v\u20de','w\u20de','x\u20de','y\u20de','z\u20de'],
['0\u20de','1\u20de','2\u20de','3\u20de','4\u20de','5\u20de','6\u20de','7\u20de','8\u20de','9\u20de']));
var REVERSED = map(buildMap(null, null, null), true);
var ALPHABETS = [
{ name: 'Bold', cat: 'fonts gaming', def: rng(0x1D400, 0x1D41A, 0x1D7CE)},
{ name: 'Italic', cat: 'fonts', def: rng(0x1D434, 0x1D44E, null, { h: 0x210E})},
{ name: 'Bold Italic', cat: 'fonts', def: rng(0x1D468, 0x1D482, null)},
{ name: 'Script', cat: 'fonts cute', def: rng(0x1D49C, 0x1D4B6, null, { B: 0x212C, E: 0x2130, F: 0x2131, H: 0x210B, I: 0x2110, L: 0x2112, M: 0x2133, R: 0x211B, e: 0x212F, g: 0x210A, o: 0x2134})},
{ name: 'Bold Script', cat: 'fonts cute', def: rng(0x1D4D0, 0x1D4EA, null)},
{ name: 'Fraktur', cat: 'fonts gaming', def: rng(0x1D504, 0x1D51E, null, { C: 0x212D, H: 0x210C, I: 0x2111, R: 0x211C, Z: 0x2128})},
{ name: 'Bold Fraktur', cat: 'fonts gaming', def: rng(0x1D56C, 0x1D586, null)},
{ name: 'Double-Struck', cat: 'fonts', def: rng(0x1D538, 0x1D552, 0x1D7D8, { C: 0x2102, H: 0x210D, N: 0x2115, P: 0x2119, Q: 0x211A, R: 0x211D, Z: 0x2124})},
{ name: 'Monospace', cat: 'fonts', def: rng(0x1D670, 0x1D68A, 0x1D7F6)},
{ name: 'Sans', cat: 'fonts', def: rng(0x1D5A0, 0x1D5BA, 0x1D7E2)},
{ name: 'Sans Bold', cat: 'fonts gaming', def: rng(0x1D5D4, 0x1D5EE, 0x1D7EC)},
{ name: 'Sans Italic', cat: 'fonts', def: rng(0x1D608, 0x1D622, null)},
{ name: 'Sans Bold Italic', cat: 'fonts', def: rng(0x1D63C, 0x1D656, null)},
{ name: 'Circled', cat: 'fonts cute', def: rng(0x24B6, 0x24D0, null, { '0': 0x24EA, '1': 0x2460, '2': 0x2461, '3': 0x2462, '4': 0x2463, '5': 0x2464, '6': 0x2465, '7': 0x2466, '8': 0x2467, '9': 0x2468})},
{ name: 'Dark Circled', cat: 'fonts gaming', def: rng(0x1F150, null, null)},
{ name: 'Squared', cat: 'fonts gaming', def: rng(0x1F130, null, null)},
{ name: 'Dark Squared', cat: 'fonts gaming', def: rng(0x1F170, null, null)},
{ name: 'Parenthesized', cat: 'fonts cute', def: rng(0x1F110, 0x249C, null)},
{ name: 'Fullwidth', cat: 'fonts', def: rng(0xFF21, 0xFF41, 0xFF10)},
{ name: 'Small Caps', cat: 'fonts', def: SMALLCAPS},
{ name: 'Upside Down', cat: 'fonts', def: FLIP},
{ name: 'Leet Speak', cat: 'fonts gaming', def: LEET},
{ name: 'Spaced', cat: 'fonts cute', def: { t: 'x', kind: 'spaced'}},
{ name: 'Superscript', cat: 'fonts cute', def: SUPERSCRIPT},
{ name: 'Braille Dots', cat: 'fonts', def: BRAILLE},
{ name: 'Runic', cat: 'fonts gaming', def: RUNIC},
{ name: 'Canadian', cat: 'fonts', def: CANADIAN},
{ name: 'Cherokee', cat: 'fonts gaming', def: CHEROKEE},
{ name: 'Greek', cat: 'fonts', def: GREEK},
{ name: 'Cyrillic', cat: 'fonts gaming', def: CYRILLIC},
{ name: 'Kanji Style', cat: 'fonts gaming', def: KANJI},
{ name: 'Crazy', cat: 'fonts gaming', def: CRAZY},
{ name: 'Keycap', cat: 'fonts cute', def: KEYCAP},
{ name: 'Boxed', cat: 'fonts', def: BOXED},
{ name: 'Reversed', cat: 'fonts', def: REVERSED},
{ name: 'Segmented Digits', cat: 'fonts', def: rng(null, null, 0x1FBF0)},
{ name: 'Black Circled', cat: 'fonts gaming', def: rng(0x1F150, 0x1F150, null)},
{ name: 'Black Squared', cat: 'fonts gaming', def: rng(0x1F170, 0x1F170, null)},
{ name: 'Double Spaced', cat: 'fonts', def: { t: 'x', kind: 'wide'}}
];
var FRAMES = [
{ name: 'Dragon Gate', cat: 'gaming', pre: '꧁༒', post: '༒꧂'},
{ name: 'Legend Gate', cat: 'gaming', pre: '꧁☬', post: '☬꧂'},
{ name: 'Angel Wings', cat: 'royal', pre: '꧁༺', post: '༻꧂'},
{ name: 'Classic Frame', cat: 'royal', pre: '༺', post: '༻'},
{ name: 'Star', cat: 'cute', pre: '★', post: '★'},
{ name: 'Hollow Star', cat: 'cute', pre: '☆', post: '☆'},
{ name: 'Crown', cat: 'royal', pre: '♛', post: '♛'},
{ name: 'Skull King', cat: 'gaming', pre: '☬', post: '☬'},
{ name: 'Japanese Brackets', cat: 'minimal', pre: '『', post: '』'},
{ name: 'Bold Brackets', cat: 'minimal', pre: '\u3010', post: '\u3011' },
{ name: 'Angle Frame', cat: 'minimal', pre: '⧼', post: '⧽'},
{ name: 'Guillemets', cat: 'minimal', pre: '«', post: '»'},
{ name: 'Swords', cat: 'gaming', pre: '⚔', post: '⚔'},
{ name: 'Death', cat: 'gaming', pre: '☠', post: '☠'},
{ name: 'Flower', cat: 'cute', pre: '✿', post: '✿'},
{ name: 'Heart', cat: 'cute', pre: '♡', post: '♡'},
{ name: 'Full Heart', cat: 'cute', pre: '♥', post: '♥'},
{ name: 'Diamond', cat: 'royal', pre: '◆', post: '◆'},
{ name: 'Sparkle', cat: 'cute', pre: '✦', post: '✦'},
{ name: 'Pro Tag', cat: 'gaming', pre: '亗', post: '亗'},
{ name: 'Clan Tag', cat: 'gaming', pre: '', post: '亗'},
{ name: 'King Tag', cat: 'royal', pre: 'ꔪ', post: ''}
];
// drop the Vai-script frame if it renders poorly: keep list at 21 by removing King Tag fallback below
FRAMES = FRAMES.slice(0, 21);
var EFFECTS = [
{ name: 'Strikethrough', mark: '\u0336'},
{ name: 'Underline', mark: '\u0332'},
{ name: 'Double Underline', mark: '\u0333'},
{ name: 'Slashed', mark: '\u0338'},
{ name: 'Short Stroke', mark: '\u0335'}
];
var FRAME_ALPHABETS = ['Bold', 'Bold Fraktur', 'Fraktur', 'Double-Struck', 'Script', 'Sans Bold', 'Bold Script', 'Monospace', 'Superscript', 'Braille Dots', 'Runic', 'Canadian', 'Cherokee', 'Greek', 'Cyrillic', 'Kanji Style', 'Crazy', 'Keycap', 'Boxed', 'Reversed', 'Segmented Digits', 'Black Circled', 'Black Squared'];
var EFFECT_ALPHABETS = ['Bold', 'Sans Bold', 'Double-Struck', 'Monospace', 'Script', 'Small Caps', 'Superscript', 'Braille Dots', 'Runic', 'Canadian', 'Cherokee', 'Greek', 'Cyrillic', 'Kanji Style', 'Crazy', 'Reversed', 'Segmented Digits', 'Black Circled', 'Black Squared'];
function convert(text, def) {
if (!text) return '';
var chars = Array.from(text), out = [], i, ch, cp;
if (def.t === 'x') {
var joined = chars.join(def.kind === 'spaced'? '\u2009': '\u2003');
return joined;
}
for (i = 0; i < chars.length; i++) {
ch = chars[i];
if (def.t === 'm') { out.push(def.map[ch]!== undefined? def.map[ch]: ch); continue;}
if (def.exc? def.exc[ch]!== undefined: false) { out.push(String.fromCodePoint(def.exc[ch])); continue;}
cp = ch.codePointAt(0);
if (cp >= 65? cp <= 90? !!def.A: false: false) out.push(String.fromCodePoint(def.A + cp - 65));
else if (cp >= 97? cp <= 122? !!def.a: false: false) out.push(String.fromCodePoint(def.a + cp - 97));
else if (cp >= 48? cp <= 57? !!def.d: false: false) out.push(String.fromCodePoint(def.d + cp - 48));
else out.push(ch);
}
var s = out.join('');
if (def.rev) s = Array.from(s).reverse().join('');
return s;
}

function effect(text, mark) {
// Add the combining mark after every base character. Whitespace is skipped,
// and so are characters that are themselves combining/enclosing marks
// (U+0300-U+036F, U+20D0-U+20FF) so sequences like keycap (A + U+20E3)
// are never split. NOTE: this fixes a bug in the website's original inline
// engine, which only marked ASCII [A-Za-z0-9] and therefore silently left
// most converted glyphs (Bold, Script, Greek, ...) unmarked.
return Array.from(text).map(function (c) {
  var cp = c.codePointAt(0);
  if (/\s/.test(c)) return c;
  if (cp >= 0x300 && cp <= 0x36F) return c;
  if (cp >= 0x20D0 && cp <= 0x20FF) return c;
  return c + mark;
}).join('');
}

function alphByName(n) { for (var i = 0; i < ALPHABETS.length; i++) if (ALPHABETS[i].name === n) return ALPHABETS[i]; return null;}

function buildStyles() {
var styles = [], i, j, al, fr, ef;
for (i = 0; i < ALPHABETS.length; i++) {
al = ALPHABETS[i];
styles.push({ label: al.name, cat: al.cat, make: (function (d) { return function (t) { return convert(t, d);};})(al.def)});
}
for (i = 0; i < FRAMES.length; i++) {
fr = FRAMES[i];
for (j = 0; j < FRAME_ALPHABETS.length; j++) {
al = alphByName(FRAME_ALPHABETS[j]);
styles.push({
label: fr.name + ' · ' + al.name,
cat: 'framed ' + fr.cat + (fr.cat === 'gaming' || al.cat.indexOf('gaming') >= 0? ' gaming': '') + (fr.cat === 'cute'? ' cute': ''),
make: (function (f, d) { return function (t) { return f.pre + convert(t, d) + f.post;};})(fr, al.def)
});
}
}
for (i = 0; i < EFFECTS.length; i++) {
ef = EFFECTS[i];
for (j = 0; j < EFFECT_ALPHABETS.length; j++) {
al = alphByName(EFFECT_ALPHABETS[j]);
styles.push({
label: ef.name + ' · ' + al.name,
cat: 'fonts',
make: (function (e, d) { return function (t) { return effect(convert(t, d), e.mark);};})(ef, al.def)
});
}
}
return styles;
}


// ---- Platform character limits (as used by the live tool at stylishname.click) ----
var PLATFORMS = {
  freefire:  { label: 'Free Fire',    limit: 12 },
  pubg:      { label: 'PUBG Mobile',  limit: 16 },
  instagram: { label: 'Instagram',    limit: 30 },
  tiktok:    { label: 'TikTok',       limit: 30 }
};

// Visible length in Unicode code points (combining marks do not add length).
function visibleLength(text) {
  var base = Array.from(String(text)).filter(function (c) {
    var cp = c.codePointAt(0);
    return !(cp >= 0x300 && cp <= 0x36F); // combining diacritical marks block
  });
  return base.length;
}

// Does `text` fit the character limit of `platform` (a PLATFORMS key)?
function fits(text, platform) {
  var p = PLATFORMS[platform];
  if (!p) throw new Error('Unknown platform: ' + platform);
  return visibleLength(text) <= p.limit;
}

// Generate every style for `name`, each annotated with per-platform fit flags.
var _stylesCache = null;
function generate(name) {
  if (!_stylesCache) _stylesCache = buildStyles();
  return _stylesCache.map(function (s) {
    var text = s.make(name);
    var fit = {};
    Object.keys(PLATFORMS).forEach(function (k) { fit[k] = fits(text, k); });
    return { label: s.label, category: s.cat, text: text, fits: fit };
  });
}

return { ALPHABETS: ALPHABETS, FRAMES: FRAMES, EFFECTS: EFFECTS, PLATFORMS: PLATFORMS, convert: convert, effect: effect, buildStyles: buildStyles, visibleLength: visibleLength, fits: fits, generate: generate };
})();

// ---- Exports: Node.js (CommonJS), AMD, and browser global ----
if (typeof module !== 'undefined' && module.exports) {
  module.exports = StylishName;
} else if (typeof define === 'function' && define.amd) {
  define(function () { return StylishName; });
}
if (typeof window !== 'undefined') {
  window.StylishName = StylishName;
}
