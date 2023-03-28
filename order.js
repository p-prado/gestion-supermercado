window.addEventListener('load', ()=> {
    const title = document.getElementById("title");
    const skuControl = document.getElementById("skuControl");
    const nameControl = document.getElementById("nameControl");
    const providerControl = document.getElementById("providerControl");
    const qtyControl = document.getElementById("qtyControl");
    const orderForm = document.getElementById("orderForm");

    window.comm.newOrderWindow(function (event, product, providers) {
        console.log(product);
        console.log(providers);
        console.log(event);
        skuControl.value = product.sku;
        nameControl.value = product.name;
        providers.forEach(provider => {
            providerControl.insertAdjacentHTML(
                "beforeend",
                `<option value="${provider.idproveedor}">${provider.idproveedor} - ${provider.nombre}</option>`
                );
        });
    });

    orderForm.addEventListener("submit", function(event){
        event.preventDefault();
        if (qtyControl.value === ""|| providerControl.value === "") {
         // Show errors on missing fields
        } else {
            let order = {
                "sku": skuControl.value,
                "quantity": qtyControl.value,
                "provider": providerControl.value,
            }
            window.comm.insertNewOrder(order);
        }
    });
});