const headerWishlist = document.getElementById("header-wishlist");
const footerWashList = document.getElementById("footer-wishList");

export let wishList = localStorage.getItem("wishList")
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
  const index = wishList.findIndex((p) => p.id == product.id);
  if (index !== -1) {
    wishList.splice(index, 1);
  } else {
    wishList.push({ ...product, amound: 1 });
  }
  calculateWishList(wishList);
  localStorage.setItem("wishList", JSON.stringify(wishList));

  return index >= 0 ? true : false;
};
