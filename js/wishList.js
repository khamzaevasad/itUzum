const headerWishlist = document.getElementById("header-wishlist");
const footerWashList = document.getElementById("footer-wishList");

let wishList = localStorage.getItem("wishList")
  ? JSON.parse(localStorage.getItem("wishList"))
  : [];

if (wishList.length) {
  calculateWishList(wishList);
}

function calculateWishList(wishList) {
  let totalAmound = 0;
  wishList.forEach((item) => {
    totalAmound += item.amound;
  });
  headerWishlist.textContent = totalAmound;
  footerWashList.textContent = totalAmound;
  return { totalAmound };
}

export const addToWishList = (product) => {
  const item = wishList.find((p) => p.id == product.id);
  if (item) {
    item.amound += 1;
  } else {
    wishList.push({ ...product, amound: 1 });
  }
  console.log(calculateWishList(wishList));
  localStorage.setItem("wishList", JSON.stringify(wishList));
};
