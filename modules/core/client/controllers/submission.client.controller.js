'use strict';
//Werid shit where this is the only controller file that works??
angular.module('core').controller('subCtrl', ['$scope', '$state', 'Authentication', '$http','GymLocations',
  function ($scope, $state, Authentication, $http, GymLocations) {
    // Expose view variables
    $scope.$state = $state;
    $scope.authentication = Authentication;

    //Equipment variables
    $scope.equipments = [{name:'barbell'}, 
          {name:'squat-rack'}, 
          {name:'dumbells'}
    ];


    $scope.selection = [];
    $scope.toggleSelection = function toggleSelection(equipmentName){
      var idx = $scope.selection.indexOf(equipmentName);

      // is currently selected
      if (idx > -1) {
        $scope.selection.splice(idx, 1);
      }

      // is newly selected
      else {
        $scope.selection.push(equipmentName);
      }
    };   

    $scope.createPost = function createPost(){
      console.log('SubmissionController: Create post function is called ');
        // Grabs all of the text box fields
        //Schema is in the Server -> Models folder// core.server.model.js
        // var selectedLat = 29.651;
        // var selectedLong = -82.324;
        $scope.formData.longitude = 29.651;
        $scope.formData.latitude = -82.324;
        var userData = {
            username: $scope.formData.username,
            equipment: $scope.selection,
            location: [$scope.formData.longitude, $scope.formData.latitude],
            description: $scope.formData.description,
            images: $scope.formData.image
        };
        console.log(userData);

        // // Saves the user data to the db
        $http.post('/api/gym', userData)
            .success(function (data) {
              console.log('Successly Posted');
                // Once complete, clear the form (except location)
          
                
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    }; //End of create post function

    //Container for the google maps stuff

    var input = document.getElementById('formAddressField');
    var autocomplete = new google.maps.places.Autocomplete(input);
    
    $scope.post = function postFunciton(){
         var studentGrades = {
          username: 'David'

        };
        
        $http.post('/api/gym/post', studentGrades)
        .success(function(res){
          console.log (res);
        });
    }
    $scope.get = function getPost(){
          //Retrieves all of the questions and stores it to a scope
      $http.get('/api/gym/list')
      .success(function(res){
        $scope.data = res;
      });

      // console.log("Get function is called");
      // $scope.locations = GymLocations.update();
      // console.log($scope.locations);
      // $http.get('/gym').then(
      //   function(response) {
      //       console.log(response.data);
      //   },
      //   function(data) {
      //     console.log(data);
      // });
    };

  }//End of main function
]);

