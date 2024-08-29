const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'largefile.txt');

function readFile() {
    console.time('fs.readFile');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        console.timeEnd('fs.readFile');
    });
}

function readStream() {
    console.time('stream');
    const stream = fs.createReadStream(filePath, { encoding: 'utf8' });
    stream.on('data', () => {}); 
    stream.on('end', () => {
        console.timeEnd('stream');
    });
    stream.on('error', (err) => {
        console.error(err);
    });
}


readFile();
readStream();
