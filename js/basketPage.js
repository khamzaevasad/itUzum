import "./mode.js";
import "./wishList.js";
import "./location.js";
import { calculateTotal, basketProducts as data } from "./basket.js";
import { basketItems, priceInfo, updataUI } from "./updataUi.js";
import { getData } from "./request.js";

let url = "https://dummyjson.com/product?limit=10";

export let basketProducts = data;
export let totalProducts = calculateTotal(basketProducts);
const basketList = document.getElementById("basket-list");
const basketTemplate = document.querySelector("template");

if (basketList) {
  basketItems(basketProducts, basketTemplate, basketList);
  priceInfo(totalProducts, basketProducts);
}

export const updataUIandLocal = () => {
  localStorage.setItem("basket", JSON.stringify(basketProducts));
  basketItems(basketProducts, basketTemplate, basketList);
  const totalProducts = calculateTotal(basketProducts);
  calculateTotal(basketProducts);
  priceInfo(totalProducts, basketProducts);
};

export const increment = (id) => {
  const item = basketProducts.find((item) => item.id == id);
  item.amount += 1;
  updataUIandLocal();
};

export const decrement = (id) => {
  const item = basketProducts.find((item) => item.id == id);

  if (item.amount == 1) {
    const isDeleted = confirm("Are you sure you want to delete this product?");
    if (isDeleted) {
      basketProducts = basketProducts.filter((item) => item.id != id);
    }
  } else {
    item.amount -= 1;
  }

  updataUIandLocal();
};

export const deleteProduct = (id) => {
  const removeItem = confirm("Are you sure you want to delete this product?");

  if (removeItem) {
    basketProducts = basketProducts.filter((item) => item.id != id);
  }

  updataUIandLocal();
};

const mainContainer = document.querySelector(".basket-main-container");
const emptyCart = document.querySelector(".empty-cart");

if (mainContainer && emptyCart) {
  if (basketProducts.length === 0) {
    mainContainer.classList.add("hidden");
    emptyCart.classList.remove("hidden");
  } else {
    mainContainer.classList.remove("hidden");
    emptyCart.classList.add("hidden");
  }
}

// const basketRecomTemplate = document.getElementById("basketRecomTemplate");
// const containerElement = document.getElementById("card-con");

// getData(url)
//   .then((data) => {
//     updataUI(data.products, basketRecomTemplate, containerElement);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
