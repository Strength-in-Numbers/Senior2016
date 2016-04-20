'use strict';

// angular.module('core.profile', ['ngToast']).controller('ProfileController', ['$scope', 'Authentication', '$stateParams', 'ngToast',
angular.module('core.profile').controller('ProfileController', ['$scope', 'Authentication', '$stateParams', 
  function ($scope, Authentication, $stateParams) {
   	$scope.params = $stateParams; 
   	console.log($scope.params);
   	if ($scope.parms !== null) {
   		console.log("Successful post!");
   	
 	
   	}
    
  }
]);

