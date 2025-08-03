import "./mode.js";

const year = document.getElementById("year");
const currentYear = new Date();
year.textContent = `${currentYear.getFullYear()}`;
