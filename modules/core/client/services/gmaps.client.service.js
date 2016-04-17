'use strict';

// Creates the gservice factory. This will be the primary means by which we interact with Google Maps
angular.module('gservice', [])
    .factory('gservice', function($http){

        // Initialize Variables
        // -------------------------------------------------------------
        // Service our factory will return
        var googleMapService = {};

        // Array of locations obtained from API calls
        var locations = [];
        var gymPlacesList = [];
        // Selected Location (initialize to center of America)
        var selectedLat = 29.651;
        var selectedLong = -82.324;
        var initialPlace;
        var newParameters = 'gym';
        var map;
        var bounds;
        var isCommericial = true;

        // Functions
        // --------------------------------------------------------------
        // // Refresh the Map with new data. Function will take new latitude and longitude coordinates.
        // googleMapService.refresh = function(latitude, longitude){
        //     // Clears the holding array of locations
        //     locations = [];

        //     // Set the selected lat and long equal to the ones provided on the refresh() call
        //     selectedLat = latitude;
        //     selectedLong = longitude;
        //     initialize(latitude, longitude);
        //     // // Perform an AJAX call to get all of the records in the db.
        //     // $http.get('/users').success(function(response){

        //     //     // Convert the results into Google Map Format
        //     //     //locations = convertToMapPoints(response);

        //     //     // Then initialize the map.
        //     //     initialize(latitude, longitude);
        //     // }).error(function(){});
        //     console.log('Gym list: ' + gymPlacesList);

        // };

        // googleMapService.testMap = function(){
        //   var directionsService = new google.maps.DirectionsService;
        //   var directionsDisplay = new google.maps.DirectionsRenderer;
        //   var map = new google.maps.Map(document.getElementById('map'), {
        //     zoom: 7,
        //     center: {lat: 41.85, lng: -87.65}
        //   });
        //   directionsDisplay.setMap(map);
        //   calculateAndDisplayRoute(directionsService, directionsDisplay);
          
        //   // document.getElementById('start').addEventListener('change', onChangeHandler);
        //   // document.getElementById('end').addEventListener('change', onChangeHandler);
        // }

        // var calculateAndDisplayRoute = function(directionsService, directionsDisplay) {
        //   directionsService.route({
        //     origin: {lat: 41.85, lng: -87.65},
        //     destination: {lat: 29.651, lng: -82.324},
        //     travelMode: google.maps.TravelMode.DRIVING
        //   }, function(response, status) {
        //     if (status === google.maps.DirectionsStatus.OK) {
        //       directionsDisplay.setDirections(response);
        //     } else {
        //       window.alert('Directions request failed due to ' + status);
        //     }
        //   });
        // }
        //End of testing

        googleMapService.isCommericial = function(){
            return isCommericial;
        }
        googleMapService.getPlaces = function(){
            return gymPlacesList;
        };
        googleMapService.init = function(){
            initialize(selectedLat, selectedLong);
        };
        googleMapService.setInput = function(searchBox, inputParameters, businessType){
            var init = searchBox.getPlace();
            var newLatLng = init.geometry.location;
            selectedLat = newLatLng.lat();
            selectedLong = newLatLng.lng();
            if (inputParameters.name !== 'All'){
                newParameters = inputParameters.name;
            }else {
                newParameters = 'gym';
            }
            initialPlace = searchBox.getPlace();
            if (businessType.name === 'Commerical'){
                isCommericial = true;
            }else {
                isCommericial = false;
                
                // $http.get('/api/gym').success(function(response){
                //     console.log(response);
                // // Convert the results into Google Map Format
                // //locations = convertToMapPoints(response);

                // // Then initialize the map.
                // //initialize(latitude, longitude);
                // }).error(function(){
                //     console.log("Error occured");
                // });
            }

            //Initalized is called after the inputs are set
            //initialize(selectedLat, selectedLong);
        };
        googleMapService.setRoute = function(location){
            console.log(location);
            var directionsService = new google.maps.DirectionsService;
            var directionsDisplay = new google.maps.DirectionsRenderer;
            directionsDisplay.setMap(map);
            directionsDisplay.setPanel(document.getElementById('directions-panel'));
            getRoute({lat: selectedLat, lng: selectedLong}, location, google.maps.TravelMode.DRIVING,directionsService, directionsDisplay)
        };
        var getRoute = function(origin_place, destination_place, travel_mode, directionsService, directionsDisplay) {

            if (!origin_place || !destination_place) {
              return;
            }
            directionsService.route({
              // origin: {'placeId': origin_place_id},
              // destination: {'placeId': destination_place_id},
              origin: origin_place,
              destination: destination_place,
              travelMode: google.maps.TravelMode.DRIVING
            }, function(response, status) {
              if (status === google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
              } else {
                window.alert('Directions request failed due to ' + status);
              }
            });
        };
        
        // Private Inner Functions
        // --------------------------------------------------------------
        //Callback on nearby search request
        var callback = function(results, status) {
            var locations = [];
            var maxSize = 5;
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                console.log('Status request succeed, result is length: ' + results.length);
                gymPlacesList = results.slice(0, maxSize);
                createMarkers(gymPlacesList);
            }else{
                console.log('Status request failed');
            }
        };
        var createMarkers = function(places) {
            //var placesList = document.getElementById('places');
            for (var i = 0, place; i < places.length; i++) {
                place = places[i];
                //Image will hopefully represent a gym? might change to default marker
                var image = {
                    url: place.icon,
                    size: new google.maps.Size(71, 71),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(17, 34),
                    scaledSize: new google.maps.Size(25, 25)
                };
                var infowindow = new google.maps.InfoWindow();
                var marker = new google.maps.Marker({
                    map: map,
                    icon: image, // 'http://maps.google.com/mapfiles/ms/icons/red-dot.png' //replace for default icon
                    title: place.name,
                    position: place.geometry.location
                });
                google.maps.event.addListener(marker, 'click', function() {
                    infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + 
                      place.formatted_address + '</div>');
                    infowindow.open(map, this);
                });

                //placesList.innerHTML += '<li>' + place.name + '</li>';

                bounds.extend(place.geometry.location);
            }
            map.fitBounds(bounds);
        };
        // Convert a JSON of user submitted places into map points
        var convertToMapPoints = function(response){

            // Clear the locations holder
            var locations = [];

            // Loop through all of the JSON entries provided in the response
            for(var i= 0; i < response.length; i++) {
                var user = response[i];

                // Create popup windows for each record
                var  contentString =
                    '<p><b>Username</b>: ' + user.username +
                    '<br><b>Age</b>: ' + user.age +
                    '<br><b>Gender</b>: ' + user.gender +
                    '<br><b>Favorite Language</b>: ' + user.favlang +
                    '</p>';

                // Converts each of the JSON records into Google Maps Location format (Note [Lat, Lng] format).
                locations.push({
                    latlon: new google.maps.LatLng(user.location[1], user.location[0]),
                    message: new google.maps.InfoWindow({
                        content: contentString,
                        maxWidth: 320
                    }),
                    username: user.username,
                    gender: user.gender,
                    age: user.age,
                    favlang: user.favlang
                });
            }
            // location is now an array populated with records in Google Maps format
            return locations;
        };

        // Initializes the map
        var initialize = function(latitude, longitude) {

            // Uses the selected lat, long as starting point
            var myLatLng = {lat: latitude, lng: longitude};
            //var myLatLng = {lat: 29.651, lng: -82.324};

            console.log('newParameters: ' + newParameters);
            // Create a new map and place in the index.html page
            map = new google.maps.Map(document.getElementById('map'), {
                zoom: 6,
                center: myLatLng
            });
            var opt = { minZoom: 6, maxZoom: 17 };
            map.setOptions(opt);
            bounds = new google.maps.LatLngBounds();
            var initialLocation = new google.maps.LatLng(myLatLng.lat, myLatLng.lng);
            var marker = new google.maps.Marker({
                position: initialLocation,
                animation: google.maps.Animation.BOUNCE,
                map: map,
                icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
            });
            bounds.extend(initialLocation);
            map.fitBounds(bounds);

            if (isCommericial) {
                //Does a search for gyms
                var service = new google.maps.places.PlacesService(map);
                var request = {
                    location: myLatLng,
                    radius: 10000, //note this integer is represented as meters
                    //type: ['gym']
                    query: newParameters,
                    openNow: true //optional query

                };
                // service.nearbySearch(request, callback);
                service.textSearch(request, callback);
            }else {
                console.log("starting doing home stuff");
                // Loop through each location in the array and place a marker
                gymPlacesList = locations;
                locations.forEach(function(n, i){
                    var marker = new google.maps.Marker({
                        position: n.latlon,
                        map: map,
                        title: 'Big Map',
                        icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                    });

                    // For each marker created, add a listener that checks for clicks
                    google.maps.event.addListener(marker, 'click', function(e){

                        // When clicked, open the selected marker's message
                        currentSelectedMarker = n;
                        n.message.open(map, marker);
                    });
                });
            }

        };

    // Refresh the page upon window load. Use the initial latitude and longitude
    //google.maps.event.addDomListener(window, 'load', googleMapService.refresh(selectedLat, selectedLong));

    return googleMapService;
});