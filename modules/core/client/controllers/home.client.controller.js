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


    uiGmapGoogleMapApi.then(function (maps) {
        $scope.map = { center: { latitude: areaLat, longitude: areaLng }, zoom: areaZoom };
        $scope.options = { scrollwheel: false };
        var events = {
          places_changed: function (searchBox) {}
        };
        $scope.searchbox = { template:'searchbox.tpl.html', events:events};
    });

});