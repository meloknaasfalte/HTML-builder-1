const fs = require('fs');
const { writeFile, readFile, copyFile, mkdir, readdir } = fs.promises;
const path = require('path');
const distPath = path.join(__dirname, '/project-dist');
const stylesPath = path.join(__dirname, '/styles');
const componentsPath = path.join(__dirname, '/components');
const assetsPath = path.join(__dirname, '/assets');
const newAssetsPath = path.join(distPath, '/assets');


let del = fs.rmdir(distPath, err => {});

let delDir = async() => {
    await del;
}

delDir()

let preLoad = async() => {
    await mkdir(distPath, { recursive: true });
    await mkdir(newAssetsPath, { recursive: true });
}
preLoad();

copyFile(path.join(__dirname, '/template.html'), path.join(distPath, '/index.html'));
const writeStream = fs.createWriteStream(path.join(distPath, '/style.css'));

let replaceContent = async () => {
    let indexHTML = await readFile(path.join(distPath, '/index.html'), 'utf-8');
    for (let file of await readdir(componentsPath, { withFileTypes: true })) {
        if (file.name.split('.')[1] === 'html') {
            let template = await readFile(path.join(componentsPath, `/${file.name}`), 'utf-8');
            const regexp = new RegExp(`{{${file.name.split('.')[0]}}}`, 'g')
            indexHTML = indexHTML.replace(regexp, template);
        }
    }
    await writeFile(path.join(distPath, '/index.html'), indexHTML);
}




let copyStyles = async () => {
    
    await fs.readdir(stylesPath, { withFileTypes: true }, (err, files) => {

        files.forEach(file => {
            if (file.name.split('.')[1] === 'css') {
                let readStream = fs.createReadStream(path.join(stylesPath, `/${file.name}`), 'utf8');
                readStream.pipe(writeStream);
            }
        })

    })
}



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



replaceContent();
copyDir(assetsPath, newAssetsPath);
copyStyles();


