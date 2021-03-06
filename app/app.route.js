(function() {
  'use strict';

  angular
    .module('ga.route', ['ngRoute'])
    .config(configure);

  configure.$inject = ['$routeProvider', '$locationProvider'];

  function configure($routeProvider, $locationProvider) {
    // Configure the routes
    $routeProvider
    // Leden tabel
      .when('/', {
      templateUrl: 'partials/leden.html',
      controller: 'LedenlijstController'
    })
    // Lid detailpagina
      .when('/lid/:id', {
      templateUrl: 'partials/lid.html',
      controller: 'LidController'
    })
      .otherwise({
      redirectTo: '/'
    });

    //$locationProvider.html5Mode(true).hashPrefix('!');
  }
})();