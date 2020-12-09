'use strict';

const fs = require('fs');

function findRow(path, min, max) {
  if (path == '') return min;
  let half = path[0];
  let nextPath = path.slice(1, path.length);
  if (half == 'F') return findRow(nextPath, min, Math.round(min + ((max - min) / 2)));
  else if (half == 'B') return findRow(nextPath, Math.round(min + ((max - min) / 2)), max);
}

function findCol(path, min, max) {
  if (path == '') return min;
  let half = path[0];
  let nextPath = path.slice(1, path.length);
  if (half == 'L') return findCol(nextPath, min, Math.round(min + ((max - min) / 2)));
  else if (half == 'R') return findCol(nextPath, Math.round(min + ((max - min) / 2)), max);
}

fs.readFile('./input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const rows = 128;
  const cols = 8;
  let seats = [];
  let arr = data.trim().split('\n');

  arr.forEach(pass => {
    let rowHint = pass.slice(0,7);
    let colHint = pass.slice(7,10);

    // find row
    let row = findRow(rowHint, 0, 127);
    let col = findCol(colHint, 0, 7);

    let rowId = row * 8 + col;
    seats.push(rowId);
  });

  seats.sort((a,b) => {
    return Number(a) < Number(b) ? -1 : 1
  });

  console.log(seats[seats.length - 1]);

  for (let i = 0; i < seats.length; i++) {
    let curSeat = seats[i];
    let nextSeat = curSeat + 1;
    if (seats[i + 1] != nextSeat) console.log(nextSeat);
  }

  // my seat is 699 since it's not the last seat
});
