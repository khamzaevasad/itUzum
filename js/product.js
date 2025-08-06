import { getData } from "./request.js";
import { updateProduct } from "./updataUi.js";

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
