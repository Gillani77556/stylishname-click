'use strict';
/**
 * Dependency-free test suite. Run with: npm test  (or: node test/stylish-name.test.js)
 */
const assert = require('node:assert');
const S = require('../src/stylish-name.js');

let passed = 0;
function test(name, fn) {
  fn();
  passed++;
  console.log('ok - ' + name);
}

function byLabel(label) {
  const found = S.buildStyles().filter((s) => s.label === label);
  assert.strictEqual(found.length, 1, 'style not found or duplicated: ' + label);
  return found[0];
}

test('library builds exactly 617 styles', () => {
  assert.strictEqual(S.buildStyles().length, 617);
});

test('counts: 39 alphabets, 21 frames, 5 effects', () => {
  assert.strictEqual(S.ALPHABETS.length, 39);
  assert.strictEqual(S.FRAMES.length, 21);
  assert.strictEqual(S.EFFECTS.length, 5);
});

test('every style label is unique (no cannibalised duplicates)', () => {
  const labels = S.buildStyles().map((s) => s.label);
  assert.strictEqual(new Set(labels).size, labels.length);
});

test('Bold converts ASCII letters and keeps spaces', () => {
  assert.strictEqual(byLabel('Bold').make('Ali'), '𝐀𝐥𝐢');
  assert.strictEqual(byLabel('Bold').make('A B'), '𝐀 𝐁');
});

test('Script uses its special capital exceptions', () => {
  assert.strictEqual(byLabel('Script').make('B'), 'ℬ');
});

test('Upside Down flips and reverses', () => {
  assert.strictEqual(byLabel('Upside Down').make('ab'), 'qɐ');
});

test('Reversed reverses without changing glyphs', () => {
  assert.strictEqual(byLabel('Reversed').make('Name'), 'emaN');
});

test('a framed style wraps the converted text', () => {
  const out = byLabel('Star · Bold').make('Ali');
  assert.strictEqual(out, '★𝐀𝐥𝐢★');
});

test('an effect style adds its combining mark per letter', () => {
  const out = byLabel('Strikethrough · Bold').make('A');
  assert.strictEqual(out, '𝐀\u0336');
});

test('generate() returns 617 annotated results', () => {
  const all = S.generate('Ali');
  assert.strictEqual(all.length, 617);
  assert.strictEqual(all[0].label, 'Bold');
  assert.strictEqual(all[0].text, '𝐀𝐥𝐢');
  assert.deepStrictEqual(Object.keys(all[0].fits), ['freefire', 'pubg', 'instagram', 'tiktok']);
});

test('fit checks respect platform limits', () => {
  assert.strictEqual(S.fits('𝐀𝐥𝐢', 'freefire'), true); // 3 <= 12
  const long = byLabel('Bold').make('AlexanderTheGreat'); // 17 chars
  assert.strictEqual(S.fits(long, 'freefire'), false); // 17 > 12
  assert.strictEqual(S.fits(long, 'pubg'), false); // 17 > 16
  assert.strictEqual(S.fits(long, 'instagram'), true); // 17 <= 30
});

test('visibleLength ignores combining marks', () => {
  const struck = byLabel('Strikethrough · Bold').make('Ali');
  assert.strictEqual(S.visibleLength(struck), 3);
});

test('effect marks apply to converted glyphs, not just ASCII (regression)', () => {
  const struck = byLabel('Strikethrough · Bold').make('Ali');
  const plain = byLabel('Bold').make('Ali');
  assert.notStrictEqual(struck, plain);
  assert.strictEqual(struck, '𝐀\u0336𝐥\u0336𝐢\u0336');
  // spaces never receive a mark
  assert.strictEqual(byLabel('Strikethrough · Bold').make('A B'), '𝐀\u0336 𝐁\u0336');
});

test('fits() throws on an unknown platform', () => {
  assert.throws(() => S.fits('x', 'myspace'), /Unknown platform/);
});

test('empty input is safe', () => {
  assert.strictEqual(byLabel('Bold').make(''), '');
  assert.strictEqual(S.generate('').length, 617);
});

console.log('\nAll ' + passed + ' tests passed.');
