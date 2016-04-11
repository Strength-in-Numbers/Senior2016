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
        var newParameters = 'gym';
        var map;
        var bounds;

        // Functions
        // --------------------------------------------------------------
        // Refresh the Map with new data. Function will take new latitude and longitude coordinates.
        googleMapService.refresh = function(latitude, longitude){
            // Clears the holding array of locations
            locations = [];

            // Set the selected lat and long equal to the ones provided on the refresh() call
            selectedLat = latitude;
            selectedLong = longitude;
            initialize(latitude, longitude);
            // // Perform an AJAX call to get all of the records in the db.
            // $http.get('/users').success(function(response){

            //     // Convert the results into Google Map Format
            //     //locations = convertToMapPoints(response);

            //     // Then initialize the map.
            //     initialize(latitude, longitude);
            // }).error(function(){});
            console.log('Gym list: ' + gymPlacesList);

        };
        googleMapService.getPlaces = function(){
            return gymPlacesList;
        };
        googleMapService.init = function(){
            initialize(selectedLat, selectedLong);
        };
        googleMapService.grabInput = function(searchBox, inputParameters){
            var place = searchBox.getPlace();
            var newLatLng = place.geometry.location;
            selectedLat = newLatLng.lat();
            selectedLong = newLatLng.lng();
            console.log('New LTLNG:' + selectedLat + selectedLong);
            
            console.log(inputParameters);
            if (inputParameters.name !== 'All'){
                newParameters = inputParameters.name;
            }else {
                console.log('is equal to All');
            }
        };
        // Private Inner Functions
        // --------------------------------------------------------------
        //Callback on nearby search request
        var callback = function(results, status) {
            var locations = [];
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                console.log('Status request succeed, result is length: ' + results.length);
                createMarkers(results);
                gymPlacesList = results;
            }else{
                console.log('Status request failed');
            }
        };
        var createMarkers = function(places) {
            //var placesList = document.getElementById('places');
            var maxPlaces = 5;
            for (var i = 0, place; i < places.length && i < maxPlaces; i++) {
                place = places[i];
                //Image will hopefully represent a gym? might change to default marker
                var image = {
                    url: place.icon,
                    size: new google.maps.Size(71, 71),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(17, 34),
                    scaledSize: new google.maps.Size(25, 25)
                };

                var marker = new google.maps.Marker({
                    map: map,
                    icon: image, // 'http://maps.google.com/mapfiles/ms/icons/red-dot.png' //replace for default icon
                    title: place.name,
                    position: place.geometry.location
                });

                //placesList.innerHTML += '<li>' + place.name + '</li>';

                bounds.extend(place.geometry.location);
            }
            map.fitBounds(bounds);
        };
        // Convert a JSON of users into map points
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
            // If map has not been created already...
            //if (!map){

                // Create a new map and place in the index.html page
                map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 6,
                    center: myLatLng
                });
                var opt = { minZoom: 6, maxZoom: 17 };
                map.setOptions(opt);

                //Does a search for gyms
                var service = new google.maps.places.PlacesService(map);
                var request = {
                    location: myLatLng,
                    radius: 10000, //note this integer is represented as meters
                    //type: ['gym']
                    query: newParameters

                };
                // service.nearbySearch(request, callback);
                // Set initial location as a bouncing red marker
                bounds = new google.maps.LatLngBounds();
                var initialLocation = new google.maps.LatLng(myLatLng.lat, myLatLng.lng);
                var marker = new google.maps.Marker({
                    position: initialLocation,
                    animation: google.maps.Animation.BOUNCE,
                    map: map,
                    icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
                });
                console.log(initialLocation);
                bounds.extend(initialLocation);
                map.fitBounds(bounds);

                service.textSearch(request, callback);

            // }

            // Loop through each location in the array and place a marker
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



            //lastMarker = marker;

        };

    // Refresh the page upon window load. Use the initial latitude and longitude
    //google.maps.event.addDomListener(window, 'load', googleMapService.refresh(selectedLat, selectedLong));

    return googleMapService;
});