'use strict';
/**
 * Node.js example. Run with: npm run demo  (or: node examples/node-example.js)
 */
const StylishName = require('../src/stylish-name.js');

const name = process.argv[2] || 'Ali';

console.log('Total styles:', StylishName.buildStyles().length);
console.log('');
console.log('First 10 styles for "' + name + '":');
StylishName.generate(name)
  .slice(0, 10)
  .forEach((s) => console.log('  ' + s.label.padEnd(18) + s.text));

console.log('');
console.log('Styles that fit Free Fire (max 12 characters):');
const fitsFF = StylishName.generate(name).filter((s) => s.fits.freefire);
console.log('  ' + fitsFF.length + ' of 617 styles fit');
console.log('  Example:', fitsFF[0].label, '->', fitsFF[0].text);
