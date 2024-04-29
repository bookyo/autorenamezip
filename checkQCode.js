const Jimp = require('jimp');
const jsQR = require('jsqr');
const fs = require('fs');

const rootPath = "D:/115下载/[Silver Dog] Shishou kara Osowatta Koto (Sousou no Frieren) [Chinese]"; //把父文件夹地址填充于此！

function checkFiles() {
  let files = walk(rootPath);
  for (let index = 0; index < files.length; index++) {
    const file = files[index];
    checkForQRCode(file);
  }
}

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

async function checkForQRCode(imagePath) {
  try {
    const image = await Jimp.read(imagePath);
    const imageWidth = image.bitmap.width;
    const imageHeight = image.bitmap.height;
    const imageData = new Uint8ClampedArray(image.bitmap.data.buffer);

    // 使用 jsQR 来检测图像中的二维码
    const qrCode = jsQR(imageData, imageWidth, imageHeight);

    if (qrCode) {
      if (qrCode.data.indexOf('http') > -1) {
        console.log(imagePath + '二维码检测到：', qrCode.data);
        return true
      } else {
        return false
      }
    } else {
      console.log('未检测到二维码');
      return false; // 不存在二维码
    }
  } catch (error) {
    console.error('检测二维码时发生错误:', error);
    return false;
  }
}


checkFiles()