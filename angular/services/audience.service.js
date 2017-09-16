(function () {
    "use strict";

    angular.module('app.services').factory('AudienceService', function ($http, envConfig) {
        return new AudienceService($http, envConfig);
    });

    function AudienceService($http, envConfig) {
        var url = envConfig.API_HOST + '/api/v1/audience/';
        var serialize = function (audience) {
            return {
                description: audience.description,
                location: audience.location
            };
        };

        this.all = function () {
            return $http.get(url);
        };

        this.search = function (searchString) {
            return $http.get(url + '?search=' + searchString)
                .then(function (response) {
                    return response.data;
                });
        };

        this.get = function (id) {
            return $http.get(url + id + '/');
        };

        this.create = function (audience) {
            return $http.post(url, serialize(audience));
        };

        this.update = function (audience) {
            return $http.put(url + audience.id + '/', serialize(audience));
        };

        this.delete = function (audience) {
            return $http.delete(url + audience.id + '/');
        };
    }

})();
