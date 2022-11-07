const fs = require('fs');
const path = require('path');
const process = require('process');
const { stdout, stdin, exit } = process;

let file = path.join(__dirname, 'result.txt');
let stream = fs.createWriteStream(file, {encoding: 'utf8'});

stdout.write('Please, enter text: \n');

stdin.on('data', data => {
    console.log(data);
    if (`${data}`.toString().trim() === 'exit') exit();
    else stream.write(data);
});

process.on('exit', () => stdout.write('Thanks! Good luck!'));
process.on('SIGINT', () => exit());