// eslint-disable-next-line import/no-extraneous-dependencies
const electron = require('electron');
const path = require('path');

const app = electron.app;
const dialog = electron.dialog;
const ipc = electron.ipcMain;


// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

// prevent window being garbage collected
let mainWindow;
let willQuitApp;

 // eslint-disable-next-line no-unused-vars
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
        icon: path.join(__dirname, 'assets/icons/png/64x64.png'),
    });

    win.loadURL(`file://${__dirname}/index.html`);
  // win.on("closed", onClosed);
    win.on('close', (event) => {
        if (process.platform === 'darwin') {
            if (willQuitApp) {
        // the user tried to quit the app
                mainWindow = null;
            } else {
        // the user only tried to close the window
                event.preventDefault();
                win.hide();
            }
        } else {
            app.quit();
        }
    });


    return win;
}

app.on('window-all-closed', () => {
    app.quit();
});

app.on('activate', () => {
    mainWindow.show();
});

app.on('ready', () => {
    mainWindow = createMainWindow();
});

app.on('before-quit', () => {
    willQuitApp = true;
});

ipc.on('error-move', (event, args) => {
    dialog.showErrorBox('Oops! An Error Has Occurred!', `An error has occurred in the ${args.direction} function: ${args.error}`);
    console.log(args.error);
});

ipc.on('show-app', () => {
    mainWindow.show();
});
