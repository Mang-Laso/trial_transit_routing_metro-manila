if(navigator.geolocation){
    console.log('Your browser supports Geolocation API!');
    navigator.geolocation.getCurrentPosition(success);
        maximimAge: 10*60*1000;
        timeout: 0;
} else{
    console.log('Your browser does not supports Geolocation API!');
}

function success(position){
    console.log (position)
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    //sconsole.log(lat, lng);

    //Map bounds
    var southWest = L.latLng(5.996826, 118.400825),
    northEast = L.latLng(20.497456, 126.073096),
    bounds = L.latLngBounds(southWest, northEast);

    //Map options
    let mapOptions = {
        center: [lat, lng],
        zoom: 12,
        minZoom: 6,
        maxZoom: 18,
        //maxBoundsViscosity: 1.0,
    }

    const myAPIKey = "72ba55a8fd634344b11cb5424941a28b";
    const apiKey = "72ba55a8fd634344b11cb5424941a28b";

    //Create a map
    var map = L.map('map', mapOptions)
                .setMaxBounds(bounds);

      const isRetina = L.Browser.retina;

      const baseUrl = "https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey={apiKey}";
      const retinaUrl = "https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}@2x.png?apiKey={apiKey}";


    //Tile layer
    let layer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    //Add layer
    layer.addTo(map);
}

function error(error){
    alert('We could not get your current location. Please allow us to success your current location.')
    console.log(error.code);
}

// //Routing API
// const myAPIKey = "72ba55a8fd634344b11cb5424941a28b";
// const fromWaypoint = [14.651530, 120.971443]; // latutude, longitude
// const toWaypoint = [14.601000, 120.989490]; // latitude, longitude
// const url = `https://api.geoapify.com/v1/routing?waypoints=${fromWaypoint.join(',')}|${toWaypoint.join(',')}&mode=transit&details=instruction_details&apiKey=${myAPIKey}`;

// fetch(url).then(res => res.json()).then(result => {
//     console.log(result);
// }, error => console.log(err));

// //Show result
// L.geoJSON(routeResult, {
//     style: (feature) => {
//       return {
//         color: "rgba(20, 137, 255, 0.7)",
//         weight: 5
//       };
//     }
//   }).bindPopup((layer) => {
//     return `${layer.feature.properties.distance} ${layer.feature.properties.distance_units}, ${layer.feature.properties.time}`
//   }).addTo(map);

// //Route Geometry
// const steps = [];
// routeResult.features[0].properties.legs.forEach((leg, legIndex) => {
//   const legGeometry = routeData.features[0].geometry.coordinates[legIndex];
//   leg.steps.forEach((step, index) => {
//     if (step.from_index === step.to_index) {
//       // destination point
//       return;
//     }

//     const stepGeometry = legGeometry.slice(step.from_index, step.to_index + 1);
//     steps.push({
//       "type": "Feature",
//       "geometry": {
//         "type": "LineString",
//         "coordinates": stepGeometry
//       },
//       properties: step
//     });
//   });
// });

// calculate and display routing:
// from
/* const fromWaypoint = [14.651530, 120.971443]; // latutude, longitude
const fromWaypointMarker = L.marker(fromWaypoint).addTo(map).bindPopup("Monumento, Caloocan City");

// to
const toWaypoint = [14.601000, 120.989490]; // latitude, longitude
const toWaypointMarker = L.marker(toWaypoint).addTo(map).bindPopup("Far Eastern Univertsity, Manila");


const turnByTurnMarkerStyle = {
  radius: 5,
  fillColor: "#fff",
  color: "#555",
  weight: 1,
  opacity: 1,
  fillOpacity: 1
}


fetch(`https://api.geoapify.com/v1/routing?waypoints=${fromWaypoint.join(',')}|${toWaypoint.join(',')}&mode=transit&apiKey=${myAPIKey}`).then(res => res.json()).then(result => {

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

}, error => console.log(err)); */




//let watcher = navigator.geolocation.watchPosition(success);

//setTimeout(() => {
//    navigator.geolocation.clearWatch(watcher)
//}, 15000);

fetch("https://api.geoapify.com/v1/routing?waypoints=14.650671705044743,120.97867784300206|14.603427985700947,120.98487504974764&mode=transit&details=instruction_details&apiKey=72ba55a8fd634344b11cb5424941a28b")
  .then(response => response.json())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));