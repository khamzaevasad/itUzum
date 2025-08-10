import "./mode.js";
import "./wishList.js";
import { calculateTotal, basketProducts as data } from "./basket.js";

const basketProducts = data;
const totalProducts = calculateTotal(basketProducts);
console.log(basketProducts);
console.log(totalProducts);
