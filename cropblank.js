const fs = require('fs');
const sharp = require('sharp');
const path = require('path');

const rootPath = 'D:/115下载/更/[韩漫全彩]调教女大生 全完结'; 
const wantCropWidth = 660;

async function crop() {
  const files = walk(rootPath);
  for (let index = 0; index < files.length; index++) {
    const file = files[index];
    // sharp.cache(false);
    const metadata = await sharp(file).metadata().catch((err) => console.log(file));
    doCropBlank(file, metadata, wantCropWidth);
  }
}

crop();

async function doCropBlank(file, metadata, wantCropWidth) {
  const extname = path.extname(file);
  const basename = path.basename(file, extname);
  const dirname = path.dirname(file);
  const cropWidth = metadata.width - wantCropWidth;
  const left = cropWidth / 2;
  const top = 0;
  const cropHeight = metadata.height;
  if(left > 0) {
    await sharp(file)
      .extract({left: left, top: top, width: wantCropWidth, height: cropHeight})
      .toFile(dirname + '/' + basename + `_crop.jpg`);
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