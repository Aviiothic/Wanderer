/*process.env variables are not accessible in public files
to isliye hum apne ejs ke andar ek script chalayenge aur js variables me
apna key save krwa lenge aur us variable ks use yahan kr lenge
*/
maptilersdk.config.apiKey = mapToken;
const map = new maptilersdk.Map({
  container: "map", // container's id or the HTML element to render the map
  center: coordinates, // starting position [lng, lat]
  zoom: 12, // starting zoom
});

const markerElement = document.createElement("div");
markerElement.className = "custom-marker";
markerElement.innerHTML = `
  <div class="icon">
    <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
      <path d="M12 3l10 9h-3v9h-5v-6h-4v6H5v-9H2z" fill="white"/>
    </svg>
  </div>
`;

new maptilersdk.Marker({
  element: markerElement,
})
  .setLngLat(coordinates)
  .addTo(map)
  .setPopup(
    new maptilersdk.Popup({ offset: 25 }).setHTML(`
    <div class="custom-popup">🏠 The listing is here</div>
  `)
  );

new maptilersdk.Marker({
  element: markerElement,
})
  .setLngLat(coordinates)
  .addTo(map)
  .setPopup(
    new maptilersdk.Popup({ offset: 25 }).setHTML(`
    <div class="custom-popup"><b>🏠 The listing is here</b></div>
  `)
  );
