// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron');

const $ = require('./jquery-3.2.1.min.js');

const ipcMain = require('electron').ipcMain;
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

ipcMain.on('getMsg', function(sys, msg){
    console.log(msg)  //接收窗口传来的消息
});

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600});

  // and load the index.html of the app.
  mainWindow.on('close', function () { mainWindow = null });

  //加载文件
  mainWindow.loadFile('app/index.html');



  // mainWindow.loadURL('http://m.allinmd.cn');
  //打开控制台

    mainWindow.webContents.openDevTools();

  //显示窗口
  mainWindow.show();
  mainWindow.webContents.on('did-finish-load', function(){
      mainWindow.webContents.send('ping', mainWindow.webContents);
  });
  var presWindow = new BrowserWindow({
        width: 300,
        height: 300,
        show: false
  });

  presWindow.loadFile('app/newPage.html');

  ipcMain.on('show',function() {
      presWindow.show()
  });

  ipcMain.on('hide',function() {
      presWindow.hide()
  });

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
//app生命周期
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  // if (process.platform !== 'darwin') {
    app.quit()
  // }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
