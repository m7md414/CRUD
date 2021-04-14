var productName = document.getElementById("productName"),
    productPrice = document.getElementById("productPrice"),
    productCat = document.getElementById("productCategory"),
    productDesc = document.getElementById("productDescription"),
    updateDiv = document.getElementById("update"),
    myLabel = document.getElementsByClassName('lab'),
    mySpace = document.getElementsByClassName('space'),
    addBtn = document.getElementById("addBtn"),
    productsRow;

if (localStorage.getItem("Products") == null) {
    productsRow = [];
}
else {
    productsRow = JSON.parse(localStorage.getItem("Products"));
    showData();
}
function addProduct() {
    var productData = {
        name: productName.value,
        price: productPrice.value,
        category: productCat.value,
        desc: productDesc.value
    };
    productsRow.push(productData);
    localStorage.setItem("Products", JSON.stringify(productsRow));
    clear();
    showData();
}
function showData() {
    var row = '';
    for (var i = 0; i < productsRow.length; i++) {

        row += `<tr>
        <td>`+ (i+1) + `</td>
        <td>`+ productsRow[i].name + `</td>
        <td>`+ productsRow[i].price + `</td>
        <td>`+ productsRow[i].category + `</td>
        <td>`+ productsRow[i].desc + `</td>
        <td> <button onclick="openUpdate(`+ i + `)" class="btn btn-outline-warning up">Update</button> </td>
        <td> <button onclick="deleteProduct(`+ i + `)" class="btn btn-outline-danger del">Delete</button> </td>
        </tr>`;
    }
    document.getElementById('tableData').innerHTML = row;
}
function clear() {
    productName.value = "";
    productPrice.value = "";
    productCat.value = "";
    productDesc.value = "";
}
function deleteProduct(index) {
    productsRow.splice(index, 1);
    localStorage.setItem('Products', JSON.stringify(productsRow))
    showData();
}
function openUpdate(index){
    updateDiv.style.visibility = "visible";
    for(var i = 0 ; i<4 ; i++){
        myLabel[i].style.color = "#bbbbbb";
        mySpace[i].style.backgroundColor  = "#bbbbbb";
    }
    addBtn.style.backgroundColor = "#ffc105";
    addBtn.style.color = "black";
    addBtn.style.left = "20px";
    addBtn.innerHTML = "Update";
    addBtn.setAttribute('onclick','updateProduct('+ index +')');
    //addBtn.onclick = updateProduct(index);
}
function updateProduct(index){
    productsRow[index].name = productName.value;
    productsRow[index].price = productPrice.value;
    productsRow[index].category = productCat.value;
    productsRow[index].desc = productDesc.value;
    localStorage.setItem("Products", JSON.stringify(productsRow));
    back();
    clear();
    showData();
}
function back(){
    updateDiv.style.visibility = "hidden";
    for(var i = 0 ; i<4 ; i++){
        myLabel[i].style.color = "#212529";
        mySpace[i].style.backgroundColor  = "#212529";
    }
    addBtn.style.backgroundColor = "#000000";
    addBtn.style.color = "white";
    addBtn.style.left = null;
    addBtn.innerHTML = "Add Product";
    addBtn.setAttribute('onclick','addProduct()');
}
function searchProduct(key) {
    var row = '';
    for (var i = 0; i < productsRow.length; i++) {
        if (productsRow[i].name.toLowerCase().includes(key.toLowerCase()) == true
            || productsRow[i].category.toLowerCase().includes(key.toLowerCase()) == true) {
            row += `<tr>
        <td>`+ (i+1) + `</td>
        <td>`+ productsRow[i].name + `</td>
        <td>`+ productsRow[i].price + `</td>
        <td>`+ productsRow[i].category + `</td>
        <td>`+ productsRow[i].desc + `</td>
        <td> <button onclick="openUpdate(`+ i + `)" class="btn btn-outline-warning up">Update</button> </td>
        <td> <button onclick="deleteProduct(`+ i + `)" class="btn btn-outline-danger del">Delete</button> </td>
        </tr>`;
        }
    }
    document.getElementById('tableData').innerHTML = row;
}