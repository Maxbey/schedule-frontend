(function(){
    "use strict";

    angular.module('app.services').factory('TroopService', function($http){
      return new TroopService($http);
    });

    function TroopService($http){
        var url = 'http://localhost/api/v1/troop/';

        var serialize = function(troop){
            return {
                code: troop.code,
                day: troop.day,
                term: troop.term,
                specialty: troop.specialty

            };
        };

        this.all = function(){
            return $http.get(url);
        };

        this.get = function(id){
            return $http.get(url + id + '/');
        };

        this.create = function(troop){
            return $http.post(url, serialize(troop));
        };

        this.update = function(troop){
            return $http.put(url + troop.id + '/', serialize(troop));
        };

        this.delete = function(troop){
            return $http.delete(url + troop.id + '/');
        };
    }

})();
