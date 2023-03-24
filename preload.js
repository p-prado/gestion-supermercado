const {ipcRenderer, contextBridge} = require('electron');

contextBridge.exposeInMainWorld(
    "comm",
    {
        newOrderButtonClick: (product) => ipcRenderer.send('newOrderButtonClick', product)
        ,
        newOrderWindow: (product) => ipcRenderer.on('newOrderWindow', product)
        ,
        editButtonClick: (product) => ipcRenderer.send('editButtonClick', product)
        ,
        newEditWindow: (product) => ipcRenderer.on('newEditWindow', product)
        ,
        backToProductsWindow: () => ipcRenderer.send('backToProductsWindow')
    }
);