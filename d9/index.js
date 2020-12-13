const fs = require('fs');

function parseData(str) {
  let data = str.split('\n');

  return data.map(i => parseInt(i));
}

function hasSum(num, arr) {
  let a = arr.sort();
  for (let i in arr) {
    for (let j in arr) {
      if (a[i] + a[j] == num && a[i] != a[j]) return true;
    }
  }

  return false;
}

fs.readFile('./d9/input.txt', 'utf-8', (err, str) => {
  if (err) {
    console.error(err);
    return;
  }

  let data = parseData(str.trim());
  let prevNums = 25;
  let index = 25;

  let valid = true;
  for (let i = index; i < data.length; i++) {
    valid = hasSum(data[i], data.slice(i - prevNums, i));
    if (!valid) {
      console.log(data[i]);
      return;
    }
  }
});
