import { addToBasket } from "./basket.js";
import { addToWishList } from "./wishList.js";
import { formatNumber } from "./formatNumber.js";
import { increment, decrement, deleteProduct } from "./basketPage.js";

// // alert
// export function showAlert() {
//   const alert = document.getElementById("myAlert");
//   alert.classList.remove("hidden");
//   setTimeout(() => {
//     alert.classList.add("hidden");
//   }, 3000);
// }

// mainUI update
export const updataUI = (products = [], template, containerElement) => {
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
      title,
      category,
      brand,
    } = item;

    const clone = template.content.cloneNode(true);

    const card = clone.querySelector(".product-card");
    card.dataset.title = title;
    card.dataset.category = category;
    card.dataset.brand = brand;
    const productPrice = clone.querySelector("#product-price");
    const productImg = clone.querySelector("#product-img");
    const discountPrice = clone.querySelector("#discount-price");
    const productDiscount = clone.querySelector("#product-discount");
    const productDescription = clone.querySelector("#product-description");
    const productRating = clone.querySelector("#product-rating");
    const productReviews = clone.querySelector("#product-reviews");
    const basketBtn = clone.querySelector(".basket-btn");
    const wishListBtn = clone.querySelector(".wishListBtn");
    const joinBox = clone.querySelector(".joinBox");
    const decrementBtn = clone.querySelector(".decrement-btn");
    const incrementBtn = clone.querySelector(".increment-btn");

    const wished =
      localStorage.getItem("wishList") &&
      JSON.parse(localStorage.getItem("wishList")).findIndex(
        (item) => item.id == id
      );

    if (wished != -1) {
      wishListBtn.innerHTML = `<i class="text-red-500 fa-solid fa-heart"></i>`;
    }

    wishListBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (addToWishList(item)) {
        wishListBtn.innerHTML = `<i class="fa-regular  fa-heart"></i>`;
      } else {
        wishListBtn.innerHTML = `<i class="text-red-500 fa-solid fa-heart"></i>`;
      }
    });

    basketBtn.addEventListener("click", (e) => {
      e.preventDefault();
      addToBasket(item);
      joinBox.classList.remove("hidden");
      basketBtn.classList.add("hidden");
    });

    // incrementBtn.addEventListener("click", (e) => {
    //   e.preventDefault();
    //   increment(id);
    // });
    // decrementBtn.addEventListener("click", (e) => {
    //   e.preventDefault();
    //   decrement(id);
    // });

    productPrice.textContent = `$${price}`;
    productImg.src = `${thumbnail}`;
    discountPrice.textContent = `${formatNumber(
      Math.floor(price * (1 - discountPercentage / 100))
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
      checkbox.name = `category`;
      checkbox.value = category;
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
      checkbox.name = `brand`;
      checkbox.value = brand;
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
  const cartBtn = document.querySelectorAll(".cart-btn");

  // product cart btn events
  cartBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      addToBasket(product);
    });
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

// basketUI Update
export const basketItems = (product, template, containerElements) => {
  const fragment = document.createDocumentFragment();
  containerElements.innerHTML = "";

  product.forEach((item) => {
    const {
      amount,
      thumbnail,
      title,
      shippingInformation,
      price,
      discountPercentage,
      id,
      description,
    } = item;

    const clone = template.content.cloneNode(true);

    const img = clone.querySelector(".item-img");
    const itemTitle = clone.querySelector(".item-title");
    const shippingInfo = clone.querySelector(".shipping-info");
    const itemDescription = clone.querySelector(".item-description");
    const itemDiscount = clone.querySelector(".item-discount");
    const itemPrice = clone.querySelector(".item-price");
    const itemAmount = clone.querySelector(".item-amount");
    const discountPrice = clone.querySelector(".discount-price");
    const incrementBtn = clone.querySelector(".increment-btn");
    const decrementBtn = clone.querySelector(".decrement-btn");
    const deleteBtn = clone.querySelector(".delete-btn");

    // btn Event
    deleteBtn.addEventListener("click", () => {
      deleteProduct(id);
    });
    incrementBtn.addEventListener("click", () => {
      increment(id);
    });
    decrementBtn.addEventListener("click", () => {
      decrement(id);
    });

    img.src = thumbnail;
    itemTitle.textContent = title;
    shippingInfo.textContent = shippingInformation;
    itemDescription.textContent = description;
    itemDiscount.textContent = `${discountPercentage}% discount`;
    itemPrice.textContent = formatNumber(price);
    itemAmount.value = amount;
    discountPrice.textContent = formatNumber(
      Math.floor(price * (1 - discountPercentage / 100) * amount)
    );

    fragment.appendChild(clone);
  });
  containerElements.appendChild(fragment);
};

// basket Price info
export const priceInfo = (totalProducts, product) => {
  const itemTotal = document.querySelector(".item-total");
  const totalPrice = document.querySelector(".total-price");
  const lastPrice = document.querySelector(".last-price");
  const savingInfo = document.querySelector(".saving-info");

  itemTotal.textContent = totalProducts.totalAmount;
  totalPrice.textContent = totalProducts.totalPrice;
  lastPrice.textContent = totalProducts.totalPrice;
  const totalSavings = product.reduce((sum, item) => {
    return (
      sum +
      ((Number(item.price) * Number(item.discountPercentage)) / 100) *
        Number(item.amount)
    );
  }, 0);

  savingInfo.textContent = formatNumber(totalSavings);
};

// checkout UI update
export const checkoutPriceUpdate = (totalProducts, product) => {
  const checkoutAmount = document.querySelector(".checkoutAmount");
  const checkoutPrice = document.querySelector(".checkoutPrice");
  const checkoutSaving = document.querySelector(".checkoutSaving");
  const checkoutTotal = document.querySelector(".checkoutTotal");

  checkoutAmount.textContent = totalProducts.totalAmount;
  checkoutPrice.textContent = totalProducts.totalPrice;
  const totalSavings = product.reduce((sum, item) => {
    return (
      sum +
      ((Number(item.price) * Number(item.discountPercentage)) / 100) *
        Number(item.amount)
    );
  }, 0);

  checkoutSaving.textContent = formatNumber(totalSavings);

  checkoutTotal.textContent = totalProducts.totalPrice;
};

// basket dropdown Update
export const basketDropItems = (product, template, containerElements) => {
  const fragment = document.createDocumentFragment();
  containerElements.innerHTML = "";

  product.forEach((item) => {
    const { amount, thumbnail, title } = item;
    const clone = template.content.cloneNode(true);

    const dropImg = clone.querySelector(".dropImg");
    const _title = clone.querySelector(".dropTitle");
    const _amount = clone.querySelector(".dropAmount");

    dropImg.src = thumbnail;
    _title.textContent = title;
    _amount.textContent = amount;

    fragment.appendChild(clone);
  });
  containerElements.appendChild(fragment);
};
