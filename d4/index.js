'use strict'

const fs = require('fs');
const encoding = 'utf8'

class Passport {
  constructor(obj) {
    this.birth_year = obj.byr;
    this.issue_year = obj.iyr;
    this.expiration = obj.eyr;
    this.height = obj.hgt;
    this.hair = obj.hcl;
    this.eyes = obj.ecl;
    this.id = obj.pid;
    this.country = obj.cid;
  }

  // GETTERS

  get hasRequiredFields() {
    const requiredFields = ['birth_year', 'issue_year', 'expiration', 'height', 'hair', 'eyes', 'id'];
    for (let i of requiredFields) {
      if (!this[i]) {
        return false;
      }
    }
    return true;
  }

  get validBirthYear() {
    const intYear = parseInt(this.birth_year);
    return this.birth_year && this.birth_year.length == 4 && intYear >= 1920 && intYear <= 2002;
  }

  get validIssueYear() {
    const intYear = parseInt(this.issue_year);
    return this.issue_year && this.issue_year.length == 4 && intYear >= 2010 && intYear <= 2020;
  }

  get validExpiration() {
    const intYear = parseInt(this.expiration);
    return this.expiration && this.expiration.length == 4 && intYear >= 2020 && intYear <= 2030;
  }

  get validHeight() {
    if (!this.height) return false;

    let num = this.height.slice(0, -2);
    let unit = this.height.slice(-2);

    if (unit == 'cm') {
      return num >= 150 && num <= 193;
    }
    else if (unit == 'in') {
      return num >= 59 && num <= 76;
    }
    return false;
  }

  get validHair() {
    if (this.hair) {
      let found = (this.hair.match(new RegExp('^#[0-9a-f]{6}', 'g')) || []).length;
      return found;
    }
    return false;
  }

  get validEyes() {
    const eyeColors = ['amb', 'brn', 'blu', 'gry', 'grn', 'hzl', 'oth'];
    if (this.eyes) {
      return eyeColors.includes(this.eyes);
    }
    return false;
  }

  get validID() {
    if (this.id) {
      let found = (this.id.match(new RegExp('^[0-9]{9}$', 'g')) || []).length;
      return found;
    }
    return false;
  }

  get valid() {
    return this.validBirthYear && this.validIssueYear && this.validExpiration && this.validHeight &&
            this.validHair && this.validEyes && this.validID;
  }
};

function getValidFieldPassports(passports) {
  let count = 0;
  for (let pass of passports) {
    if (pass.hasRequiredFields) count++;
  }
  console.log(count);
}

function getValidPassports(passports) {
  let count = 0;
  for (let pass of passports) {
    if (pass.valid) count++
  }
  console.log(count);
}

function parseData(err, str) {
  if (err) {
    console.error(err);
    return;
  }

  let passports = str.split('\n\n')
                  .map(val => {
                    let singleLine = val.replace(new RegExp('\n', 'g'), ' ');
                    let attrs = singleLine.split(' ');
                    let obj = {};
                    for (let i in attrs) {
                      let kv = attrs[i].split(':');
                      obj[kv[0]] = kv[1];
                    }
                    return new Passport(obj);
                  });
  getValidFieldPassports(passports);
  getValidPassports(passports);

}

fs.readFile('./d4/sample.txt', encoding, parseData);
