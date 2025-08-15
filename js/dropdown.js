import { basketProducts } from "./basket.js";

import { basketDropItems } from "./updataUi.js";

const basketDropdownTemplate = document.getElementById("basket-Product-Temp");
const basketTempCon = document.querySelector(".basket-Temp-Con");

basketDropItems(basketProducts, basketDropdownTemplate, basketTempCon);
