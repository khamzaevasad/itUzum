const themetoggler = document.getElementById("theme-toggler");
const html = document.querySelector("html");

themetoggler.addEventListener("change", () => {
  html.dataset.theme = html.dataset.theme == "light" ? "dark" : "light";
});
