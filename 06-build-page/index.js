const fs = require('fs');
const path = require('path');

const curDir = path.join(__dirname, 'project-dist');

const compDir = path.join(__dirname, 'components');
const template = path.join(__dirname, 'template.html');
let templatStream = fs.createReadStream(template, {encoding: 'utf8'});

const styleDir = path.join(__dirname, 'styles');

const assets = path.join(__dirname, 'assets');
const assetsCopy = path.join(curDir, 'assets');

const options = {withFileTypes: true};
const optionsDir = { recursive: true }; 


console.log(assetsCopy);
// Create project-dist
fs.rm(curDir, optionsDir, (err) => {
    fs.mkdir(curDir, optionsDir, (err) => {
        if (err)  console.log(err);
    });


    const index = path.join(__dirname, 'project-dist', 'index.html');
    const streamHtml = fs.createWriteStream(index, {encoding: 'utf8'});
   // Create index.html
    templatStream.on('data', data => {
        let html = {}, count = 0;
        fs.readdir(compDir, options, (err, compFiles) => {
            compFiles.forEach(compFile => {
                let chunkFile = compFile.name.split('.');
                html[chunkFile[0]] = '';
                fs.createReadStream(path.join(compDir, compFile.name))
                      .on('data', (fileContent) => {
                        html[chunkFile[0]] += fileContent.toString();
                      })
                      .on('end', () => {
                        count++;
                        if (count >= compFiles.length) {
                            for (let item in html) {
                                data = data.replace('{{'+ item + '}}', html[item]);
                            }
                            streamHtml.write(data);
                        }
                      });
            });
        });
    });
    

    const styles = path.join(__dirname, 'project-dist', 'styles.css');
    const stream = fs.createWriteStream(styles, {encoding: 'utf8'});

    // Create styles.css
    fs.readdir(styleDir, options, (err, files) => {
        if (err) console.log(err);
        files.forEach(file => {
            let chunk = file.name.split('.');
            if (chunk[1] === 'css'){
                fs.createReadStream(path.join(styleDir, file.name))
                  .on('data', data => stream.write(`/*---- ${file.name} ---*/`+'\n' + data + '\n'));
            }
        })
    });

    // Create assets
    fs.rm(assetsCopy, optionsDir, (err) => {
        fs.mkdir(assetsCopy, optionsDir, (err) => {
            if (err)  console.log(err);
        });
        fs.readdir(assets, (err, files) => {
            if (err)  console.log(err);
            files.forEach(file => {

                let copyDir = path.join(assetsCopy, file);
                let asDir = path.join(assets, file);

                fs.mkdir(copyDir, optionsDir, (err) => {
                    if (err)  console.log(err);
                });

                fs.readdir(asDir, (err, asfiles) => {
                    if (err)  console.log(err);
                    asfiles.forEach(cfile => {
                        fs.copyFile(path.join(asDir, cfile), path.join(copyDir, cfile), (error) => {
                                if (error)  console.log(error);
                            });
                    })
                });
            })
        });
    });
});


