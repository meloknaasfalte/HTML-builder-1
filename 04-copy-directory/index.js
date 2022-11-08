const fs = require('fs');
const {readdir, copyFile, mkdir} = fs.promises;
const path = require('path');
const distPath = path.join(__dirname, '/files-copy');
const srcPath = path.join(__dirname, '/files');

fs.readdir(distPath,{withFileTypes: true}, (err, files) => {
    if(files) {
        files.forEach(file => {
            if(file.isDirectory())
                fs.rmdir(path.join(distPath, `/${file.name}`), err =>{});
            else
                fs.unlink(`${distPath}/${file.name}`, err =>{})
        })
    }
})

fs.mkdir(distPath,{withFileTypes: true}, (err) => {});

let copyDir = async (srcPath, distPath) => {

    for (let item of await readdir(srcPath, { withFileTypes: true })) {

        if (item.isDirectory()) {
            let newSrcPath = path.join(srcPath, `/${item.name}`)
            let newDistPath = path.join(distPath, `/${item.name}`);
            mkdir(newDistPath, { recursive: true });
            copyDir(newSrcPath, newDistPath)
        }
        else {
            copyFile(path.join(srcPath, `/${item.name}`), path.join(distPath, `/${item.name}`));
        }
    }
}
copyDir(srcPath, distPath);