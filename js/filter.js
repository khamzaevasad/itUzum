import { products } from "./app.js";
import { updataUI } from "./updataUi.js";
const filterForm = document.getElementById("filter-form");
const cardCon = document.getElementById("card-con");
const mainTemplate = document.getElementById("index-template"); //index.html

filterForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);

  const categories = formData.getAll("category");
  const brands = formData.getAll("brand");

  let results = [...products];

  if (categories.length > 0) {
    results = results.filter((p) => categories.includes(p.category));
  }

  if (brands.length > 0) {
    results = results.filter((p) => brands.includes(p.brand));
  }

  cardCon.innerHTML = "";
  updataUI(results, mainTemplate, cardCon);
});

// let filteredProds = [];
// let brandFilter = [];
// filterForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const formData = new FormData(e.target);
//   const categories = formData.getAll("category");
//   const brands = formData.getAll("brand");
//   for (let i = 0; i < categories.length; i++) {
//     const category = categories[i];
//     for (let k = 0; k < products.length; k++) {
//       if (products[k].category == category) {
//         filteredProds.push(products[k]);
//       }
//     }
//   }
//   cardCon.innerHTML = "";
//   updataUI(filteredProds, mainTemplate, cardCon);
//   filteredProds = [];
//   for (let i = 0; i < brands.length; i++) {
//     const brand = brands[i];
//     for (let k = 0; k < products.length; k++) {
//       if (products[k].brand == brand) {
//         brandFilter.push(products[k]);
//       }
//     }
//   }
//   cardCon.innerHTML = "";
//   updataUI(brandFilter, mainTemplate, cardCon);
//   brandFilter = [];
// });
