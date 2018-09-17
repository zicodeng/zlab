const map = L.map('map').setView([51.505, -0.09], 13);

// Map data from Mapbox
const accessToken =
    'pk.eyJ1Ijoiemljb2RlbmciLCJhIjoiY2ptMnA0ZjB0MXZ2YzNvbXQ5NnE2ejBiZiJ9.bd3SXSYI7N_Nuy7ddUGeTQ';

// Add tile layer
L.tileLayer(
    'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',
    {
        attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken
    }
).addTo(map);

// Various markers
const marker = L.marker([51.5, -0.09]).addTo(map);
marker.on('click', function() {
    console.log('Marker clicked');
});
const circle = L.circle([51.508, -0.11], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(map);
const polygon = L.polygon([
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047]
]).addTo(map);

// Popup
const popup = L.popup();
map.on('click', function(e) {
    popup
        .setLatLng(e.latlng)
        .setContent('You clicked the map at ' + e.latlng.toString())
        .openOn(map);
});
