import { exportImages } from 'pdf-into-jpg'
const path = 'D:/115下载/[韩漫全彩]调教家政妇 01-44[完结].pdf'; 

async function pdftoimg() {
  // await pdfToPng.pdfToPng(path, // The function accepts PDF file path or a Buffer
  //   {
  //     viewportScale: 2.0,
  //     outputFolder: 'images', // Folder to write output PNG files. If not specified, PNG output will be available only as a Buffer content, without saving to a file.
  //     outputFileMask: 'buffer', // Output filename mask. Default value is 'buffer'.
  //   });
  exportImages(path, 'images')
    .then(images => console.log('Exported', images.length, 'images'))
    .catch(console.error)
}
pdftoimg();