const fs = require('fs');

const convertImage = require('./convertImage');
const downloadFile = require('./downloadFile');

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
