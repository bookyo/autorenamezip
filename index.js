const fs = require('fs');
const pad = require('pad-left');
const path = require('path');
const sevenBin = require('7zip-bin');
const node7z = require('node-7z');
const pathTo7zip = sevenBin.path7za;
const nanoid = require('nanoid');

const rootPath = "D:/115下载/更2"; //把父文件夹地址填充于此！

function rename(p, s) {
  let files = walk(p);
  files.sort(naturalSort);
  for (let index = 0; index < files.length; index++) {
    const file = files[index];
    const extname = path.extname(file);
    const filename = path.basename(file, extname);
    const newname = zeroFill(s, index);
    const des = path.dirname(file);
    console.log(file);
    fs.renameSync(file, des + '/' + newname + extname);
  }
  zip(p);
}

function zip(s) {
  var results = [];
  var list = fs.readdirSync(s);
  list.forEach(function (file) {
    file = s + '/' + file;
    var stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      const dirname = path.basename(file);
      console.log(dirname);
      /* Recurse into a subdirectory */
      results = walk(file);
      const id = nanoid.nanoid();
      const tmp = './' + id;
      if (!fs.existsSync(tmp)) {
        fs.mkdirSync('./' + id);
      }
      let newTmpArr = [];
      for (let index = 0; index < results.length; index++) {
        const file = results[index];
        const filename = path.basename(file);
        fs.copyFileSync(file, tmp + '/' + filename);
        newTmpArr.push(tmp + '/' + filename);
      }
      const myStream = node7z.add('./' + dirname + '.7z', tmp, {
        recursive: true,
        $bin: pathTo7zip
      });
      myStream.on('error', function (err) {
        console.log(err);
        // a standard error
        // `err.stderr` is a string that can contain extra info about the error
      })
    } else {
      /* Is a file */
      results.push(file);
    }
  });
  return results;
}

// zip("");

rename(rootPath, 5);

function walk(dir) {
  var results = [];
  var list = fs.readdirSync(dir);
  list.forEach(function (file) {
    file = dir + '/' + file;
    var stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      /* Recurse into a subdirectory */
      results = results.concat(walk(file));
    } else {
      /* Is a file */
      results.push(file);
    }
  });
  return results;
}

function zeroFill(width, number, pad) {
  if (number === undefined) {
    return function (number, pad) {
      return zeroFill(width, number, pad)
    }
  }
  if (pad === undefined) pad = '0'
  width -= number.toString().length
  if (width > 0) return new Array(width + (/\./.test(number) ? 2 : 1)).join(pad) + number
  return number + ''
}

/*
 * Natural Sort algorithm for Javascript - Version 0.8 - Released under MIT license
 * Author: Jim Palmer (based on chunking idea from Dave Koelle)
 */
function naturalSort(a, b) {
  "use strict";
  var re = /(^([+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?)?$|^0x[0-9a-f]+$|\d+)/gi,
    sre = /(^[ ]*|[ ]*$)/g,
    dre = /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/,
    hre = /^0x[0-9a-f]+$/i,
    ore = /^0/,
    i = function (s) { return naturalSort.insensitive && ('' + s).toLowerCase() || '' + s; },
    // convert all to strings strip whitespace
    x = i(a).replace(sre, '') || '',
    y = i(b).replace(sre, '') || '',
    // chunk/tokenize
    xN = x.replace(re, '\0$1\0').replace(/\0$/, '').replace(/^\0/, '').split('\0'),
    yN = y.replace(re, '\0$1\0').replace(/\0$/, '').replace(/^\0/, '').split('\0'),
    // numeric, hex or date detection
    xD = parseInt(x.match(hre), 16) || (xN.length !== 1 && x.match(dre) && Date.parse(x)),
    yD = parseInt(y.match(hre), 16) || xD && y.match(dre) && Date.parse(y) || null,
    oFxNcL, oFyNcL;
  // first try and sort Hex codes or Dates
  if (yD) {
    if (xD < yD) { return -1; }
    else if (xD > yD) { return 1; }
  }
  // natural sorting through split numeric strings and default strings
  for (var cLoc = 0, numS = Math.max(xN.length, yN.length); cLoc < numS; cLoc++) {
    // find floats not starting with '0', string or 0 if not defined (Clint Priest)
    oFxNcL = !(xN[cLoc] || '').match(ore) && parseFloat(xN[cLoc]) || xN[cLoc] || 0;
    oFyNcL = !(yN[cLoc] || '').match(ore) && parseFloat(yN[cLoc]) || yN[cLoc] || 0;
    // handle numeric vs string comparison - number < string - (Kyle Adams)
    if (isNaN(oFxNcL) !== isNaN(oFyNcL)) { return (isNaN(oFxNcL)) ? 1 : -1; }
    // rely on string comparison if different types - i.e. '02' < 2 != '02' < '2'
    else if (typeof oFxNcL !== typeof oFyNcL) {
      oFxNcL += '';
      oFyNcL += '';
    }
    if (oFxNcL < oFyNcL) { return -1; }
    if (oFxNcL > oFyNcL) { return 1; }
  }
  return 0;
};