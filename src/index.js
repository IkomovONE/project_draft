import "./styles.css";

const fetchData = async () => {
  const url =
    "https://geo.stat.fi/geoserver/wfs?service=WFS&version=2.0.0&request=GetFeature&typeName=tilastointialueet:kunta4500k&outputFormat=json&srsName=EPSG:4326";

  const res = await fetch(url);
  const data = await res.json();

  initMap(data)
};

const initMap = (data) => {
  let map = L.map("map", { minZoom: -3 })

  let geoJson = L.geoJSON(data, {
    onEachFeature: getFeature(data),

    weight: 2,
  }).addTo(map);

  

  let osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap",
  }).addTo(map);
  
  map.fitBounds(geoJson.getBounds())
  
  
};

const getFeature = (feature, layer, data) => {
  
  
  
  
  if (!feature.properties) return;
  
  
  
  
  
  
  
  layer.bindPopup(`
  
  <ul>
    <li> Name: ${data[feature.properties.id]}</li>
    
  </ul>
  
  
  `);
};

fetchData();