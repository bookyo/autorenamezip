const sevenBin = require('7zip-bin');
const node7z = require('node-7z');
const pathTo7zip = sevenBin.path7za;

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

test();