const fs = require('fs');
const path = require('path');
const dirPath = path.join(__dirname, '/secret-folder');
const {stdout} = process;

fs.readdir(dirPath, {withFileTypes: true}, (err,files) => {
    files.forEach(file => {
       if(file.isFile()) {
        fs.stat(path.join(dirPath, file.name), (err, stats) => {
            stdout.write(`${file.name.split('.')[0]} - ${file.name.split('.')[1]} - ${stats.size}b\n`);
        });
       }
    })
})
