import { addToBasket } from "./basket.js";

export const updataUI = (products, template, containerElement) => {
  const fragment = document.createDocumentFragment();

  containerElement.innerHTML = "";

  products.forEach((item) => {
    const {
      description,
      price,
      rating,
      reviews,
      discountPercentage,
      thumbnail,
      id,
    } = item;

    const clone = template.content.cloneNode(true);

    const card = clone.querySelector(".product-card");
    const productPrice = clone.querySelector("#product-price");
    const productImg = clone.querySelector("#product-img");
    const discountPrice = clone.querySelector("#discount-price");
    const productDiscount = clone.querySelector("#product-discount");
    const productDescription = clone.querySelector("#product-description");
    const productRating = clone.querySelector("#product-rating");
    const productReviews = clone.querySelector("#product-reviews");
    const basketBtn = clone.querySelector(".basket-btn");

    basketBtn.addEventListener("click", (e) => {
      e.preventDefault();
      addToBasket(item);
    });

    productPrice.textContent = `$${price}`;
    productImg.src = `${thumbnail}`;
    discountPrice.textContent = `$${Math.floor(
      price * (1 - discountPercentage / 100).toFixed(2)
    )}`;
    productDiscount.textContent = `${discountPercentage} % discount`;
    productDescription.textContent = `${description}`;
    productRating.textContent = `${rating}`;
    productReviews.textContent = `(${reviews[0].comment})`;

    card.href = `/pages/product.html?id=${id}`;

    fragment.appendChild(clone);
  });
  containerElement.appendChild(fragment);
};

// product category

export const productFilter = (product) => {
  const categories = [...new Set(product.map((item) => item.category))];
  const brands = [...new Set(product.map((item) => item.brand))];

  const categoryElements = document.querySelectorAll(
    ".product-filter-category"
  );
  const categoryContainer = document.getElementById("product-element-category");

  categories.forEach((category, index) => {
    if (categoryElements[index]) {
      categoryElements[index].textContent = category;
    } else {
      const label = document.createElement("label");
      label.classList.add("label", "font-bold", "text-base-content");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.classList.add("checkbox");
      const span = document.createElement("span");
      span.classList.add("product-filter-category");
      span.textContent = category;

      label.appendChild(checkbox);
      label.appendChild(span);
      categoryContainer.appendChild(label);
    }
  });

  const brandContainer = document.getElementById("product-brand");
  const brandElements = document.querySelectorAll(".brand-filter-category");
  brands.forEach((brand, index) => {
    if (brandElements[index]) {
      brandElements[index].textContent = brand;
    } else {
      const label = document.createElement("label");
      label.classList.add("label", "font-bold", "text-base-content");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.classList.add("checkbox");
      const span = document.createElement("span");
      span.classList.add("brand-filter-category");
      span.textContent = brand;

      label.appendChild(checkbox);
      label.appendChild(span);
      brandContainer.appendChild(label);
    }
  });
};

// product update
const brandName = document.getElementById("brand-name");
const productCategory = document.getElementById("product-category");
const productTitle = document.getElementById("product-title");
const productInfoDiscount = document.getElementById("product-info-discount");
const productInfoPrice = document.getElementById("product-info-price");
const discountInfoPrice = document.getElementById("discount-info-price");
const shippingInfo = document.getElementById("shipping-info");
const minimumOrder = document.getElementById("minimum-order");
const availability = document.getElementById("availability");
const warranty = document.getElementById("warranty");

export const updateProduct = (product) => {
  const imagesContainer = document.getElementById("carousel-container");

  imagesContainer.innerHTML = "";

  product.images.forEach((imgUrl) => {
    const div = document.createElement("div");
    div.className = "carousel-item w-full";

    const img = document.createElement("img");
    img.src = imgUrl;
    img.className = "w-full";

    div.appendChild(img);
    imagesContainer.appendChild(div);
  });

  brandName.textContent = product.brand;
  productCategory.textContent = product.category;
  productTitle.textContent = product.title;
  productInfoDiscount.textContent = `${product.discountPercentage}%`;
  productInfoPrice.textContent = `$${product.price}`;
  discountInfoPrice.textContent = `$${Math.floor(
    product.price * (1 - product.discountPercentage / 100).toFixed(2)
  )}`;
  shippingInfo.textContent = product.shippingInformation;
  minimumOrder.textContent = product.minimumOrderQuantity;
  availability.textContent = product.availabilityStatus;
  warranty.textContent = product.warrantyInformation;
};
