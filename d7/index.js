const fs = require('fs');

class Bag {
  constructor(str) {
    let b = str.replace(new RegExp('(bags|bag)', 'g'), '').split(' contain ');
    this.color = b[0].trim();
    this.content = this.assignContent(b[1]);
  }

  assignContent(str) {
    let content = new Map();
    str = str.replace('.', '').trim();
    if (!str.includes('no')) {
      str.split(' , ').forEach(bag => {
        let b = bag.split(' ');
        content.set(`${b[1]} ${b[2]}`, parseInt(b[0]));
      });
    }

    return content;
  }
}

class LuggageClaim {
  constructor(str, myBag) {
    this.bags = this.parseData(str);
    this.myBag = myBag;
    this.parentBags = new Set();
    this.includedBags = 0;

    let directParents = this.getParentBags(myBag);
    this.getRecursiveParents(directParents);
    this.getRecursiveChildCount(myBag, 1);
  }

  getRecursiveParents(parents) {
    parents.forEach(bag => {
      if (!this.parentBags.has(bag.color)) {
        this.parentBags.add(bag.color);
      }

      let currentBagParents = this.getParentBags(bag.color);
      if (currentBagParents.length) {
        this.getRecursiveParents(currentBagParents);
      }
    });
  }

  getRecursiveChildCount(color, parentColorCount) {
    let bag = this.bags.find(b => b.color === color);

    if (bag.content.size > 0) {
      let bagCount = parentColorCount * [...bag.content.values()].reduce((sum, i) => i + sum, 0);
      this.includedBags += bagCount;

      bag.content.forEach((amt, c) => this.getRecursiveChildCount(c, parentColorCount * amt));
    }
  }

  parseData(str) {
    return str.split('\n').map(line => new Bag(line));
  }

  getParentBags(bag) {
    return this.bags.filter(b => b.content.has(bag));
  }

}


fs.readFile('./d7/input.txt', 'utf-8', (err, str) => {
  if (err) {
    console.error(err);
    return;
  }

  let ans = new LuggageClaim(str.trim(), 'shiny gold');
  console.log(ans.parentBags.size); // 316
  console.log(ans.includedBags);
});
