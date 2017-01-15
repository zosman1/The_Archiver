const fs = require('fs')
const mv = require('mv')

function test () {
  console.log('hi')
}

const testFolder = './tests/'
fs.readdir(testFolder, (err, files) => {
  files.forEach(file => {
    console.log(file)
  })
})

// mv('/Users/ZachO/Code/The_Archiver/tests/test1.txt', '/Users/ZachO/Code/The_Archiver/test1.txt', function (err) {
//   console.log('Error in file ')
// })

// mv('/tests/test1.txt', 'test1.txt', function (err) {
//   console.log('Error in file moving')
// })

function down () {
  mv('/Users/ZachO/Code/The_Archiver/tests/test1.txt', '/Users/ZachO/Code/The_Archiver/test1.txt', function (err) {
    if (typeof err !== 'undefined') {
        // the variable is defined
        console.log('error on down function')
        console.log(err.code)
    }
    else {
      console.log('down function completed succesfully')
    }
  })
}
function up () {
  mv('/Users/ZachO/Code/The_Archiver/test1.txt', '/Users/ZachO/Code/The_Archiver/tests/test1.txt', function (err) {
    if (typeof err !== 'undefined') {
        // the variable is defined
        console.log('error on up function')
        console.log(err.code)
    }
    else {
      console.log('up function completed succesfully')
    }
  })
}
function translate () {
  //translate err.code responces into plain english
}
