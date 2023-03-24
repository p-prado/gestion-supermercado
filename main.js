const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");


function createWindow() {
  const window = new BrowserWindow({
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
        // parent: ventana,
        // modal: true,
        width: 700,
        height: 550,
        webPreferences: {
            preload: path.join(app.getAppPath(), 'preload.js')
        }
    });
    orderWindow.loadFile('order.html');
}

app.whenReady().then(createWindow);

ipcMain.on('newOrderButtonClick', function(event, product){
    console.log(product);
    createOrderWindow();
    orderWindow.webContents.send('newOrderWindow', product);
});