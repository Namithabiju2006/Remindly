var map = L.map('map').setView([20.5937, 78.9629], 5);
var marker;

// Load map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
 attribution: '© OpenStreetMap'
}).addTo(map);

// Click to select location
map.on('click', function(e){
    if(marker) map.removeLayer(marker);

    marker = L.marker(e.latlng).addTo(map);

    document.getElementById("lat").value = e.latlng.lat;
    document.getElementById("lng").value = e.latlng.lng;

    // Reverse geocode
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${e.latlng.lat}&lon=${e.latlng.lng}`)
    .then(res=>res.json())
    .then(data=>{
        document.getElementById("locationName").value = data.display_name;
    });
});

// Search location
function searchLocation(){
    let place = document.getElementById("searchBox").value;

    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${place}`)
    .then(res=>res.json())
    .then(data=>{
        let lat = data[0].lat;
        let lon = data[0].lon;

        map.setView([lat, lon], 13);

        if(marker) map.removeLayer(marker);
        marker = L.marker([lat, lon]).addTo(map);

        document.getElementById("lat").value = lat;
        document.getElementById("lng").value = lon;
        document.getElementById("locationName").value = data[0].display_name;
    });
}

// Current location
function getCurrentLocation(){
navigator.geolocation.getCurrentPosition(pos=>{
    let lat = pos.coords.latitude;
    let lon = pos.coords.longitude;

    map.setView([lat, lon], 15);

    if(marker) map.removeLayer(marker);
    marker = L.marker([lat, lon]).addTo(map);
});
}