const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '/text.txt');
const stream = new fs.ReadStream(filePath, 'utf-8');

let data = '';

stream.on('data', chunk =>{
    data += chunk;
})

stream.on('close', () => {
    console.log(data);
})