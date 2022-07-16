var apiUrl = "https://api.data.gov.sg/v1/environment/psi";

let tiles = new L.TileLayer(
  "https://maps-{s}.onemap.sg/v3/Default/{z}/{x}/{y}.png",
  {
    detectRetina: true,
    maxZoom: 15,
    minZoom: 11,
    attribution:
      '<img src="https://docs.onemap.sg/maps/images/oneMap64-01.png" style="height:20px;width:20px;">' +
      'New OneMap | Map data © contributors, <a href="http://SLA.gov.sg">Singapore Land Authority</a>',
  }
);
let map = new L.Map("map", {
  center: [1.347833, 103.809357],
  zoom: 12,
  maxBounds: L.latLngBounds(L.latLng(1.1, 103.5), L.latLng(1.5, 104.3)),
}).addLayer(tiles);

async function getUrl(url) {
  const response = await fetch(url);

  var data = await response.json();
  return data;
}

function formatDate(elem, date) {
  const options = {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  };
  const formattedDate = date.toLocaleDateString("en-SG", options);
  elem.textContent = `${formattedDate}`;
}

const centreLatLong = [1.36149, 103.813588];
const northLatLong = [1.415376, 103.813588];
const southLatLong = [1.301465, 103.813588];
const eastLatLong = [1.36149, 103.921016];
const westLatLong = [1.36149, 103.724013];

let reading = {
  centre: 14,
  north: 14,
  south: 14,
  east: 14,
  west: 14,
};
let centreReading = 14;
let northReading = 14;
let southReading = 14;
let eastReading = 14;
let westReading = 14;

let colorScale = d3.scaleLinear().domain([0, 251]).range([0, 1]);

getUrl(apiUrl).then((data) => {
  console.log(data);
  const pm25_hourly = data.items[0].readings.pm25_twenty_four_hourly;
  console.log(pm25_hourly);
  reading = {
    centre: pm25_hourly.central,
    north: pm25_hourly.north,
    south: pm25_hourly.south,
    east: pm25_hourly.east,
    west: pm25_hourly.west,
  };

  var centreCircle = L.circle(centreLatLong, {
    color: d3.interpolateYlOrRd(colorScale(reading.centre)),
    fillColor: d3.interpolateYlOrRd(colorScale(reading.centre)),
    fillOpacity: 0.5,
    radius: 1500,
  }).addTo(map);

  var centreMarker = L.marker(centreLatLong, {
    icon: new L.divIcon({
      html: `<span>${reading.centre}</span>`,
      className: "circle-label",
      iconSize: [20, 20],
    }),
  }).addTo(map);

  var northCircle = L.circle(northLatLong, {
    color: d3.interpolateYlOrRd(colorScale(reading.north)),
    fillColor: d3.interpolateYlOrRd(colorScale(reading.north)),
    fillOpacity: 0.5,
    radius: 1500,
  }).addTo(map);

  var northMarker = L.marker(northLatLong, {
    icon: new L.divIcon({
      html: `<span>${reading.north}</span>`,
      className: "circle-label",
      iconSize: [20, 20],
    }),
  }).addTo(map);

  var southCircle = L.circle(southLatLong, {
    color: d3.interpolateYlOrRd(colorScale(reading.south)),
    fillColor: d3.interpolateYlOrRd(colorScale(reading.south)),
    fillOpacity: 0.5,
    radius: 1500,
  }).addTo(map);

  var southMarker = L.marker(southLatLong, {
    icon: new L.divIcon({
      html: `<span>${reading.south}</span>`,
      className: "circle-label",
      iconSize: [20, 20],
    }),
  }).addTo(map);

  var eastCircle = L.circle(eastLatLong, {
    color: d3.interpolateYlOrRd(colorScale(reading.east)),
    fillColor: d3.interpolateYlOrRd(colorScale(reading.east)),
    fillOpacity: 0.5,
    radius: 1500,
  }).addTo(map);

  var eastMarker = L.marker(eastLatLong, {
    icon: new L.divIcon({
      html: `<span>${reading.east}</span>`,
      className: "circle-label",
      iconSize: [20, 20],
    }),
  }).addTo(map);

  var westCircle = L.circle(westLatLong, {
    color: d3.interpolateYlOrRd(colorScale(reading.west)),
    fillColor: d3.interpolateYlOrRd(colorScale(reading.west)),
    fillOpacity: 0.5,
    radius: 1500,
  }).addTo(map);

  var westMarker = L.marker(westLatLong, {
    icon: new L.divIcon({
      html: `<span>${reading.west}</span>`,
      className: "circle-label",
      iconSize: [20, 20],
    }),
  }).addTo(map);
});
