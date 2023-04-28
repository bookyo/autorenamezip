const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const rootPath = 'D:/115下载/hentaipaw.com/Jam packed line tale';

async function toGif() {
  const dirname = path.basename(rootPath);
  const rootDir = 'images/' + dirname;
  if (!fs.existsSync(rootDir)) {
    fs.mkdirSync(rootDir);
  }
  let files = walk(rootPath);
  for (let index = 0; index < files.length; index++) {
    const file = files[index];
    // sharp.cache(false);
    const metadata = await sharp(file).metadata().catch((err) => {
      console.log(err);
      console.log(file);
    });
    const extname = path.extname(file);
    const filename = path.basename(file, extname);
    if(metadata.format=='webp') {
      await sharp(file, { animated: true })
        .toFile(rootDir + '/' + filename + '.gif');
    }
  }
}
toGif()
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
