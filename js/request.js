import { loader } from "./loader.js";

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
