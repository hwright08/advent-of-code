const fs = require('fs');

class GameConsole {
  constructor(instructions) {
    this.instructions = instructions;
    this.accumulator = 0;
    this.execInstr = new Set();

    this.complete = this.runGame();
  }

  runGame() {
    let i = 0;
    let current;
    let complete = true;
    while (i < this.instructions.length) {
      this.execInstr.add(i);

      current = this.instructions[i];

      if (current.op == 'acc') {
        if (current.dir == '+') this.accumulator += parseInt(current.amt);
        else if (current.dir == '-') this.accumulator -= parseInt(current.amt);
      }

      let prev = JSON.parse(JSON.stringify(i));
      if (current.op == 'jmp') {
        if (current.dir == '+') i += parseInt(current.amt);
        else if (current.dir == '-') i -= parseInt(current.amt);
      } else {
        i++;
      }

      // check to see that we haven't been here before
      if (this.execInstr.has(i)) {
        // console.log('double found at ', prev);
        complete = false;
        break;
      }
    }
    return complete;
  }
}

function parseData(str) {
  let lines = str.split('\n').map(line => {
    let obj = { op: '', dir: '', amt: 0 };
    let cmd = line.split(' ');
    obj.op = cmd[0];
    obj.dir = cmd[1].slice(0, 1);
    obj.amt = cmd[1].slice(1, cmd[1].length);
    return obj;
  });
  return lines;
}

function swapOp(index, data) {
  let { op, amt } = data[index];
  if (op == 'nop' && amt != 0)  op = 'jmp';
  else if (op == 'jmp')         op = 'nop';

  data[index] = { ...data[index], op, amt };
  return data;
}

fs.readFile('./d8/input.txt', 'utf-8', (err, str) => {
  if (err) {
    console.error(err);
    return;
  }

  let data = parseData(str.trim());
  let index = 0;
  let ans = new GameConsole(data);
  // console.log(ans.accumulator);

  while (!ans.complete) {
    // make the swap
    data = swapOp(index, data);

    // check to see if it completes
    ans = new GameConsole(data);
    if (ans.complete) {
      console.log('fixed', ans.accumulator);
      break;
    }

    // if not, swap it back
    data = swapOp(index, data);

    // go to the next instruction
    index++;
  }
});
