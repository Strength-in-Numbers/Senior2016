'use strict';

angular.module('core').factory('GymLocations', ['$resource',
  function ($resource) {
    return $resource('/gym', {}, {
      update: {
        method: 'GET'
      }
    });
  }
]);