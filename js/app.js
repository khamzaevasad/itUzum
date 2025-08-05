import "./mode.js";
import { getData, url } from "./request.js";
import { updateUI } from "./updataUi.js";

const year = document.getElementById("year");
const currentYear = new Date();
year.textContent = `${currentYear.getFullYear()}`;
