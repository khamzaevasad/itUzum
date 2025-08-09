const searchProducts = document.getElementById("search-product");
const cardContainer = document.getElementById("card-con");
const inputsearchContainer = document.getElementById("input-search-container");
const searchValue = document.getElementById("search-value");
const filterCategory = document.getElementById("filter-category");
const showMoreBtn = document.getElementById("show-more-btn");

searchProducts.addEventListener("input", () => {
  const inputValue = searchProducts.value.toLowerCase().trim();
  let hasVisibleCards = false;

  Array.from(cardContainer.children).forEach((card) => {
    const cardTitle = card.dataset.title
      ? card.dataset.title.toLowerCase()
      : "";
    if (cardTitle.includes(inputValue)) {
      card.style.display = "";
      hasVisibleCards = true;
    } else {
      card.style.display = "none";
    }
  });
  if (!hasVisibleCards) {
    searchValue.textContent = inputValue;
    inputsearchContainer.classList.remove("hidden");
    filterCategory.classList.add("hidden");
    showMoreBtn.classList.add("hidden");
  } else {
    inputsearchContainer.classList.add("hidden");
    filterCategory.classList.remove("hidden");
    showMoreBtn.classList.remove("hidden");
  }
});
