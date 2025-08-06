import "./mode.js";
import { getData, url } from "./request.js";
import { updateUI } from "./updataUi.js";

getData(url)
  .then((data) => {
    updateUI(data.products);
  })
  .catch((error) => {
    console.log(error.message);
  });

const year = document.getElementById("year");
const currentYear = new Date();
year.textContent = `${currentYear.getFullYear()}`;
