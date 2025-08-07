const totalAmoundBox = document.getElementById("total-amound");
const footerAmound = document.getElementById("footer-amound");
import { formatNumber } from "./formatNumber.js";

let basketProducts = [];

function calculateTotal(basketProducts) {
  let totalPrice = 0;
  let totalAmount = 0;

  basketProducts.forEach((product) => {
    totalAmount += product.amount;
    totalPrice += product.amount * product.price;
  });

  totalPrice = formatNumber(totalPrice);
  totalAmoundBox.textContent = totalAmount;
  footerAmound.textContent = totalAmount;
  return { totalAmount, totalPrice };
}

export function addToBasket(product) {
  const item = basketProducts.find((p) => p.id == product.id);

  if (item) {
    item.amount += 1;
  } else {
    basketProducts.push({ ...product, amount: 1 });
  }
  console.log(calculateTotal(basketProducts));
  console.log(basketProducts);
}
