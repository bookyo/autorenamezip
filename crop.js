const fs = require('fs');
const sharp = require('sharp');
const path = require('path');

const rootPath = 'D:/115下载/更2/[韩漫全彩]透視!女子游泳部 1-13 完结'; 

async function crop() {
  const files = walk(rootPath);
  for (let index = 0; index < files.length; index++) {
    const file = files[index];
    // sharp.cache(false);
    const metadata = await sharp(file).metadata().catch((err) => console.log(file));
    if(metadata.height > 4200) {
      doCrop(file, metadata);
    }
  }
}

crop();

async function doCrop(file, metadata) {
  const height = metadata.height;
  const extname = path.extname(file);
  const basename = path.basename(file, extname);
  const dirname = path.dirname(file);
  let left = 0;
  let top = 0;
  let cropHeight = 4200;
  let cropWidth = metadata.width;
  let leftHeight = height;
  const step = Math.ceil(height / 4200);
  for (let index = 0; index < step; index++) {
    await sharp(file)
      .extract({left: left, top: top, width: cropWidth, height: cropHeight})
      .toFile(dirname + '/' + basename + `_${index}.jpg`).catch((err) => console.log(file));
    top = top + 4200;
    leftHeight = leftHeight - 4200;
    // console.log(leftHeight);
    if(leftHeight < 4200) {
      cropHeight = leftHeight;
    }
  }
  fs.unlinkSync(file);
}

function walk(dir) {
  var results = [];
  var list = fs.readdirSync(dir);
  list.forEach(function(file) {
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