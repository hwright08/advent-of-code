'use strict';

const { count } = require('console');
const fs = require('fs');
const cloneDeep = require('lodash').cloneDeep;

function addToColumns(curr, add) {
  for (let i in curr) {
    curr[i] = [...curr[i], ...add[i]];
  }
  return curr;
}

function printMap(curr, pos) {
  for (let i in curr) {
    if (i <= pos + 1)
    if (pos >= curr.length - 4)
      console.log(curr[i].join(''));
    else break;
  }
  // console.log('-----------------------------------------------------------------------------------');
}

function countTrees(map) {
  let trees = 0;
  let found;
  for (let row in map) {
    found = map[row].join('').match(new RegExp('X', 'g'));
    trees += found ? found.length : 0;
  }
  console.log(trees);
}

fs.readFile('./data/d3.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  let rows = data.split('\n');
  rows.splice(-1, 1);
  for (let i in rows) {
    rows[i] = rows[i].split('');
  }

  const copy = cloneDeep(rows);

  let r = 0, c = 0;
  let count = 0;
  while (r <= rows.length) {
    c += 3;
    r += 1;

    if (r >= rows.length) break;
    if (c > rows[r].length) {
      rows = addToColumns(rows, copy);
    }

    rows[r][c] = rows[r][c] == '#' ? 'X' : 'O';
    count += rows[r][c] == 'X' ? 1 : 0;
    printMap(rows, r);
  }

  countTrees(rows);
});

// 211 is too low
