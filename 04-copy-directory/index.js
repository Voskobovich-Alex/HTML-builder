const fs = require('fs');
const path = require('path');

const curDir = path.join(__dirname, 'files');
const curDirCopy = path.join(__dirname, 'files-copy');
const options = { recursive: true };


fs.rm(curDirCopy, options, (err) => {
    fs.mkdir(curDirCopy, options, (err) => {
        if (err)  console.log(err);
    });
    fs.readdir(curDir, (err, files) => {
        if (err)  console.log(err);
        files.forEach(file => {
            fs.copyFile(path.join(curDir, file), path.join(curDirCopy, file), (error) => {
                    if (error)  console.log(error);
                });
            })
    });
});