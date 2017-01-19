const electron = require('electron')
const path = require('path')
const cwd  = path.join(__dirname, '.');
const child_process = require('child_process');
child_process.execFile('node', [path.join(cwd, '/node_modules/whistle/bin/whistle.js'), 'start'], {
	env: {'PATH':'/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin'}
}, function(err, res){
	if(err) throw err;
})
// const ls = spawn('ls', ['-lh', '/usr']);
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
const url = require('url')
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow() {
    // Create the browser window.

    mainWindow = new BrowserWindow({
        width: 800,
        height: 600
    })
    // and load the index.html of the app.
    // mainWindow.loadURL(url.format({
    //   pathname: path.join(__dirname, 'index.html'),
    //   protocol: 'file:',
    //   slashes: true
    // }))
    mainWindow.loadURL("http://127.0.0.1:8899/");
    // window.loadURL('https://github.com')
    // Open the DevTools.
//    mainWindow.webContents.openDevTools()
    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function(){
    setTimeout(createWindow,350);
})
	// Quit when all windows are closed.
app.on('window-all-closed', function() {
	/*
	var args = ['./node_modules/whistle/bin/whistle.js', 'stop'];
	run('node', args, function(err){
	  if(err){
	    console.error('node stop failed!');
	    process.exit(1);
	  }
	  console.log('node stopped!');
	});*/
	child_process.execFile('node', [path.join(cwd, '/node_modules/whistle/bin/whistle.js'), 'stop'], {
		env: {'PATH':'/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin'}
	}, function(err, res){
		if(err) throw err;
	});
//		// On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
})
