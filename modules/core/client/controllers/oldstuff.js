// var mapModule = angular.module('core', ['uiGmapgoogle-maps']);


// mapModule.config(function (uiGmapGoogleMapApiProvider) {
//     uiGmapGoogleMapApiProvider.configure({
//         key: 'AIzaSyCRG9AD9clExYC9enzvFEDJxNpxB84MBzw',
//         v: '3.17',
//         libraries: 'places'
//     });
// })
// .controller('mapController', function ($scope, uiGmapGoogleMapApi) {
//     $scope.initMap = function() {

//         $scope.map = { center: { latitude: areaLat, longitude: areaLng }, zoom: areaZoom };
//         $scope.marker = {
//             id: Date.now(),
//             coordinates: {
//                 latitude: areaLat,
//                 longitude: areaLng
//             }
//         };
//         $scope.options = { scrollwheel: false };
//     };
//     // Define variables for our Map object
//     var areaLat = 37.09024,
//         areaLng = -95.712891,
//         areaZoom = 5;
//     //var searchBox = new google.maps.places.SearchBox(input);
//     $scope.searchbox = { 
//         model : '',
//         template : 'searchbox.tpl.html',
//         options: {
//               autocomplete:true,
//               componentRestrictions: {country: 'ch'}
//          },
//         position:'top-left',
//         events: {
//             places_changed: function(searchBox){

//                 var places = searchBox.getPlaces();
//                 if (places.length === 0) {
//                   console.log('Places are 0 thus return');
//                   return; 
//                 }
//                 // for (var i = 0, newPlace; newPlace) {
//                 //   var lat = places.geometry.location.lat();
//                 //   var lon = places.geometry.location.lng();
//                 //   $scope.marker = {
//                 //       id: Date.now(),
//                 //       coordinates: {
//                 //           latitude: lat,
//                 //           longitude: lon
//                 //       }
//                 //   };
//                 //   $scope.map.center = {
//                 //     latitude: lat,
//                 //     longitude: lon,
//                 //     zoom: 15
//                 //   };
//                 //   console.log('Zoom is now:');
//                 //   console.log('Places are: ' + places.geometry.location);
//                 //   console.log('Places name: ' + places.name);
//                 // }
//             }
//         }
//      // events : {
          
//   //         // places_changed : function (searchbox) {
//      //      //       vm.place = searchbox.getPlaces()[0];
//      //      //       vm.coordinates = { latitude : vm.place.geometry.location.lat(), longitude : vm.place.geometry.location.lng()  }
//      //      // }
//      // }
//     };


//     //Map is loaded after the promise (for whatever reason)
//     uiGmapGoogleMapApi.then(function (maps) {
              

         
//     }); // End of then function

// });

// var gSerivceModule = angular.module('core', ['gservice','uiGmapgoogle-maps']);
//var gSerivceModule = angular.module('core');

// angular.module('core').controller('mapCtrl', ['$scope', '$state', 'Authentication', '$http',
//   function ($scope, $state, Authentication, $http) {
    // $scope.formData = {};
    // var coords = {};
    // var lat = 0;
    // var long = 0;
    // // Set initial coordinates to the center of the US
    // $scope.formData.latitude = 39.500;
    // $scope.formData.longitude = -98.350;

    // //gservice.refresh($scope.formData.latitude, $scope.formData.longitude);

    //   //Equipment variables
    // $scope.gymLocations = [{name:'barbell'}, 
    //       {name:'squat-rack'}, 
    //       {name:'squat-rack1'},
    //       {name:'squat-rack2'},
    //       {name:'squat-rack3'},
    //       {name:'squat-rack4'},
    //       {name:'dumbells'}];
    // console.log($scope.gymLocations);
//   }
// ]);

// angular.module('map', ['gservice']).config(function (uiGmapGoogleMapApiProvider) {
//     uiGmapGoogleMapApiProvider.configure({
//         key: 'AIzaSyCRG9AD9clExYC9enzvFEDJxNpxB84MBzw',
//         v: '3.17',
//         libraries: 'places'
//     });
// })
// .controller('mapCtrl', function($scope, gservice) {
//   $scope.formData = {};
//   var coords = {};
//   var lat = 0;
//   var long = 0;
//   // Set initial coordinates to the center of the US
//   $scope.formData.latitude = 39.500;
//   $scope.formData.longitude = -98.350;

//   gservice.refresh($scope.formData.latitude, $scope.formData.longitude);
// });