(function () {
    "use strict";

    angular.module('app.services').factory('DisciplineService', function ($http, envConfig) {
        return new DisciplineService($http, envConfig);
    });

    function DisciplineService($http, envConfig) {
        var url = envConfig + '/api/v1/discipline/';
        var serialize = function (discipline) {
            return {
                full_name: discipline.full_name,
                short_name: discipline.short_name
            }
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

        this.create = function (discipline) {
            return $http.post(url, serialize(discipline));
        };

        this.update = function (discipline) {
            return $http.put(url + discipline.id + '/', serialize(discipline));
        };

        this.delete = function (discipline) {
            return $http.delete(url + discipline.id + '/');
        };
    }

})();
