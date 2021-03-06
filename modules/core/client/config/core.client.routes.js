'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {

    // Redirect to 404 when route not found
    $urlRouterProvider.otherwise('not-found');

    // Home state routing
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'modules/core/views/home.client.view.html'
      })
      .state('map', {
        url: '/map',
        templateUrl: 'modules/core/views/map.client.view.html'
      })
      .state('form', {
        url: '/form',
        templateUrl: 'modules/core/views/submission.client.view.html'
      })
      .state('profile', {
        url: '/profile',
        templateUrl: 'modules/core/views/profile.client.view.html',
        params: {
          isSuccess: false
        }
      })
      .state('not-found', {
        url: '/not-found',
        templateUrl: 'modules/core/views/404.client.view.html'
      });

  }
]);
