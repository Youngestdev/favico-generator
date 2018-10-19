const im = require('imagemagick');

/**
 * Convert an image to other format
 *
 * @param {string} source
 * @param {string} [output='favico.ico']
 * @param {string} [args=['-resize', '160x160']]
 * @returns Promise
 */
module.exports = (
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
