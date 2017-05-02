// eslint-disable-next-line import/no-extraneous-dependencies
const ipc = require('electron').ipcRenderer;
const fs = require('fs-extra');
const settings = require('electron-settings');

let ready = false;
let filelocation = 'up';
const debug = true;

function init() {
    if (settings.has('path.home') && settings.has('path.away')) {
        ready = true;
    }
}
init();

// Update HTML display, to be used with notifyUser()
const runningNotifications = [];
function updateDisplay() {
    const notifElem = document.getElementById('userNotification');
    if (runningNotifications.length) {
        const [content, color] = runningNotifications[0];
        notifElem.innerHTML = (`<h5 style = 'margin-top: 5px;font-weight: 300; color:${color}'>${content}</h5>`);
    } else {
        notifElem.innerHTML = ('');
    }
}

// Notify users via HTML Functions
function notifyUser(content, color, time) {
    runningNotifications.push([content, color]);
    setTimeout(() => {
        runningNotifications.shift();
        updateDisplay();
    }, time);
    updateDisplay();
}
module.exports.notifyUser = notifyUser;

// End notify via HTML functions
function notifyUserNative(title, body) {
    const myNotification = new Notification(title, { body });

    myNotification.onclick = () => {
        ipc.send('show-app');
    };
}

function handleCallback(err, direction) {
    const notifyMessage = {
        down: ['The Virtual Machine Has Been Moved Down Onto The Local Drive!', '#0081ef', 7000],
        up: ['The Virtual Machine Has Been Moved Up Onto The External Drive!', '#0081ef', 7000],
    };
    let ifError = false;
    if (err) {
    // Error callback
        if (debug) {
            console.error(`Error on moving ${direction} function: ${err}`);
            ipc.send('error-move', { direction, error: String(err) });
        }
        ifError = true;
    } else if (!ifError) {
        notifyUser.apply({}, notifyMessage[direction]);
    }
}

// eslint-disable-next-line no-unused-vars
function moveFiles(direction) {
    const fileArgs = {
        up: ['path.home', 'path.away'],
        down: ['path.away', 'path.home'],
    };
    if (!ready) return;
    if (direction !== filelocation) {
        ready = false;
        fs.move(settings.get(fileArgs[direction][0]), settings.get(fileArgs[direction][1]), (err) => {
            handleCallback(err, direction);
            if (!err) {
                filelocation = direction;
                notifyUserNative('The Archiver', 'File moving has been completed!');
            }
            ready = true;
        });
    } else {
        notifyUser(`Files are already ${direction}!`, '#0081ef', 6000);
    }
}
