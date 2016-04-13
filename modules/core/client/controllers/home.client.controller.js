'use strict';

angular.module('core.map', ['gservice'])
.controller('HomeController', ['$scope', 'Authentication', 'gservice',
  function ($scope, Authentication, gservice) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
    var input = document.getElementById('addressTextField');
    var autocomplete = new google.maps.places.Autocomplete(input);
    
    $scope.startGservice = function(){
    	// console.log($scope.selectedGymType);
        gservice.setInput(autocomplete, $scope.selectedGymType, $scope.selectedBusinessType);

    };

    $scope.gymType = [
    	{'name': 'All'},
        {'name': 'CrossFit'},
        {'name': 'HealthClubs'},
        {'name': 'Dance'},
    ];
    $scope.businessType = [
        {'name': 'Commerical'},
        {'name': 'Home'},
    ];
    $scope.selectedGymType = $scope.gymType[0];
    $scope.selectedBusinessType = $scope.businessType[0];
    
  }
]);







