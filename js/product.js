import { getData } from "./request.js";
import { updateProduct, updataUI } from "./updataUi.js";
import "./mode.js";

const recommendedTemplate = document.querySelector("template");
const containerElement = document.getElementById("card-con");

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

let category;

if (id) {
  getData("https://dummyjson.com/product/" + id)
    .then((data) => {
      updateProduct(data);
      category = data.category;
      return getData("https://dummyjson.com/product?limit=194");
    })
    .then((data) => {
      const products = data.products.filter((p) => p.category == category);

      const randomProducts = [];

      if (products.length > 10) {
        while (randomProducts.length < 10) {
          let randomNumber = Math.floor(Math.random() * 27);
          let choosenProduct = products[randomNumber];
          if (!choosenProduct) continue;

          if (randomProducts.some((rp) => rp.id == choosenProduct.id)) {
            continue;
          }
          randomProducts.push(choosenProduct);
        }
        updataUI(randomProducts, recommendedTemplate, containerElement);
      } else {
        updataUI(products, recommendedTemplate, containerElement);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
