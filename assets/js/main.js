// ? ==============> Global Variables <================
const addProductbtn = document.getElementById("addProductbtn");
const productNameInput = document.getElementById("productName");
const productPriceInput = document.getElementById("productPrice");
const productCategoryInput = document.getElementById("productCategory");
const productDescriptionInput = document.getElementById("productDescription");
const productImageInput = document.getElementById("productImage");
const searchbyNameInput = document.getElementById("SearchbyName");
const updateProductbtn = document.getElementById("updateProductbtn");

let productsContainer = [];
let updateIndex;
// *=================> Condaations - Local Storage <=================
if (localStorage.getItem("products") == null) {
  productsContainer = [];
} else {
  productsContainer = JSON.parse(localStorage.getItem("products"));
  displayProducts(productsContainer);
}

// &=================> Events <=================
addProductbtn.addEventListener("click", addProduct);
updateProductbtn.addEventListener("click", updateProduct);
// ! ==============> Functions <=================

//* Add Product
function addProduct() {
  let product = {
    name: productNameInput.value,
    price: productPriceInput.value,
    category: productCategoryInput.value,
    description: productDescriptionInput.value,
    image: `assets/images/${productImageInput.files[0]?.name}`,
  };

  productsContainer.push(product);
  console.log(productsContainer);
  localStorage.setItem("products", JSON.stringify(productsContainer));
  displayProducts(productsContainer);
  clearForm();
}

// * Display products
function displayProducts(arr) {
  let cartona = ``;
  for (let i = 0; i < arr.length; i++) {
    cartona += `
                <div class="col-lg-4 col-sm-6">
                    <div class="product rounded-3 shadow-lg p-3">
                        <figure >
                            <img src="${arr[i].image}" alt="product image" class="w-100">
                            <figcaption class="mt-2">
                                <h2 class="h5">${arr[i].name}</h2>
                                <p class="text-muted mb-2">${arr[i].description}</p>
                                <h3 class="h6">
                                    <span class="fw-bold text-capitalize">price :</span> ${arr[i].price}
                                </h3>
                                <h3 class="h6">
                                    <span class="fw-bold text-capitalize">category :</span> ${arr[i].category}
                                </h3>
                            </figcaption>
                        </figure>
                        <footer>
                            <button class="btn btn-danger text-capitalize" onclick="deleteProduct(${i})">delete</button>
                            <button class="btn btn-warning fw-semibold text-capitalize" onclick="setFormForUpdate(${i})">update</button>
                        </footer>
                    </div>
                </div>
      `;
  }
  document.getElementById("productArea").innerHTML = cartona;
}

// * Clear form
function clearForm() {
  productNameInput.value = null;
  productPriceInput.value = null;
  productCategoryInput.value = null;
  productDescriptionInput.value = null;
}

// & Delete Product
function deleteProduct(i) {
  productsContainer.splice(i, 1);
  displayProducts(productsContainer);

  localStorage.setItem("products", JSON.stringify(productsContainer));
}

// ^ Search Product
function searchProduct() {
  let term = searchbyNameInput.value;
  let termProducts = [];
  for (let i = 0; i < productsContainer.length; i++) {
    if (productsContainer[i].name.toLowerCase().includes(term.toLowerCase())) {
      termProducts.push(productsContainer[i]);
    }
  }

  displayProducts(termProducts);
}

// ! Set Form For Update
function setFormForUpdate(i) {
  updateIndex = i;

  addProductbtn.classList.add("d-none");
  updateProductbtn.classList.remove("d-none");

  productNameInput.value = productsContainer[i].name;
  productDescriptionInput.value = productsContainer[i].description;
  productCategoryInput.value = productsContainer[i].category;
  productPriceInput.value = productsContainer[i].price;
}

// ! Update Product
function updateProduct() {
  addProductbtn.classList.remove("d-none");
  updateProductbtn.classList.add("d-none");

  productsContainer[updateIndex].name = productNameInput.value;
  productsContainer[updateIndex].description = productDescriptionInput.value;
  productsContainer[updateIndex].category = productCategoryInput.value;
  productsContainer[updateIndex].price = productPriceInput.value;
  productsContainer[updateIndex].image =  `assets/images/${productImageInput.files[0]?.name}`;

  displayProducts(productsContainer);
  clearForm();
  localStorage.setItem("products", JSON.stringify(productsContainer));
}

// & Validation - Regular Expression
function validateForm(element) {
  let regex = {
    productName: /^[A-Z][a-z]{2,8}$/,
    productPrice: /^[0-9]{1,5}(\.[0-9]{1,2})?$/,
    productCategory: /^[A-Z][a-z]{2,8}$/,
    productDescription: /^[A-Z][a-z]{2,8}$/,
  };

  let myitem = element.value;

  if ( regex[element.id].test(myitem)) {
    element.classList.remove("is-invalid");
    element.classList.add("is-valid");
    element.nextElementSibling.classList.replace("d-block", "d-none");
    return true;
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    element.nextElementSibling.classList.replace("d-none", "d-block");
    return false;
  }
}
