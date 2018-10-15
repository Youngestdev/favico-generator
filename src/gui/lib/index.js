const fs = require('fs');
const os = require('os');
const path = require('path');
const request = require('request');
const im = require('imagemagick');

const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'favico-'));

/**
 * Download files from a remote location
 *
 * @param {string} uri
 * @returns Promise<string>
 */
const downloadFile = uri =>
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

/**
 * Convert an image to other format
 *
 * @param {string} source
 * @param {string} [output='favico.ico']
 * @param {string} [args=['-resize', '160x160']]
 * @returns Promise
 */
const convertImage = (
  source,
  output = 'favico.ico',
  args = ['-resize', '160x160']
) =>
  new Promise((resolve, reject) => {
    im.convert([source, ...args, output], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });

/**
 * @param {String} from
 * @param {String} [to='favico.ico']
 * @param {Array<String>}  [resize='160x160']
 */
module.exports = (from, to = 'favico.ico', resize = '160x160') =>
  fs.existsSync(from)
    ? convertImage(from, to, ['-resize', resize])
    : downloadFile(from).then(file =>
        convertImage(file, to, ['-resize', resize])
      );
