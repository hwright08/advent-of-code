'use strict';

const fs = require('fs');
let text = fs.readFileSync('./d3/input.txt', 'utf-8').trim();
let rows = text.split('\n');

function getTrees(x, y) {
  let index = 0, trees = 0;
  y--;

  for (let i in rows) {
    const slopeLength = rows[i].length;
    if (rows[i][index] === "#") trees++;
    index = (index + x) % slopeLength;
    i = i + y;
  }

  return trees;
}

// console.log(getTrees(3, 1));

const slopes = [
  { r: 1, d: 1 },
  { r: 3, d: 1 },
  { r: 5, d: 1 },
  { r: 7, d: 1 },
  { r: 1, d: 2 }
];

let ans = slopes.reduce((m, i) => {
  // console.log(getTrees(i.r, i.d));
  return m * getTrees(i.r, i.d);
}, 1);

console.log(ans);

// 6889142260 is too high
