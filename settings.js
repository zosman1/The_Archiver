const settings = require('electron-settings');
const main = require('./main.js');

function submitSettings() {
  const homePath = document.getElementById('homePath').value;
  const awayPath = document.getElementById('awayPath').value;
  settings.set('paths', {
    home: homePath,
    away: awayPath,
  }).then(() => {
    settings.get('paths.home').then((val) => {
      console.log(`homePath: ${val}`);
    });
  }).then(() => {
    settings.get('paths.away').then((val) => {
      console.log(`awayPath: ${val}`);
    });
  }).then(() => {
    document.getElementById('homePath').value = '';
    document.getElementById('awayPath').value = '';
    main.notifyUser('Settings Succesfully Changed!', 'lightblue', 5000);
  });
}
