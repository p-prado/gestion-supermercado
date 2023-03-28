const {ipcRenderer, contextBridge} = require('electron');

contextBridge.exposeInMainWorld(
    "comm",
    {
        validateLogin: (email, password) => ipcRenderer.send('validateLogin', email, password)
        ,
        getProductsFromDB: () => ipcRenderer.send('getProductsFromDB')
        ,
        productsFromDB: (products) => ipcRenderer.on('productsFromDB', products)
        ,
        updateProduct: (product) => ipcRenderer.send('updateProduct', product)
        ,
        newOrderButtonClick: (product) => ipcRenderer.send('newOrderButtonClick', product)
        ,
        newOrderWindow: (product, results) => ipcRenderer.on('newOrderWindow', product, results)
        ,
        insertNewOrder: (order) => ipcRenderer.send('insertNewOrder', order)
        ,
        editButtonClick: (product) => ipcRenderer.send('editButtonClick', product)
        ,
        newEditWindow: (product) => ipcRenderer.on('newEditWindow', product)
        ,
        backToProductsWindow: () => ipcRenderer.send('backToProductsWindow')
    }
);