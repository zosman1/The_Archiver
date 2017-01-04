const fs = require('fs');

function test() {
  										console.log('hi');
}

const testFolder = './tests/';
fs.readdir(testFolder, (err, files) => {
  										files.forEach(file => {
    										console.log(file);
  });
});
