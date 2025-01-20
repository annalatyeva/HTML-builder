const fs = require('fs').promises;
const path = require('path');
const { stdout, stderr } = process;
const filePath = path.join(__dirname, 'secret-folder');

async function readDirectory() {
  try {
    const files = await fs.readdir(filePath, { withFileTypes: true });
    for (const file of files) {
      if (file.isFile()) {
        const stats = await fs.stat(path.join(filePath, file.name));
        const fileNameWithoutExt = file.name.slice(0, file.name.indexOf('.'));
        const fileExtension = path.extname(file.name).slice(1);
        const fileSizeInKb = stats.size / 1024;

        stdout.write(
          `${fileNameWithoutExt} - ${fileExtension} - ${fileSizeInKb}kb\n`,
        );
      }
    }
  } catch (err) {
    stderr.write(`Error: ${err.message}\n`);
  }
}

readDirectory();
