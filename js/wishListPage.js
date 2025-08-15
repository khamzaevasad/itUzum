import { wishListUi } from "./updataUi.js";
import { wishList } from "./wishList.js";

const wishListTemplate = document.getElementById("wishlist-template");
const wishListContainer = document.getElementById("card-con");

wishListUi(wishList, wishListTemplate, wishListContainer);
