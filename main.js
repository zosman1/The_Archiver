const fs = require('fs-extra')
let lastDone = 'up' // imporant var used around main.js

function sayHello () {
  console.log('Hello World!')
}

const awayFolder = '/Volumes/Samsung_T3/Test_Folder/'
const homeFolder = '/Users/ZachO/Code/The_Archiver/vmTests/'

var filesList = []
fs.readdir(awayFolder, (err, files) => {
  files.forEach(file => {
    console.log(file)
    filesList.push(file)
  })
})

function down () {
  if (lastDone == 'down') {
    notifyUser('The Files Are Currently Down On The Local Machine.', 'blue', 2500)
  } else {
    lastDone = 'down'
    filesList.forEach(function (file) {
      fs.move(awayFolder + file, homeFolder + file, function (err) {
        if (err != null) {
            // the variable is defined
          console.log('error on down function file: ' + file)
          // printing what file this failed on
          console.log(err)
          // printing the error code
          notifyUser('Down function has failed', 'red')
          // notifying the frontend that something has gone wrong, oops
        } else {
          console.log('down function completed succesfully on file: ' + file)
          notifyUser('The File Have Succesfully Been Moved Down To The Local Machine!', 'grey', 7000)
        }
      })
    })
  }
}

function up () {
  if (lastDone == 'up') {
    notifyUser('The Files Are Currently Up On The External Drive.', 'blue', 2500)
  } else {
    lastDone = 'up'
    filesList.forEach(function (file) {
      fs.move(homeFolder + file, awayFolder + file, function (err) {
        if (err != null) {
            // the variable is defined
          console.log('error on down function file: ' + file)
          // printing what file this failed on
          console.log(err)
          // printing the error code
          notifyUser('Up function has failed', 'red')
          // notifying the frontend that something has gone wrong, oops
        } else {
          console.log('up function completed succesfully on file: ' + file)
          notifyUser('The File Have Succesfully Been Moved Up To The External Drive!', 'grey', 7000)
        }
      })
    })
  }
}

// DEPRECIATED FUNCTIONS USED FOR CONCEPTUAL TESTING
// function onedown () {
//   mv('/Users/ZachO/Code/The_Archiver/tests/test1.txt', '/Users/ZachO/Code/The_Archiver/test1.txt', function (err) {
//     if (typeof err !== 'undefined') {
//         // the variable is defined
//       console.log('error on down function')
//       console.log(translate(err.code))
//     } else {
//       console.log('down function completed succesfully')
//     }
//   })
// }
//
// function oneup () {
//   mv('/Users/ZachO/Code/The_Archiver/test1.txt', '/Users/ZachO/Code/The_Archiver/tests/test1.txt', function (err) {
//     if (typeof err !== 'undefined') {
//         // the variable is defined
//       console.log('error on up function')
//       console.log(translate(err.code))
//     } else {
//       console.log('up function completed succesfully')
//     }
//   })
// }

function translate (statement) {
  // translate err responces into plain english
  // will need to be rewritten due to changed library
  switch (statement) {
    case 'ENOENT':
      return 'ERROR: Code can not find the file to move'
      break
    case 'Zosman':
      return 'topkek'
      break
    default:
      return ('error code "' + statement + '" is not in the translate function')
  }
}

// This function sends a notifcation to the main screen to notify the user of something
function notifyUser (content, color, time) {
  // color will be a value acceptable by css
  // content will be the actual text
  document.getElementById('userNotification').innerHTML = ("<h5 style = 'font-weight: 400; color:" + color + "'>" + content + '</h5>')
  clearNotifications(time)
  // for now will keep this as a seperate class
}

// This function will clear notifcations from the main screen
function clearNotifications (time) {
  let running = true
  // FUTURE NOTE: will want to make notification fade out to improve ux
  // Takes in tiem as miliseconds ex: 1000 = 1 second
  if (running = true){
    // currently doesent do anything
    // present issue, runs over itself.
    // fix: will have to kill the proccess when its reactived and its not done and start it over
    setTimeout(function () {
      document.getElementById('userNotification').innerHTML = ('')
    }, time)
  }
}
