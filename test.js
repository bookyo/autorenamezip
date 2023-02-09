const sevenBin = require('7zip-bin');
const node7z = require('node-7z');
const pathTo7zip = sevenBin.path7za;
const sharp = require('sharp');

function test() {
  const myStream = node7z.add('./test.7z', 'D:/BaiduNetdiskDownload/[辰鋒]斗罗玉传 斗罗玉转/16-20', {
    recursive: true,
    $bin: pathTo7zip
  });
  myStream.on('error', function (err) {
    console.log(err);
    // a standard error
    // `err.stderr` is a string that can contain extra info about the error
  })
}

async function testResize(file, originalWidth, width) {
  const cropWidth = originalWidth - width;
  const left = cropWidth / 2;
  const top = 0;
  const metadata = await sharp(file).metadata();
  const cropHeight = metadata.height;
  await sharp(file)
    .extract({left: left, top: top, width: width, height: cropHeight})
    .toFile(`test.jpg`);
}
testResize('./00001.jpg', 1920, 740);

// test();