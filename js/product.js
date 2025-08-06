import { getData } from "./request.js";
import { updateProduct, updateUI } from "./updataUi.js";
import "./mode.js";

const cardCon = document.getElementById("card-con");
const template = document.querySelector("template");

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

if (id) {
  getData("https://dummyjson.com/product/" + id)
    .then((data) => {
      updateProduct(data);
    })
    .catch((error) => {
      console.log(error);
    });
}
