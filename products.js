let selectedProduct;

window.addEventListener("load", () => {
  // Get the "tr" elements and convert to an array
  const newOrderButton = document.getElementById("newOrderButton");
  const editButton = document.getElementById("editButton");
  const rowsHTML = document.getElementsByTagName("tr");
  const rowsArr = Array.from(rowsHTML);

  // Add click event listener to each "tr" element in the array
  rowsArr.forEach(row => {
    row.addEventListener("click", () => {
      // Get the "td" elements in the clicked "tr" element
      const tds = row.getElementsByTagName("td");
      // Get the value of each "td" element and log to the console
      const values = Array.from(tds).map(td => td.textContent);

      // Remove the .selected class from any other row;
      let selectedRow = document.querySelector(".selected");
      if (selectedRow) {
        selectedRow.classList.remove("selected");
      }
      // Set the .selected class on the row;
      row.classList.add("selected");
      // Make a product object and save it in our variable.
      selectedProduct = getProductObject(values);
      console.log(selectedProduct);
    });
  });

  newOrderButton.addEventListener("click", () => {
    window.comm.newOrderButtonClick(selectedProduct);
    console.log("Logging from Event Listener");
  });
});

function getProductObject(productArray) {
  let productObject = {
    "sku": productArray[0],
    "name": productArray[1],
    "description": productArray[2],
    "category": productArray[3],
    "stock": productArray[4]
  }
  return productObject
}


