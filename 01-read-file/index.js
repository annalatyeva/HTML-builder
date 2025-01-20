const fs = require('fs');
const path = require('path');
const { stdout, stderr } = process;
const textPath = path.join(__dirname, 'text.txt');
const readableStream = fs.createReadStream(textPath, 'utf-8');
readableStream.on('error', (err) => {
  stderr.write(`Error reading file: ${err.message}\n`);
});
readableStream.on('data', (chunk) => stdout.write(chunk));
