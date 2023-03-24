window.addEventListener('load', ()=> {
    const title = document.getElementById("title");
    const skuControl = document.getElementById("skuControl");
    const nameControl = document.getElementById("nameControl");
    const descriptionControl = document.getElementById("descriptionControl");
    const categoryControl = document.getElementById("categoryControl");
    const stockControl = document.getElementById("stockControl");
    const saveButton = document.getElementById("saveButton");
    const cancelButton = document.getElementById("cancelButton");

    window.comm.newEditWindow(function (event, product) {
        console.log('LOGGING FROM ORDER JS WINDOW.COMM.NEWORDERWINDOW(...)');
        console.log(product);
        skuControl.value = product.sku;
        nameControl.value = product.name;
        descriptionControl.value = product.description;
        categoryControl.value = product.category;
        stockControl.value = product.stock;
    });

    cancelButton.addEventListener("click", function(){
        window.comm.backToProductsWindow();
    })
})    
