const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const { pipeline } = require('stream');
const { promisify } = require('util');
const pipelineAsync = promisify(pipeline);

const filesFolderPath = path.join(__dirname, 'files');
const filesCopyFolderPath = path.join(__dirname, 'files_copy');

function createFileFunc() {
  const filePath = path.join(filesFolderPath, 'fresh.txt');
  if (fs.existsSync(filePath)) {
    console.log('CREATE operation failed');
    return;
  }

  fs.mkdirSync(filesFolderPath, { recursive: true });
  fs.writeFileSync(filePath, 'Свіжий і бадьорий');
  console.log('File created successfully');
}

function copyFilesFunc() {
  if (!fs.existsSync(filesFolderPath) || fs.existsSync(filesCopyFolderPath)) {
    console.log('COPY operation failed');
    return;
  }

  fs.cpSync(filesFolderPath, filesCopyFolderPath, { recursive: true });
  console.log('Files copied successfully');
}

function renameFileFunc() {
  const oldFilePath = path.join(filesFolderPath, 'wrongFilename.txt');
  const newFilePath = path.join(filesFolderPath, 'properFilename.md');

  if (!fs.existsSync(oldFilePath) || fs.existsSync(newFilePath)) {
    console.log('RENAME operation failed');
    return;
  }

  fs.renameSync(oldFilePath, newFilePath);
  console.log('File renamed successfully');
}

function deleteFileFunc() {
  const filePath = path.join(filesFolderPath, 'fileToRemove.txt');

  if (!fs.existsSync(filePath)) {
    console.log('DELETE operation failed');
    return;
  }

  fs.unlinkSync(filePath);
  console.log('File deleted successfully');
}

function listFilesFunc() {
  if (!fs.existsSync(filesFolderPath)) {
    console.log('LIST operation failed');
    return;
  }

  const files = fs.readdirSync(filesFolderPath);
  files.forEach(file => console.log(file));
}

function readFileFunc() {
  const filePath = path.join(filesFolderPath, 'fileToRead.txt');

  if (!fs.existsSync(filePath)) {
    console.log('READ operation failed');
    return;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  console.log(content);
}

function readStreamFunc() {
  const filePath = path.join(filesFolderPath, 'fileToRead.txt');

  if (!fs.existsSync(filePath)) {
    console.log('READ STREAM operation failed');
    return;
  }

  const readStream = fs.createReadStream(filePath, 'utf8');
  readStream.on('data', chunk => console.log(chunk));
  readStream.on('error', () => console.log('READ STREAM operation failed'));
}

function writeStreamFunc(content) {
  const filePath = path.join(filesFolderPath, 'fileToWrite.txt');

  if (fs.existsSync(filePath)) {
    console.log('WRITE STREAM operation failed');
    return;
  }

  const writeStream = fs.createWriteStream(filePath);
  writeStream.write(content, 'utf8');
  writeStream.end();
  console.log('Content written successfully');
}

async function compressFunc() {
  const inputFilePath = path.join(filesFolderPath, 'fileToCompress.txt');
  const outputFolderPath = path.join(__dirname, 'archives');
  const outputFilePath = path.join(outputFolderPath, 'archive.gz');

  if (!fs.existsSync(inputFilePath) || fs.existsSync(outputFilePath)) {
    console.log('COMPRESS operation failed');
    return;
  }

  fs.mkdirSync(outputFolderPath, { recursive: true });

  const readStream = fs.createReadStream(inputFilePath);
  const gzipStream = zlib.createGzip();
  const writeStream = fs.createWriteStream(outputFilePath);

  try {
    await pipelineAsync(readStream, gzipStream, writeStream);
    console.log('File compressed successfully');
  } catch (err) {
    console.log('COMPRESS operation failed');
  }
}

// Demonstrating the functions
createFileFunc();
copyFilesFunc();
renameFileFunc();
deleteFileFunc();
listFilesFunc();
readFileFunc();
readStreamFunc();
writeStreamFunc('This is some content to write.');
compressFunc();
