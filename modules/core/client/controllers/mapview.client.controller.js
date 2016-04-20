'use strict';

// angular.module('map', ['uiGmapgoogle-maps']).config(function (uiGmapGoogleMapApiProvider) {
//     uiGmapGoogleMapApiProvider.configure({
//         key: 'AIzaSyCRG9AD9clExYC9enzvFEDJxNpxB84MBzw',
//         v: '3.17',
//         libraries: 'places'
//     });
// })

angular.module('map', ['gservice' , 'ui.bootstrap'])
.controller('mapCtrl', ['$scope', '$state', 'Authentication', '$http', 'gservice', '$q' , '$modal' , '$log',
	function ($scope, $state, Authentication, $http, gservice, $q , $modal , $log) {
		$scope.rate = 7;
		$scope.max = 10;
		$scope.isReadonly = false;
		$scope.hoveringOver = function(value) {
			$scope.overStar = value;
			$scope.percent = 100 * (value / $scope.max);
		};

	    $scope.formData = {};
	    var coords = {};
	    var lat = 0;
	    var long = 0;
	    $scope.placeList = [];
	    var deferred = $q.defer();
	    gservice.init();
		$scope.printDirections = false;
		$scope.openDirections = function (size) {
			$scope.printDirections = false;
			var modalInstance = $modal.open({
			  templateUrl: 'myModalContent.html',
			   controller: function($scope, $modalInstance) {
			   		  $scope.ok = function () {
			   		  	gservice.setPanel();
					  };

					  $scope.cancel = function () {
					    $modalInstance.dismiss('cancel');
					    $scope.printDirections = false;
					  };
			   },
			  resolve: {
			    directions: function () {
			      return $scope.directions;
			    }
			  }
			});

			modalInstance.result.then(function (selectedItem) {
			  $scope.selected = selectedItem;
			}, function () {
			  $log.info('Modal dismissed at: ' + new Date());
			});
		};



		///START DIRECTIONS STUFF
		$scope.startDirections = function(id){
			$scope.printDirections = true;

			// console.log(id.geometry.location.lat, id.geometry.lng());
			console.log(id.geometry.location.lat(), id.geometry.location.lng());
			var location = {lat: id.geometry.location.lat() , lng:id.geometry.location.lng() };
			gservice.setRoute(location);
			//gservice.testMap();
		}

		////GMAP INITIAL FACTORY STUFF		
		setTimeout(function(){
				console.log(gservice.isCommericial())
			if (gservice.isCommericial() === true) {
				$scope.gymLocations = gservice.getPlaces();
				console.log($scope.gymLocations);
				$scope.$apply();
			}else{
				$scope.gymLocations = [{	name: 'Plant Fitness1',
											formatted_address: '1234 5th Street',
											rating: '3'
										}, {name: 'Plant Fitness2',
											formatted_address: '1234 5th Street',
											rating: '3'
										}, {name: 'Plant Fitness3',
											formatted_address: '1234 5th Street',
											rating: '3'
										}, {name: 'Plant Fitness4',
											formatted_address: '1234 5th Street',
											rating: '3'
										}, {name: 'Plant Fitness5',
											formatted_address: '1234 5th Street',
											rating: '3'
										}, {name: 'Plant Fitness6',
											formatted_address: '1234 5th Street',
											rating: '3'
										}];
				$scope.$apply();
			}
			console.log($scope.gymLocations);
		}, 2000);
		

	} // End of function
]);
