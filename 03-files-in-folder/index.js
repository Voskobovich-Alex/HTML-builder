const fs = require('fs');
const path = require('path');
const { readdir } = require('fs/promises');

let curDir = path.join(__dirname, 'secret-folder');
let options = {withFileTypes: true};

fs.readdir(curDir, options, (err, files) => {
    if (err) console.log(err);
    files.forEach(file => {
        if (file.isFile()) {
            fs.stat(path.join(curDir,file.name), (error, stats) => {
                if (error) console.log(error);
                let fileName = file.name.split('.');
                console.log(`${fileName[0]} - ${path.extname(file.name).slice(1)} - ${stats.size / 1000}kb`);
            });
        }
    })
});
