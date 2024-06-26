import { exportImages } from 'pdf-into-jpg'
import path from 'path';
import fs from 'fs';

const rootPath = 'D:/115下载/[韩漫全彩]王牌经纪人（01-42话）完结';

async function pdftoimg() {
  // await pdfToPng.pdfToPng(path, // The function accepts PDF file path or a Buffer
  //   {
  //     viewportScale: 2.0,
  //     outputFolder: 'images', // Folder to write output PNG files. If not specified, PNG output will be available only as a Buffer content, without saving to a file.
  //     outputFileMask: 'buffer', // Output filename mask. Default value is 'buffer'.
  //   });
  const dirname = path.basename(rootPath);
  const rootDir = 'images/' + dirname;
  if (!fs.existsSync(rootDir)) {
    fs.mkdirSync(rootDir);
  }
  let files = walk(rootPath);
  for (let index = 0; index < files.length; index++) {
    const file = files[index];
    const extname = path.extname(file);
    const filename = path.basename(file, extname);
    if (extname.toLocaleLowerCase() == '.pdf') {
      console.log(file);
      const des = rootDir + '/' + filename;
      if (!fs.existsSync(des)) {
        fs.mkdirSync(des);
      }
      exportImages(file, des)
        .then(images => console.log('Exported', images.length, 'images'))
        .catch((err) => console.log('文件' + file + '错误:' + err))
    }
  }
  // exportImages(path, 'images')
  //   .then(images => console.log('Exported', images.length, 'images'))
  //   .catch(console.error)
}
pdftoimg();

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