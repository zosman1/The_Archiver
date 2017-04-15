const electron = require("electron");
const path = require("path");

const app = electron.app;
const dialog = electron.dialog;
const ipc = electron.ipcMain;



// adds debug features like hotkeys for triggering dev tools and reload
require("electron-debug")();

// prevent window being garbage collected
let mainWindow;

function onClosed() {
  // dereference the window
  // for multiple windows store them in an array
	mainWindow = null;
}

function createMainWindow() {
	const win = new electron.BrowserWindow({
		width: 600,
		minWidth: 400,
		height: 400,
		minHeight: 350,
		icon: path.join(__dirname, "assets/icons/png/64x64.png")
	});

	win.loadURL(`file://${__dirname}/index.html`);
	win.on("closed", onClosed);

	return win;
}

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	if (!mainWindow) {
		mainWindow = createMainWindow();
	}
});

app.on("ready", () => {
	mainWindow = createMainWindow();
});

ipc.on("error-down", function () {
	dialog.showErrorBox("An Error Has Occurred!", "An error has occurred in the down function, please check console for more info. ");
});

ipc.on("error-up", function () {
	dialog.showErrorBox("An Error Has Occurred!", "An error has occurred in the up function, please check console for more info. ");
});