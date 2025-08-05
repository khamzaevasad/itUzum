export function showError(message) {
  const alertBox = document.getElementById("error-alert");
  const alertText = document.getElementById("error-message");

  alertText.textContent = message;
  alertBox.classList.remove("hidden");

  setTimeout(() => {
    alertBox.classList.add("hidden");
  }, 5000);
}
