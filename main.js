const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

let window;
function createWindow() {
    window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            //   contextIsolation: false,
            preload: path.join(__dirname, 'preload.js')
        }
    });
    window.loadFile("products.html");
}

// Create new order window
let orderWindow;
function createOrderWindow() {
    orderWindow = new BrowserWindow({
        parent: window,
        modal: true,
        width: 700,
        height: 550,
        webPreferences: {
            preload: path.join(app.getAppPath(), 'preload.js')
        }
    });
    orderWindow.loadFile('order.html');
}

let editWindow;
function createEditWindow() {
    editWindow = new BrowserWindow({
        parent: window,
        modal: true,
        width: 700,
        height: 550,
        webPreferences: {
            preload: path.join(app.getAppPath(), 'preload.js')
        }
    });
    editWindow.loadFile('edit.html');
}

app.whenReady().then(createWindow);

ipcMain.on('newOrderButtonClick', function (event, product) {
    console.log(product);
    createOrderWindow();
    orderWindow.webContents.on('did-finish-load', function () {
        orderWindow.webContents.send('newOrderWindow', product);
    });
});

ipcMain.on('editButtonClick', function (event, product) {
    console.log(product);
    createEditWindow();
    editWindow.webContents.on('did-finish-load', function () {
        editWindow.webContents.send('newEditWindow', product);
    });
});

ipcMain.on('backToProductsWindow', function(){
    editWindow.close();
})