import { products } from "./app.js";
import { updataUI } from "./updataUi.js";
const filterForm = document.getElementById("filter-form");
const cardCon = document.getElementById("card-con");
const mainTemplate = document.getElementById("index-template"); //index.html

let filteredProds = [];
filterForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);

  const categories = formData.getAll("category");

  for (let i = 0; i < categories.length; i++) {
    const category = categories[i];
    for (let k = 0; k < products.length; k++) {
      if (products[k].category == category) {
        filteredProds.push(products[k]);
      }
    }
  }
  cardCon.innerHTML = "";
  updataUI(filteredProds, mainTemplate, cardCon);
  filteredProds = [];
});
