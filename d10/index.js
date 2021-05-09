const fs = require('fs');

function parseData(str) {
  return str.split('\n')
            .map(i => parseInt(i));
}


function recursiveFindPaths(index, path, data) {
  let sum = 0;
  let away1 = data.indexOf(data[index] + 1);
  let away2 = data.indexOf(data[index] + 2);
  let away3 = data.indexOf(data[index] + 3);

  // check if I'm the last adapter
  let newPath = [...path, data[index]];
  if (index >= data.length - 1 || (away3 < 0 && away2 < 0 && away1 < 0)) {
    return 1;
  }

  // check for adapter 1 away
  if (away1 >= 0) sum += recursiveFindPaths(away1, newPath, data);
  // check for adapter 2 away
  if (away2 >= 0) sum += recursiveFindPaths(away2, newPath, data);
  // check for adapter 3 away
  if (away3 >= 0) sum += recursiveFindPaths(away3, newPath, data);

  return sum;
}


fs.readFile('./input.txt', 'utf-8', (err, str) => {
  if (err) {
    console.error(err);
    return;
  }

  let data = parseData(str.trim()).sort((a,b) => parseInt(a) < parseInt(b) ? -1 : 1);
  let maxJoltage = data[data.length - 1] + 3;
  data = [...data, maxJoltage];
  let oneDiff = 0;
  let threeDiff = 0;
  let min = 0;

  for (let j of data) {
    if (j - min == 1) oneDiff++;
    if (j - min == 3) threeDiff++;
    min = j;
  }

  console.log(recursiveFindPaths(0, [0], data));
  // console.log(`${oneDiff} * ${threeDiff} = ${oneDiff * threeDiff}`);

});
