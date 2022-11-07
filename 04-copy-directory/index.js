const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');
const destPath = path.join(__dirname, '/files-copy');
const srcPath = path.join(__dirname, '/files');

fs.readdir(destPath,{withFileTypes: true}, (err, files) => {
    if(files) {
        files.forEach(file => {
            fs.unlink(`${destPath}/${file.name}`, err =>{})
        })
    }
})

fsPromises.mkdir(destPath,{recursive: true})

fs.readdir(srcPath, {withFileTypes: true}, (err, files) => {
    files.forEach(file => {  
        fsPromises.copyFile(`${srcPath}/${file.name}`, `${destPath}/${file.name}`);
    })
})