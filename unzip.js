const fs = require('fs');
const pad = require('pad-left');
const path = require('path');
const sevenBin = require('7zip-bin');
const node7z = require('node-7z');
const pathTo7zip = sevenBin.path7za;
const nanoid = require('nanoid');

const rootPath = "D:/115下载/更2"; //把父文件夹地址填充于此！

function unzipAll() {
  const files = walk(rootPath);
  for (let index = 0; index < files.length; index++) {
    const file = files[index];
    const extname = path.extname(file);
    const filename = path.basename(file, extname);
    const des = path.dirname(file);
    const lowerCaseExtname = extname.toLocaleLowerCase();
    if(lowerCaseExtname == '.7z' || lowerCaseExtname == '.zip' || lowerCaseExtname == '.rar') {
      const seven = node7z.extractFull(file, des + '/' + filename, {
        $bin: pathTo7zip,
        recursive: true,
        password: 'jlkgej'
      });
      seven.on('end', function () {
        // end of the operation, get the number of folders involved in the operation
        console.log('完成' + file + '的解压!');
        fs.unlinkSync(file);
      });
    
      seven.on('error', async (err) => {
        console.log(err);
      });
    }
  }
}
unzipAll();

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