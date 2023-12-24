const fs = require('fs');
const path = require('path');

// 指定目录
const folderPath = 'D:/115下载/[3D][NTR中毒患者] 丰乳肥臀的淫乱妈妈1-6/2228487_7d1143f45a';

// 读取文件夹内容
fs.readdir(folderPath, (err, files) => {
    if (err) {
        console.error("无法读取文件夹:", err);
        return;
    }

    // 提取所有文件名中的数字
    let numbers = files.map(file => {
        let match = file.match(/\d+/); // 查找文件名中的数字
        return match ? parseInt(match[0]) : null;
    }).filter(n => n !== null);

    console.log(numbers);

    // 排序数字
    numbers.sort((a, b) => a - b);

    // 找出缺失的数字
    for (let i = 0; i < numbers.length - 1; i++) {
        if (numbers[i + 1] !== numbers[i] + 1) {
            console.log(`缺少序列号: ${numbers[i] + 1}`);
        }
    }
});