(function () {
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
      // Lid toevoegen
      .when('/lid/toevoegen', {
        templateUrl: 'partials/lid-toevoegen.html',
        controller: 'LidToevoegenController'
      })
      // Lid detailpagina
      .when('/lid/:id', {
        templateUrl: 'partials/lid.html',
        controller: 'LidController'
      })
      // Groepsinstellingen
      .when('/groepsinstellingen', {
        templateUrl: 'partials/groepsinstellingen.html'
          /*controller: 'GroepsinstellingenController'*/
      })
      .otherwise({
        redirectTo: '/'
      });

    //$locationProvider.html5Mode(true).hashPrefix('!');
  }
})();