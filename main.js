const fs = require('fs')
const mv = require('mv')

function test () {
  console.log('hi')
}

const testFolder = '/Users/ZachO/Code/The_Archiver/tests'
var filesList = []
fs.readdir(testFolder, (err, files) => {
  files.forEach(file => {
    console.log(file)
    filesList.push(file)
  })
})
console.log(filesList)
// mv('/Users/ZachO/Code/The_Archiver/tests/test1.txt', '/Users/ZachO/Code/The_Archiver/test1.txt', function (err) {
//   console.log('Error in file ')
// })

// mv('/tests/test1.txt', 'test1.txt', function (err) {
//   console.log('Error in file moving')
// })
function down () {
  let dError = false
  filesList.forEach(function(file){
    mv('/Users/ZachO/Code/The_Archiver/tests/' + file, '/Users/ZachO/Code/The_Archiver/' + file, function (err) {
      if (typeof err !== 'undefined') {
          // the variable is defined
        console.log('error on down function file: ' + file)
        //printing the translation of the error code
        console.log(translate(err.code))
        dError = true
      } else {
        console.log('down function completed succesfully on file: ' + file)
      }
    })
  })
  // if (dError == true){
  //   document.getElementById('errorReadout').innerHTML = "<red style = 'color:red'>Down function failed</red>"
  // }
  // else{
  //   document.getElementById('errorReadout').innerHTML = "<blue style = 'color:lightblue'>Down function succeded</blue>"
  // } // MAKE THIS A FUNCTION // CURRENT ERROR WITH THIS IS THAT THE ASYNC FUNCTION SETS DERROR TO FALSE TOO LATE AND THIS FUNCTION HAS ALREADY BEEN DONE BY THE TIME IT GETS SET.
}
function up () {
  filesList.forEach(function(file){
    mv('/Users/ZachO/Code/The_Archiver/' + file, '/Users/ZachO/Code/The_Archiver/tests/' + file, function (err) {
      if (typeof err !== 'undefined') {
          // the variable is defined
        console.log('error on down function file: ' + file)
        //printing an error statment on what file errored
        console.log(translate(err.code))
        //printing the tranlation of the error code
      } else {
        console.log('up function completed succesfully on file: ' + file)
      }
    })
  })
}

function onedown () {
  mv('/Users/ZachO/Code/The_Archiver/tests/test1.txt', '/Users/ZachO/Code/The_Archiver/test1.txt', function (err) {
    if (typeof err !== 'undefined') {
        // the variable is defined
      console.log('error on down function')
      console.log(translate(err.code))
    } else {
      console.log('down function completed succesfully')
    }
  })
}
function oneup () {
  mv('/Users/ZachO/Code/The_Archiver/test1.txt', '/Users/ZachO/Code/The_Archiver/tests/test1.txt', function (err) {
    if (typeof err !== 'undefined') {
        // the variable is defined
      console.log('error on up function')
      console.log(translate(err.code))
    } else {
      console.log('up function completed succesfully')
    }
  })
}
function translate (statement) {
  // translate err.code responces into plain english
  switch (statement) {
    case 'ENOENT':
      return 'ERROR: Code can not find the file to move'
      break
    case 'randomshit':
      return 'kek'
      break
    default:
      return ('error code "' + statement + '" is not in the translate function')
  }
}
  function notifyUser (content, color){
    //color will be a #FFFFFF style input
    //content will be the actual text
  }
