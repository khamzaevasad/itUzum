const showMoreBtn = document.getElementById("show-more-btn");
const showLessBtn = document.getElementById("show-less-btn");

import { loader } from "./loader.js";

let limit = 10;
export const url = `${"https://dummyjson.com/product?limit="} + ${limit}`;

export const getData = async (url) => {
  loader(true);
  if (!url.trim()) {
    alert("No URL");
    return;
  }

  try {
    const req = await fetch(url);
    if (!req.ok) {
      throw new Error("Something went wrong");
    }
    const data = await req.json();
    return data;
  } catch (error) {
    alert(error.message);
  } finally {
    loader(false);
  }
};
