'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication',
  function ($scope, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
  }
]);


angular.module('map', ['uiGmapgoogle-maps'])
.config(function (uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyCRG9AD9clExYC9enzvFEDJxNpxB84MBzw',
        v: '3.17',
        libraries: 'places'
    });
})
.controller('mapController', function ($scope, uiGmapGoogleMapApi) {

    // Define variables for our Map object
    var areaLat = 37.09024,
        areaLng = -95.712891,
        areaZoom = 4;
    //var searchBox = new google.maps.places.SearchBox(input);
    $scope.searchbox = { 
        model : '',
        template : 'searchbox.tpl.html',
        options: {
              autocomplete:true,
              componentRestrictions: {country: 'ch'}
         },
        position:'top-left',
        events: {
            places_changed: function(searchBox){

                var places = searchBox.getPlaces()[0];
                  if (places.length === 0) {
                    console.log('Places are 0 thus return');
                    return; 
                  }
                var lat = places.geometry.location.lat();
                var lon = places.geometry.location.lng();
                $scope.marker = {
                    id: Date.now(),
                    coordinates: {
                        latitude: lat,
                        longitude: lon
                    }
                };
                $scope.map.center = {
                  latitude: lat,
                  longitude: lon,
                  zoom: 10
                };
                console.log('Places are: ' + places.geometry.location);
                console.log('Places name: ' + places.name);
            }
        }
     // events : {
          
  //         // places_changed : function (searchbox) {
     //      //       vm.place = searchbox.getPlaces()[0];
     //      //       vm.coordinates = { latitude : vm.place.geometry.location.lat(), longitude : vm.place.geometry.location.lng()  }
     //      // }
     // }
    };
    $scope.marker = {
        id: Date.now(),
        coordinates: {
            latitude: areaLat,
            longitude: areaLng
        }
    };
    $scope.map = { center: { latitude: areaLat, longitude: areaLng }, zoom: areaZoom };
    $scope.options = { scrollwheel: false };

    //Map is loaded after the promise (for whatever reason)
    uiGmapGoogleMapApi.then(function (maps) {
              

         
    }); // End of then function

});