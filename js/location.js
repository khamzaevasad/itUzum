if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(async (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    try {
      const res = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
      );
      const data = await res.json();
      // console.log("City:", data.city);
      document.getElementById(
        "current-location"
      ).innerHTML += `<option selected>${data.city}</option>`;
    } catch (error) {
      console.error("Error fetching city:", error);
    }
  });
} else {
  console.log("Geolocation is not supported by this browser.");
}
