/*process.env variables are not accessible in public files
to isliye hum apne ejs ke andar ek script chalayenge aur js variables me
apna key save krwa lenge aur us variable ks use yahan kr lenge
*/
maptilersdk.config.apiKey = mapToken;
const map = new maptilersdk.Map({
  container: "map", // container's id or the HTML element to render the map
  center: (coordinates), // starting position [lng, lat]
  zoom: 10, // starting zoom
});

// Create a custom home icon
const homeIcon = document.createElement("div");
homeIcon.innerHTML = "🏠"; // You can replace this with an image too
homeIcon.style.fontSize = "20px";
homeIcon.style.color = "red";

// Create the marker with the custom element
const marker = new maptilersdk.Marker({
  element: homeIcon,
  draggable: false
})
  .setLngLat(coordinates)
  .setPopup(
    new maptilersdk.Popup({ offset: 25 }).setHTML(`
      <div style="color: red; font-weight: bold; font-size: 14px;">
        🏠 The listing is here
      </div>
    `)
  )  
  .addTo(map);
  