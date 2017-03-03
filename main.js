const fs = require('fs')
const mv = require('mv')
let lastDone = 'up' // imporant var used around main.js
function sayHi () {
  console.log('Hai There!')
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
  if (lastDone == 'down') {
    notifyUser('The Files Are Currently Down On The Local Machine.', 'blue')
  } else {
    lastDone = 'down'
    filesList.forEach(function (file) {
      mv('/Users/ZachO/Code/The_Archiver/tests/' + file, '/Users/ZachO/Code/The_Archiver/' + file, function (err) {
        if (typeof err !== 'undefined') {
            // the variable is defined
          console.log('error on down function file: ' + file)
          // printing the translation of the error code
          console.log(translate(err.code))
          // printing the tranlation of the error code
          notifyUser('Down function has failed', 'red')
          // notifying the frontend that something has gone wrong, oops
        } else {
          console.log('down function completed succesfully on file: ' + file)
          clearNotifications()
        }
      })
    })
  }
}
function up () {
  if (lastDone == 'up') {
    notifyUser('The Files Are Currently Up On The External Drive', 'blue')
  } else {
    lastDone = 'up'
    filesList.forEach(function (file) {
      mv('/Users/ZachO/Code/The_Archiver/' + file, '/Users/ZachO/Code/The_Archiver/tests/' + file, function (err) {
        if (typeof err !== 'undefined') {
            // the variable is defined
          console.log('error on down function file: ' + file)
          // printing an error statment on what file errored
          console.log(translate(err.code))
          // printing the tranlation of the error code
          notifyUser('Up function has failed', 'red')
          // notifying the frontend that something has gone wrong, oops
        } else {
          console.log('up function completed succesfully on file: ' + file)
          clearNotifications()
        }
      })
    })
  }
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
// this function sends a notifcation to the main screen to notify the user of something
function notifyUser (content, color) {
  // color will be a #FFFFFF style input
  // content will be the actual text
  document.getElementById('userNotification').innerHTML = ("<h5 style = 'color:" + color + "'>" + content + '</h5>')
}
// this function will clear notifcations from the main screen
function clearNotifications () {
  document.getElementById('userNotification').innerHTML = ('')
}
