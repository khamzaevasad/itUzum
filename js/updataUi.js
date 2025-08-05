const cardCon = document.getElementById("card-con");
const template = document.querySelector("template");

// update UI
export const updateUI = (data) => {
  cardCon.innerHTML = "";
  data.forEach((item) => {
    const {
      description,
      price,
      rating,
      reviews,
      discountPercentage,
      thumbnail,
      title,
    } = item;

    const clone = template.content.cloneNode(true);

    const productPrice = clone.querySelector("#product-price");
    const productImg = clone.querySelector("#product-img");
    const discountPrice = clone.querySelector("#discount-price");
    const productDiscount = clone.querySelector("#product-discount");
    const productDescription = clone.querySelector("#product-description");
    const productRating = clone.querySelector("#product-rating");
    const productReviews = clone.querySelector("#product-reviews");

    productPrice.textContent = `$${price}`;
    productImg.src = `${thumbnail}`;
    discountPrice.textContent = `$${Math.floor(
      price * (1 - discountPercentage / 100).toFixed(2)
    )}`;
    productDiscount.textContent = `${discountPercentage} % discount`;
    productDescription.textContent = `${description}`;
    productRating.textContent = `${rating}`;
    productReviews.textContent = `(${reviews[0].comment})`;

    cardCon.appendChild(clone);
  });
};
