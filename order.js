window.addEventListener('load', ()=> {
    const title = document.getElementById("title");
    const skuControl = document.getElementById("skuControl");
    const nameControl = document.getElementById("nameControl");
    const providerControl = document.getElementById("providerControl");
    const qtyControl = document.getElementById("qtyControl");
    const orderForm = document.getElementById("orderForm");

    window.comm.newOrderWindow(function (event, product, providers) {
        console.log(product);
        skuControl.value = product.sku;
        nameControl.value = product.name;
        providers.forEach(provider => {
            providerControl.insertAdjacentElement(
                "beforeend",
                `<option value="${provider.id}">${provider.idproveedor} - ${provider.nombre}</option>`
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