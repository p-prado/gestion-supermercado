window.addEventListener('load', ()=> {
    const title = document.getElementById("title");

    window.comm.newOrderWindow(function (product) {
        console.log('LOGGING FROM ORDER JS WINDOW.COMM.NEWORDERWINDOW(...)');
        console.log(product);
        title.innerHTML = product.sku;
    });
})    
