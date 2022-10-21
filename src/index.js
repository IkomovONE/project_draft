import "./styles.css";

const fetchData = async () => {
  const url = "./js/lut.geojson";
  //const url = "https://geo.stat.fi/geoserver/wfs?service=WFS&version=2.0.0&request=GetFeature&typeName=tilastointialueet:kunta4500k&outputFormat=json&srsName=EPSG:4326"
  const res = await fetch(url);
  const data = await res.json();

  initMap(data);
};

const initMap = (data) => {
  let map = L.map("map", {
    minZoom: -3
  });

  let geoJson = L.geoJSON(data, {
    onEachFeature: getFeature,
    style: getStyle
  }).addTo(map);

  let osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap"
  }).addTo(map);

  let google = L.tileLayer(
    "https://{s}.google.com/vt/lyrs=s@221097413,traffic&x={x}&y={y}&z={z}",
    {
      maxZoom: 20,
      minZoom: 2,
      subdomains: ["mt0", "mt1", "mt2", "mt3"]
    }
  ).addTo(map);

  let baseMaps = {
    OpenStreetMap: osm,
    "Google Maps": google
  };

  let overlayMaps = {
    LUT: geoJson
  };

  let layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);

  map.fitBounds(geoJson.getBounds());
};

const lutBuildings = [
  {
    name: "Building 1",
    year: 1972,
    color: "#ffcc00"
  },
  {
    name: "Building 2",
    year: 1982,
    color: "#333333"
  },
  {
    name: "Building 3",
    year: 1989,
    color: "#888888"
  },
  {
    name: "Building 4",
    year: 1995,
    color: "#0000ff"
  },
  {
    name: "Building 5",
    year: 1999,
    color: "#ff0088"
  },
  {
    name: "Building 6",
    year: 2001,
    color: "#ff0000"
  },
  {
    name: "Building 7",
    year: 2004,
    color: "#eeff00"
  }
];

const getFeature = (feature, layer) => {
  if (!feature.properties.id) return;
  const id = feature.properties.id;
  console.log(id);
  layer.bindPopup(
    `<ul>
          <li>Name: ${lutBuildings[id - 1].name}</li>
          <li>Year of construction: ${lutBuildings[id - 1].year}</li>
      </ul>`
  );
  layer.bindTooltip(lutBuildings[id - 1].name);
};

const getStyle = (feature) => {
  return {
    color: lutBuildings[feature.properties.id - 1].color,
    fillOpacity: 0.5
  };
};

fetchData();
