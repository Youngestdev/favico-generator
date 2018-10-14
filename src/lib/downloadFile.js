const fs = require('fs');
const os = require('os');
const path = require('path');
const request = require('request');
const { name } = require('../../package.json');

const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), `${name}-`));

/**
 * Download files from a remote location
 *
 * @param {string} uri
 * @returns Promise<string>
 */
module.exports = uri =>
  new Promise((resolve, reject) => {
    const filename = path.basename(uri);
    const writableStream = fs.createWriteStream(path.join(tempDir, filename));
    const onError = err => {
      fs.unlink(writableStream);
      reject(new Error(err.message));
    };

    request
      .get(uri)
      .on('error', onError)
      .pipe(writableStream);

    writableStream.on('close', () => {
      writableStream.close();
      resolve(writableStream.path);
    });
    writableStream.on('error', onError);
  });
