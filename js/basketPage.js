import "./mode.js";
import "./wishList.js";
import { calculateTotal, basketProducts as data } from "./basket.js";
import { basketItems } from "./updataUi.js";

const basketProducts = data;
const totalProducts = calculateTotal(basketProducts);
const basketList = document.getElementById("basket-list");
const basketTemplate = document.querySelector("template");

basketItems(basketProducts, basketTemplate, basketList);
