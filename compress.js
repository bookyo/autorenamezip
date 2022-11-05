const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const rootPath = 'D:/BaiduNetdiskDownload/[エロマズン (まー九郎)] 鬼滅の刃 系列'; //把父文件夹地址填充于此！

async function compress() {
  let files = walk(rootPath);
  for (let index = 0; index < files.length; index++) {
    const file = files[index];
    const stat = fs.statSync(file);
    const metadata = await sharp(file).metadata();
    const extname = path.extname(file);
    const filename = path.basename(file, extname);
    const dirname = path.dirname(file);
    if (metadata.width > 1920) {
      await sharp(file).resize({width: 1920}).toFile(dirname + '/' + filename + '_compress.jpg');
      fs.unlinkSync(file);
    } else {
      if (metadata.format == 'png') {
        await sharp(file).toFile(dirname + '/' + filename + '_compress.jpg');
        fs.unlinkSync(file);
      } else {
        if ((stat.size / (1024 * 1000)) > 1) {
          await sharp(file).jpeg({quality: 80}).toFile(dirname + '/' + filename + '_compress.jpg');
          fs.unlinkSync(file);
        }
      }
    }
  }
}

compress();

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