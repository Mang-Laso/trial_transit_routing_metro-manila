// Leaflet has native support for raster maps, So you can create a map with a few commands only!

// The Leaflet map Object
const map = L.map('map').setView([14.658642,120.985043], 12);

// Get your own API Key on https://myprojects.geoapify.com
const myAPIKey = "72ba55a8fd634344b11cb5424941a28b";

// Retina displays require different mat tiles quality
const isRetina = L.Browser.retina;

const baseUrl = "https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey={apiKey}";
const retinaUrl = "https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}@2x.png?apiKey={apiKey}";

// Add map tiles layer. Set 20 as the maximal zoom and provide map data attribution.
L.tileLayer(isRetina ? retinaUrl : baseUrl, {
  attribution: 'Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | <a href="https://openmaptiles.org/" rel="nofollow" target="_blank">© OpenMapTiles</a> <a href="https://www.openstreetmap.org/copyright" rel="nofollow" target="_blank">© OpenStreetMap</a> contributors',
  apiKey: myAPIKey,
  maxZoom: 20,
  id: 'osm-bright',
}).addTo(map);

//var start_location = localStorage.getItem('addressOneValueTransfer');
//var end_location = localStorage.getItem('addressTwoValueTransfer');
var start_location = 'Manila Central University, Caloocan';
var end_location = 'Centro Escolar Universirty, Manila'

var geocodingInitialURL = `https://api.geoapify.com/v1/geocode/search?text=` + encodeURIComponent(start_location) + `&limit=1&filter=countrycode:ph&bias=countrycode:ph&format=json&apiKey=72ba55a8fd634344b11cb5424941a28b`;

fetch(geocodingInitialURL)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    iLat = data.results[0].lat;
    iLong = data.results[0].lon;

    iLat = iLat;
    iLong = iLong;

    let initialWaypoint = [];
    initialWaypoint[0]= iLat;
    initialWaypoint[1]= iLong;

    var geocodingFinalURL = `https://api.geoapify.com/v1/geocode/search?text=` + encodeURIComponent(end_location) + `&limit=1&filter=countrycode:ph&bias=countrycode:ph&format=json&apiKey=72ba55a8fd634344b11cb5424941a28b`;
  
    fetch(geocodingFinalURL)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        fLat = data.results[0].lat;
        fLong = data.results[0].lon;
    
        fLat = fLat;
        fLong = fLong;
    
        let finalWaypoint = [];
        finalWaypoint[0]= fLat;
        finalWaypoint[1]= fLong;

        // calculate and display routing:
        // from 38.937165,-77.045590 (1920 Quincy Street Northwest, Washington, DC 20011, United States of America)
        //let initialWaypoint = [14.658642,120.985043]; // latutude, longitude
        let fromWaypointMarker = L.marker(initialWaypoint).addTo(map).bindPopup(start_location);
        let fromWaypoint = initialWaypoint.join(',');

        // to 38.881152,-76.990693 (1125 G Street Southeast, Washington, DC 20003, United States of America)
        //let finalWaypoint = [14.5983169,120.9898132]; // latitude, longitude
        let toWaypointMarker = L.marker(finalWaypoint).addTo(map).bindPopup(end_location);
        let toWaypoint = finalWaypoint.join(',');

        const turnByTurnMarkerStyle = {
          radius: 5,
          fillColor: "#fff",
          color: "#555",
          weight: 1,
          opacity: 1,
          fillOpacity: 1
        }


        fetch(`https://api.geoapify.com/v1/routing?waypoints=${fromWaypoint}|${toWaypoint}&mode=transit&details=instruction_details&apiKey=${myAPIKey}`).then(res => res.json()).then(result => {

          // Note! GeoJSON uses [longitude, latutude] format for coordinates
          L.geoJSON(result, {
            style: (feature) => {
              return {
                color: "rgba(20, 137, 255, 0.7)",
                weight: 5
              };
            }
          }).bindPopup((layer) => {
            return `${layer.feature.properties.distance} ${layer.feature.properties.distance_units}, ${layer.feature.properties.time}`
          }).addTo(map);

          // collect all transition positions
          const turnByTurns = [];
          result.features.forEach(feature => feature.properties.legs.forEach((leg, legIndex) => leg.steps.forEach(step => {
            const pointFeature = {
              "type": "Feature",
              "geometry": {
                "type": "Point",
                "coordinates": feature.geometry.coordinates[legIndex][step.from_index]
              },
              "properties": {
                "instruction": step.instruction.text
              }
            }
            turnByTurns.push(pointFeature);
          })));

          L.geoJSON({
            type: "FeatureCollection",
            features: turnByTurns
          }, {
            pointToLayer: function(feature, latlng) {
              return L.circleMarker(latlng, turnByTurnMarkerStyle);
            }
          }).bindPopup((layer) => {
            return `${layer.feature.properties.instruction}`
          }).addTo(map);

        }, error => console.log(err));


          })

          })





