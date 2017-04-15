const settings = require("electron-settings");
const main = require("./main.js");

// eslint-disable-next-line no-unused-vars
function submitSettings() {
	const homePath = document.getElementById("homePath").value;
	const awayPath = document.getElementById("awayPath").value;
	settings.set("path", {
		home: homePath,
		away: awayPath,
	});
	document.getElementById("homePath").value = "";
	document.getElementById("awayPath").value = "";
	main.notifyUser("Settings Succesfully Changed!", "lightblue", 5000);
}

console.log(settings.getAll());