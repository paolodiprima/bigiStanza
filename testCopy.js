const path = require('path');

const fs = require('fs-extra');
console.log(path.resolve(__dirname,'prova1.txt'));
fs.copySync(path.resolve(__dirname,'prova1.txt'), 'prova3.txt');
// copySync('rootfile','destinationfile')