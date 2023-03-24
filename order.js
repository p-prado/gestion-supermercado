window.addEventListener('load', ()=> {
    const title = document.getElementById("title");
    const skuControl = document.getElementById("skuControl");
    const nameControl = document.getElementById("nameControl");
    const providerControl = document.getElementById("providerControl");
    const qtyControl = document.getElementById("qtyControl");


    window.comm.newOrderWindow(function (event, product) {
        console.log('LOGGING FROM ORDER JS WINDOW.COMM.NEWORDERWINDOW(...)');
        console.log(product);
        skuControl.value = product.sku;
        nameControl.value = product.name;
    });
})    
