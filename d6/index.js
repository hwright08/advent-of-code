'use script';

const fs = require('fs');

function parseData(str) {
  let groups = str.split('\n\n');
  for (let i in groups) {
    groups[i] = groups[i].replace(new RegExp('\n', 'g'), '');
  }
  return groups;
}

function parseData2(str) {
  let groups = str.split('\n\n');
  for (let i in groups) {
    groups[i] = groups[i].split('\n');
  }

  return groups;
}

function questionGroup(group) {
  // get the smallest of the answers
  group.sort((a,b) => a.length < b.length ? -1 : 1);
  let smallest = group.shift();

  if (!group.length) return smallest.length;

  let vals = smallest.split('').reduce((obj, item) => {
    if (!obj[item]) obj[item] = 1;
    return obj;
  }, {});

  for (let person of group) {
    for (let char of person.split('')) {
      if (vals[char]) vals[char]++;
    }
  }

  let count = 0;
  for (let key in vals) {
    if (vals[key] == group.length + 1) count++;
  }

  return count;
}

function interrogate(groups) {
  let count = 0;
  let ans;
  for (let group of groups) {
    ans = questionGroup(group);
    count += ans;
  }

  console.log(count);
}

fs.readFile('./d6/input.txt', 'utf8', (err, str) => {
  if (err) {
    console.error(err);
    return;
  }

  let groups = parseData(str.trim());

  let counts = groups.map(val => {
    let arr = [];
    for (let i = 0; i < val.length; i++) {
      if (!arr.includes(val[i])) arr.push(val[i]);
    }
    return arr.length;
  });

  let sum = counts.reduce((s, i) => s += i);
  // console.log(sum);

  let groups2 = parseData2(str.trim());
  interrogate(groups2);
});
