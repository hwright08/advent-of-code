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

function getSumList(num, arr) {
  let a, sum;
  for (let i = 0; i < arr.length; i++) {
    a = [];
    for (let j = i; j < arr.length; j++) {
      a.push(arr[j]);
      sum = a.reduce((s, n) => s + n, 0);
      if (num == sum) return a.sort();
      if (sum > num) break;
    }
  }
  return [];
}

fs.readFile('./d9/input.txt', 'utf-8', (err, str) => {
  if (err) {
    console.error(err);
    return;
  }

  let data = parseData(str.trim());
  let prevNums = 25;
  let index = 25;

  let valid = true, invalidNum, list;
  for (let i = index; i < data.length; i++) {
    valid = hasSum(data[i], data.slice(i - prevNums, i));
    if (!valid) {
      invalidNum = data[i];
      console.log(invalidNum);

      // find contiguous set of at least 2 numbers
      list = getSumList(invalidNum, data.slice(0, i));
      let min = list[0];
      let max = list[list.length - 1];
      console.log(min, max, min + max);
      return;
    }
  }
});
