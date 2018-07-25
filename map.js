// This example adds a search box to a map, using the Google Place Autocomplete
// feature. People can enter geographical searches. The search box will return a
// pick list containing a mix of places and predicted search terms.

// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
  var markers = [];
function initAutocomplete() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -33.8688, lng: 151.2195},
    zoom: 13,
    mapTypeId: 'roadmap'
  });

  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  var input2 = document.getElementById('pac-input2');
  //var searchBox = new google.maps.places.SearchBox(input2);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input2);

  var input3 = document.getElementById('pac-input3');
  //var searchBox = new google.maps.places.SearchBox(input3);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input3);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });


  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
  //markers.forEach(function(marker) {
  //   marker.setMap(null);
  //  });


    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      markers.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      }));

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
}

function middle() {
  var totalLat =0;
  var totalLng =0;

  var thing = JSON.stringify(markers[0]["position"]).replace("(", "{");
  thing = JSON.stringify(markers[0]["position"]).replace(")", "}");
  console.log("Thing is: " + thing);
  //position = position.replace("(", "{");
  //position = position.replace(")", "}");
  for (var i=0;i < markers.length; i +=1){
    var thing = JSON.stringify(markers[i]["position"]).replace("(", "{");
    thing = JSON.stringify(markers[0]["position"]).replace(")", "}");
    console.log(thing[0]);
    totalLat += thing.lat;
    totalLat += thing.lng;
    console.log("for loop " + i + " lat: " + thing[0].lat);
    totalLng += markers[i]["position"][1];
  }
  var latAvg = totalLat/markers.length;
  var lngAvg = totalLng/markers.length;
  console.log("position: " + markers[0]["position"]);
  console.log("position: " + markers[0]["position"][0]);
  console.log("lngAvg= " + lngAvg);
  console.log("totalLat= " + totalLat );
}

function clear() {
        markers(null);
      }

function clear() {
       clear();
       markers = [];
     }
