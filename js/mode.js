const themetoggler = document.getElementById("theme-toggler");
const html = document.querySelector("html");

let themeFromLocal = localStorage.getItem("theme");

if (themeFromLocal) {
  html.dataset.theme = html.dataset.theme = themeFromLocal;
}

themetoggler.addEventListener("change", () => {
  html.dataset.theme = html.dataset.theme == "light" ? "dark" : "light";
  localStorage.setItem("theme", html.dataset.theme);
});
