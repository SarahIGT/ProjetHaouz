// Initialize the map and set its view to Commune Tlat N'Yaacoub
var map = L.map('map').setView([30.988977, -8.182690], 12); // Latitude and Longitude for Tlat N'Yaacoub

// Add a tile layer (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Add a marker at Commune Tlat N'Yaacoub
var marker = L.marker([30.988977, -8.182690], { title: "Commune Tlat N'Yaacoub" }).addTo(map);

// Add a popup to the marker
marker.bindPopup("Commune Tlat N'Yaacoub, Al Haouz").openPopup();
