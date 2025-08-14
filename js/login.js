function typeText(element, text, speed = 80) {
  let i = 0;
  element.style.opacity = "1";

  function type() {
    if (i < text.length) {
      element.innerHTML =
        text.substring(0, i + 1) + '<span class="cursor">|</span>';
      i++;
      setTimeout(type, speed);
    } else {
      // Remove cursor when done
      setTimeout(() => {
        element.innerHTML = text;
      }, 500);
    }
  }
  type();

  return new Promise((resolve) => {
    setTimeout(resolve, text.length * speed + 1000);
  });
}

document.addEventListener("DOMContentLoaded", async function () {
  const title = document.getElementById("title");
  const description = document.getElementById("description");

  // Type title first
  await typeText(title, "Welcome to itUzum!", 100);

  // Type description after title is done
  setTimeout(() => {
    typeText(
      description,
      "Explore a world of fresh products and daily necessities, all curated just for you. Sign in to unlock your complete lifestyle journey with itUzum",
      40
    );
  }, 500);
});
