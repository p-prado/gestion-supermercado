const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const mysql = require('mysql2');

// Create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'supermercado'
});

let mainWindow;
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            //   contextIsolation: false,
            preload: path.join(__dirname, 'preload.js')
        }
    });
    // mainWindow.loadFile("login.html");
    mainWindow.loadFile("products.html");
}

// Create new order window
let orderWindow;
function createOrderWindow() {
    orderWindow = new BrowserWindow({
        parent: mainWindow,
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
        parent: mainWindow,
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
    connection.query(
        'SELECT proveedor_has_producto.sku, proveedor.idproveedor, proveedor.nombre FROM proveedor_has_producto JOIN proveedor ON proveedor_has_producto.idproveedor = proveedor.idproveedor WHERE sku = ?;',
        [product.sku],
        function (err, results) {
            if (err) {
                console.log(err);
            } else {
                createOrderWindow();
                orderWindow.webContents.on('did-finish-load', function (event) {
                    // Send product info and providers
                    orderWindow.webContents.send('newOrderWindow', product, results);
                });
            }
        });
});

ipcMain.on('editButtonClick', function (event, product) {
    createEditWindow();
    editWindow.webContents.on('did-finish-load', function () {
        editWindow.webContents.send('newEditWindow', product);
    });
});

ipcMain.on('backToProductsWindow', function () {
    editWindow.close();
})

// Validate login
ipcMain.on('validateLogin', function (event, email, password) {
    connection.query(
        'SELECT * FROM empleado WHERE email = ? LIMIT 1;',
        [email],
        function (err, results) {
            if (err) {
                console.log(err);
            } else {
                // If the results are empty, no user was found for the email.
                if (!results[0]) {
                    console.log("No user found for that email.");
                } else {
                    // If the email was found in the database, check if the password matches.s
                    if (password === results[0].password) {
                        // If the password doesn't match, show error.
                        console.log("Successfull login!");
                        mainWindow.loadFile("products.html");
                    } else {
                        // If the passwords match, load the products page.
                        console.log("Login failed. Wrong password.");
                    }
                }
            }
        }
    )
});

ipcMain.on('getProductsFromDB', function () {
    connection.query(
        'SELECT * FROM producto;',
        function (err, results) {
            mainWindow.webContents.send('productsFromDB', results);
        }
    );
});

ipcMain.on('updateProduct', function (event, product) {
    connection.query(
        'UPDATE producto SET nombre = ?, descripción = ?, categoría = ?, existencia = ? WHERE sku = ?;',
        [product.name, product.description, product.category, product.stock, product.sku],
        function (err) {
            if (err) {
                console.log(err);
            } else {
                // Close the edit window, reload the products window.
                mainWindow.reload();
                editWindow.close();
            }
        }
    )
});

ipcMain.on('insertNewOrder', function (event, order) {
    connection.query(
        'INSERT INTO pedido (sku, cantidad, idproveedor) VALUES (?,?,?)',
        [order.sku, order.quantity, order.provider],
        function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log("Successfully inserted new order into database!");
                orderWindow.close();
            }
        }
    )
})