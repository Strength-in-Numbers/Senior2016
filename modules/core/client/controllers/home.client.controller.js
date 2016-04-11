'use strict';

angular.module('core.map', ['gservice'])
.controller('HomeController', ['$scope', 'Authentication', 'gservice',
  function ($scope, Authentication, gservice) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
    var input = document.getElementById('addressTextField');
    var autocomplete = new google.maps.places.Autocomplete(input);
    
    $scope.startGservice = function(){
    	console.log('Hello');
    	console.log($scope.selectedType);
    	gservice.grabInput(autocomplete, $scope.selectedType);
    };

    $scope.gymType = [
    	{'name': 'All'},
        {'name': 'CrossFit'},
        {'name': 'HealthClubs'},
        {'name': 'Dance'},
    ];
    $scope.selectedType = $scope.gymType[0];

    // $scope.gym_parameters = [
    //     {'lookupCode': 'CrossFit', 'description': 'Alabama'},
    //     {'lookupCode': 'HealthClubs', 'description': 'Florida'},
    //     {'lookupCode': 'Dance', 'description': 'California'}
    // ];



  }
]);







