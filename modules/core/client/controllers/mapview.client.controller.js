'use strict';

// angular.module('map', ['uiGmapgoogle-maps']).config(function (uiGmapGoogleMapApiProvider) {
//     uiGmapGoogleMapApiProvider.configure({
//         key: 'AIzaSyCRG9AD9clExYC9enzvFEDJxNpxB84MBzw',
//         v: '3.17',
//         libraries: 'places'
//     });
// })

angular.module('map', ['gservice'])
.controller('mapCtrl', ['$scope', '$state', 'Authentication', '$http', 'gservice', '$q',
	function ($scope, $state, Authentication, $http, gservice, $q) {
	    $scope.formData = {};
	    var coords = {};
	    var lat = 0;
	    var long = 0;
	    $scope.placeList = [];
	    var deferred = $q.defer();
	    gservice.init();
		//gservice.refresh($scope.formData.latitude, $scope.formData.longitude)

		//I'm going to have to do this all in the factory thing
		setTimeout(function(){
			$scope.gymLocations = gservice.getPlaces();
			console.log($scope.gymLocations);
			$scope.$apply();
		}, 2000);
		

	} // End of function
]);
