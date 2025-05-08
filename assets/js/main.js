// ? ==============> Global Variables <================
const addProductbtn = document.getElementById("addProductbtn");
const productNameInput = document.getElementById("productName");
const productPriceInput = document.getElementById("productPrice");
const productCategoryInput = document.getElementById("productCategory");
const productDescriptionInput = document.getElementById("productDescription");

let productsContainer = [];
// &=================> Events <=================
addProductbtn.addEventListener("click", addProduct);

// ! ==============> Functions <=================

//* Add Product
function addProduct() {
  let product = {
    name: productNameInput.value,
    price: productPriceInput.value,
    category: productCategoryInput.value,
    description: productDescriptionInput.value,
    image: "assets/images/1.jpg",
  };

  productsContainer.push(product);
  console.log(productsContainer);

  clearForm()
}


// * Display products
function displayProducts() {
    
}

// * Clear form
function clearForm() {
    productNameInput.value = null;
    productPriceInput.value = null;
    productCategoryInput.value = null;
    productDescriptionInput.value = null; 
}
