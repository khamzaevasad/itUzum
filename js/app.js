import "./basket.js";
import "./mode.js";
import "./search.js";
import "./location.js";
import { getData } from "./request.js";
import { updataUI, productFilter } from "./updataUi.js";

let user = false;

let limit = 12;
let url = "https://dummyjson.com/product";

const mainTemplate = document.querySelector("template"); //index.html
const cardCon = document.getElementById("card-con"); //index.html
const showMoreBtn = document.getElementById("show-more-btn");
const showLessBtn = document.getElementById("show-less-btn");

getData(url + `?limit=${limit}`)
  .then((data) => {
    updataUI(data.products, mainTemplate, cardCon);
  })
  .catch((error) => {
    console.log(error.message);
  });

getData("https://dummyjson.com/product?limit=194")
  .then((data) => {
    productFilter(data.products);
  })
  .catch((error) => {
    console.log(error.message);
  });

showMoreBtn.addEventListener("click", () => {
  if (limit == 190 || limit === 194) {
    showMoreBtn.classList.add("hidden");
    limit += 4;
  } else if (limit < 194) {
    limit += 10;
  }

  showLessBtn.classList.remove("hidden");
  getData(url + `?limit=${limit}`)
    .then((data) => {
      updataUI(data.products, mainTemplate, cardCon);
    })
    .catch((error) => {
      console.log(error.message);
    });
});

showLessBtn.addEventListener("click", () => {
  showLessBtn.classList.remove("hidden");
  if (limit < 194 || limit === 10) {
    limit -= 10;
    showLessBtn.classList.add("hidden");
  }
  getData(url + `?limit=${limit}`)
    .then((data) => {
      updataUI(data.products, mainTemplate, cardCon);
    })
    .catch((error) => {
      console.log(error.message);
    });
});

const year = document.getElementById("year");
const currentYear = new Date();
year.textContent = `${currentYear.getFullYear()}`;
