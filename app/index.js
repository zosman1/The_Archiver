const fs = require("fs-extra");
const settings = require("electron-settings");
const ipc = require("electron").ipcRenderer;

let ready = false;
let filelocation = "up";
const debug = true;

function init() {
	if (settings.has("path.home") && settings.has("path.away")) {
		ready = true;
	}
}
init();

 // eslint-disable-next-line no-unused-vars
function moveFiles(direction){
	let fileArgs = {
		up: ["path.home", "path.away"], 
		down: ["path.away", "path.home"]
	};
	if (!ready) return;
	if (direction != filelocation){
		ready = false;
		fs.move(settings.get(fileArgs[direction][0]), settings.get(fileArgs[direction][1]), (err) => {
			handleCallback(err, direction);
			if (!err){
				filelocation = direction;
				notifyUserNative("The Archiver", "File moving has been completed!");
			}
			ready = true;
		});
	} else {
		notifyUser(`Files are already ${direction}!`, "#0081ef", 6000);
	}
}

 // eslint-disable-next-line no-unused-vars
function handleCallback(err, direction){
	let notifyMessage = {
		down: ["The Virtual Machine Has Been Moved Down Onto The Local Drive!", "#0081ef", 7000],
		up: ["The Virtual Machine Has Been Moved Up Onto The External Drive!", "#0081ef", 7000]
	};
	let ifError = false;
	if (err) {
		// Error callback
		if (debug) {
			console.error(`Error on moving ${direction} function: ${err}`);
			// ipc.send(ipcMessage[direction]);
			ipc.send("error-move", {direction: direction, error:err});
		}
		ifError = true;
	}
	else {
		if (!ifError) {
			notifyUser.apply({}, notifyMessage[direction]);
		}
	}
}

// Notify users via HTML Functions
let runningNotifications = [];
function notifyUser(content, color, time) {
	runningNotifications.push([content, color]);
	setTimeout(function() {
		runningNotifications.shift();
		updateDisplay();
	}, time);
	updateDisplay();
}
module.exports.notifyUser = notifyUser;

function updateDisplay() {
	var notifElem = document.getElementById("userNotification");
	if (runningNotifications.length) {
		var [content, color] = runningNotifications[0];
		notifElem.innerHTML = (`<h5 style = 'margin-top: 5px;font-weight: 300; color:${color}'>${content}</h5>`);
	} else {
		notifElem.innerHTML = ("");
	}
}
// End notify via HTML functions
function notifyUserNative(title, body){

	let myNotification = new Notification(title, {body: body});

	myNotification.onclick = () => {
		ipc.send("show-app");
	};
}