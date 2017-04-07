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
		filelocation = direction;
		ready = false;
		fs.move(settings.get(fileArgs[direction][0]), settings.get(fileArgs[direction][1]), (err) => {
			errorHandle(err, direction);
			ready = true;
		});
	}		
}

 // eslint-disable-next-line no-unused-vars
function errorHandle(err, direction){
	let notifyMessage = {
		down: ["The Virtual Machine Has Been Moved Down Onto The Local Drive!", "darkgrey", 7000],
		up: ["The Virtual Machine Has Been Moved Up Onto The External Drive!", "darkgrey", 7000]
	};
	let ipcMessage = {
		down: "error-down",
		up: "error-up"
	};
	let ifError = false;
	if (err) {
		// Error callback
		if (debug) {
			console.error(`Error on moving ${direction} function: ${err}`);
			ipc.send(ipcMessage[direction]);
		}
		ifError = true;
	}
	else {
		if (!ifError) {
			notifyUser(notifyMessage[direction][0],notifyMessage[direction][1],notifyMessage[direction][2]);
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
		notifElem.innerHTML = (`<h5 style = 'font-weight: 400; color:${color}'>${content}</h5>`);
	} else {
		notifElem.innerHTML = ("");
	}
}
// End notify via HTML functions