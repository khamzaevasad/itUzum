import "./mode.js";
import "./wishList.js";
import { calculateTotal, basketProducts as data } from "./basket.js";
import { basketItems, priceInfo } from "./updataUi.js";

let basketProducts = data;
let totalProducts = calculateTotal(basketProducts);
const basketList = document.getElementById("basket-list");
const basketTemplate = document.querySelector("template");

if (basketList) {
  basketItems(basketProducts, basketTemplate, basketList);
  priceInfo(totalProducts, basketProducts);
}

export const increment = (id) => {
  const item = basketProducts.find((item) => item.id == id);
  item.amount += 1;
  localStorage.setItem("basket", JSON.stringify(basketProducts));
  basketItems(basketProducts, basketTemplate, basketList);
  const totalProducts = calculateTotal(basketProducts);
  calculateTotal(basketProducts);
  priceInfo(totalProducts, basketProducts);
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

  localStorage.setItem("basket", JSON.stringify(basketProducts));
  basketItems(basketProducts, basketTemplate, basketList);
  calculateTotal(basketProducts);
  const totalProducts = calculateTotal(basketProducts);
  priceInfo(totalProducts, basketProducts);
};

export const deleteProduct = (id) => {
  const removeItem = confirm("Are you sure you want to delete this product?");

  if (removeItem) {
    basketProducts = basketProducts.filter((item) => item.id != id);
  }

  localStorage.setItem("basket", JSON.stringify(basketProducts));
  basketItems(basketProducts, basketTemplate, basketList);
  calculateTotal(basketProducts);
  const totalProducts = calculateTotal(basketProducts);
  priceInfo(totalProducts, basketProducts);
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
