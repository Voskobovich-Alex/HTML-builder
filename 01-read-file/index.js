const fs = require('fs');
const path = require('path');
const process = require('process');

const {stdout} = process;

let file = path.join(__dirname, 'text.txt');
let stream = fs.createReadStream(file, {encoding: 'utf8'});

stream.on('data', chunk => stdout.write(chunk.toString()));