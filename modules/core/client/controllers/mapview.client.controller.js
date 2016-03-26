'use strict';

// angular.module('map', ['uiGmapgoogle-maps']).config(function (uiGmapGoogleMapApiProvider) {
//     uiGmapGoogleMapApiProvider.configure({
//         key: 'AIzaSyCRG9AD9clExYC9enzvFEDJxNpxB84MBzw',
//         v: '3.17',
//         libraries: 'places'
//     });
// })

angular.module('map', ['gservice']).controller('mapCtrl', ['$scope', '$state', 'Authentication', '$http', 'gservice',
	function ($scope, $state, Authentication, $http, gservice) {
	    $scope.formData = {};
	    var coords = {};
	    var lat = 0;
	    var long = 0;
	    // Set initial coordinates to the center of the US
	    $scope.formData.latitude = 39.600;
	    $scope.formData.longitude = -98.550;

	    gservice.refresh($scope.formData.latitude, $scope.formData.longitude);
	    console.log( gservice.test() );
	    //console.log (document.getElementById('map'));
	      //Equipment variables
	    $scope.gymLocations = [{name:'barbell'}, 
	          {name:'squat-rack'}, 
	          {name:'squat-rack1'},
	          {name:'squat-rack2'},
	          {name:'squat-rack3'},
	          {name:'squat-rack4'},
	          {name:'dumbells'}];
	    console.log($scope.gymLocations);
	} // End of function
]);
