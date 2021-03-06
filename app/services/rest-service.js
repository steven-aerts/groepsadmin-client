(function() {
  'use strict';

  angular
    .module('ga.services.rest', ['ngResource'])
    .factory('RestService', RestService);

  RestService.$inject = ['$resource', '$cacheFactory'];

  function RestService($resource, $cacheFactory) {
    return {
      Lid: $resource(
        'https://groepsadmin-dev-tvl.scoutsengidsenvlaanderen.be/groepsadmin/rest-ga/lid/:id',
        {id: '@id'},
        {'update': {method: 'PATCH', transformRequest: changesOnly, cache: false}}
      ),
      Functie: $resource(
        'https://groepsadmin-dev-tvl.scoutsengidsenvlaanderen.be/groepsadmin/rest-ga/functie/:functieId',
        {functieId: '@functieId'},
        {get: {method:'GET', cache: $cacheFactory('functiesCache')}}
      ),
      Groep: $resource(
        'https://groepsadmin-dev-tvl.scoutsengidsenvlaanderen.be/groepsadmin/rest-ga/groep/:id',
        {functieId: '@id'},
        {get: {method:'GET', cache: $cacheFactory('groepenCache')}}
      )
    }
  }
  
  function changesOnly(data) {
    if(data.changes) {
      var changes = new Object();
      //changes.id = data.id;  // id verplicht meesturen
      
      data.changes.forEach(function (val, key, array) {
        changes[val] = data[val];
      });
      
      return JSON.stringify(changes);
    } else {
      return JSON.stringify(data);
    }
  }
})();