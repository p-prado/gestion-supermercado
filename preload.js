const {ipcRenderer, contextBridge} = require('electron');

contextBridge.exposeInMainWorld(
    "comm",
    {
        newOrderButtonClick: (product) => ipcRenderer.send('newOrderButtonClick', product)
        ,
        newOrderWindow: (product) => ipcRenderer.on('newOrderWindow', product)
    }
);