'use strict';

angular.module('core').factory('GymLocations', ['$resource',
  function ($resource) {
    return $resource('/api/gym', {}, {
      update: {
        method: 'GET'
      }
    });
  }
]);