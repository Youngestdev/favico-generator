#!/usr/bin/env node

/*
Favico Generator.. Generates Favicons from Image files by Abdul <laisibizness@gmail.com>
*/

//  Lets start the party over here..

const im = require('imagemagick');
const fs = require('fs');
const argv = require('yargs')
  .usage('Usage: $0 option filename \n e.g $0 -f image.png')
  .alias('f', 'file')
  .nargs('f', 1)
  .describe('f', 'Loads file to be converted to favico')
  .demandOption(['f'])
  .help('h')
  .alias('h', 'help')
  .epilog('Copyright Abdul 2017')
  .argv;

const s = fs.createReadStream(argv.file);

const convert = s.on('data', (buf) => im.convert([
  argv.file, '-resize', '160x160', 'favico.ico'
], function (err, stdout) {
  if (err) 
    throw err;
    //   console.log('stdout:',  stdout);
  }
));

s.on('end', () => console.log('Success, File saved as "favico.ico in ' + process.cwd()));
