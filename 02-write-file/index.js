const fs = require('fs');
const { stdin, stdout, stderr } = process;
const filePath = require('path').join(__dirname, 'yourText.txt');
const output = fs.createWriteStream(filePath);
stdout.write('Enter your text:\n');
stdin.on('data', (chunk) => {
  if (chunk.toString().trim() === 'exit') {
    process.exit();
  }
  output.write(chunk);
});
process.on('SIGINT', () => {
  process.exit();
});
stdin.on('error', (err) => {
  stderr.write(`Error reading file: ${err.message}\n`);
});
process.on('exit', () =>
  stdout.write('The text was written to the yourText.txt.\n'),
);
