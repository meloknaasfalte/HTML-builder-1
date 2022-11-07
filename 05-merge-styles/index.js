const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');
const distPath = path.join(__dirname, '/project-dist');
const stylesPath = path.join(__dirname, '/styles');
const writeStream = fs.createWriteStream(path.join(distPath, 'bundle.css'));
fs.readdir(stylesPath, { withFileTypes: true }, (err, files) => {
    console.log(1);
    files.forEach(file => {
        
        if(file.name.split('.')[1] === 'css'){
            console.log(`${stylesPath}/${file.name}`);
            let readStream = fs.createReadStream(`${stylesPath}/${file.name}`, 'utf8');
            readStream.pipe(writeStream);
        }
    })
})
