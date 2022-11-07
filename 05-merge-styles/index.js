const fs = require('fs');
const path = require('path');

const dirStyles = path.join(__dirname, 'styles');
const bundle = path.join(__dirname, 'project-dist', 'bundle.css');
const stream = fs.createWriteStream(bundle, {encoding: 'utf8'});
let options = {withFileTypes: true};

fs.readdir(dirStyles, options, (err, files) => {
    if (err) console.log(err);
    files.forEach(file => {
        let chunk = file.name.split('.');
        if (chunk[1] === 'css'){
            fs.createReadStream(path.join(dirStyles, file.name))
              .on('data', data => stream.write(`/*---- ${file.name} ---*/`+'\n' + data + '\n'));
        }
    })
})