const fs = require("fs-extra");
const settings = require("electron-settings");
const path = require("path");
const ipc = require("electron").ipcRenderer;

let ready = false;
let filelocation = "up";
const debug = true;
function init() {
	return new Promise((resolve, reject) => {
		if (settings.has("path.home") && settings.has("path.away")) {
			fs.readdir(settings.get("path.away"), (err, files) => {
				if (err) {
					reject(err);
					return;
				}
				resolve(files);
			});
			ready = true;
		}
	});
}
let files;
init().then(res => {
	files = res;
}).catch(err => {
	console.error(err);
});
// eslint-disable-next-line no-unused-vars
function down() {
	if (ready){
		if (filelocation == "down") {
			notifyUser("The Virtual Machine is currently down on the local machine!", "lightblue", 3000);
		} else {
			filelocation = "down";
			let ifError = false;
			files.forEach((file) => {
				fs.move(path.join(settings.get("path.away"), file), path.join(settings.get("path.home"), file), (err) => {
					if (err != null) {
                    // Error callback
						if (debug) {
							console.log(" ");
							console.log(err);
							console.log(`Error on down function, File: ${file}`);
							console.log(" ");
						}
						ifError = true;
					}
				});
			});
			if (!ifError) {
				notifyUser("The Virtual Machine Has Been Moved Down Onto The Local Machine!", "darkgrey", 7000);
			} else if (debug) {
				ipc.send("error-down");
			}
		}
	}
}
// eslint-disable-next-line no-unused-vars
function up() {
	if (ready){
		if (filelocation == "up") {
			notifyUser("The Virtual Machine is currently on the local machine!", "lightblue", 3000);
		} else {
			filelocation = "up";
			let ifError = false;
			files.forEach((file) => {
				fs.move(path.join(settings.get("path.home"), file), path.join(settings.get("path.away"), file), (err) => {
					if (err != null) {
                    // Error callback
                    // electronerror()
						if (debug) {
							console.log(" ");
							console.log(err);
							console.log(`Error on up function, File: ${file}`);
							console.log(" ");
						}
						ifError = true;
					}
				});
			});
			if (!ifError) {
				notifyUser("The Virtual Machine Has Been Moved Up Onto The External Drive!", "darkgrey", 7000);
			} else if (debug) {
				ipc.send("error-up");
			}
		}
	}
}
let runningNotifications = [];
function notifyUser(content, color, time) {
	runningNotifications.push([content, color]);
	setTimeout(function() {
		runningNotifications.shift();
		updateDisplay();
	}, time);
	updateDisplay();
}
module.exports.notifyUser = function nU(content, color, time){
	notifyUser(content, color, time);
};
function updateDisplay() {
	var notifElem = document.getElementById("userNotification");
	if (runningNotifications.length) {
		var [content, color] = runningNotifications[0];
		notifElem.innerHTML = (`<h5 style = 'font-weight: 400; color:${color}'>${content}</h5>`);
	} else {
		notifElem.innerHTML = ("");
	}
}