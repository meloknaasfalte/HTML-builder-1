const fs = require('fs');
const path = require('path');
const writeStream = fs.createWriteStream(path.join(__dirname, 'text.txt'));
const {stdin, stdout} = require('process');

stdin.write('Enter some text:\n');
stdin.resume();

process.stdin.on('data', chunk => {
    if(chunk.toString().trim() === 'exit') {
        process.stdout.write('farewell phrase');
        process.exit();
    }
    else
        writeStream.write(chunk);
   
})

process.on('SIGINT', () => {
    stdout.write('\nfarewell phrase');
    process.exit();
})
