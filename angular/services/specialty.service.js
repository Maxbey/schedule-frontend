(function () {
    "use strict";

    angular.module('app.services').factory('SpecialtyService', function ($http) {
        return new SpecialtyService($http);
    });

    function SpecialtyService($http) {
        var url = 'https://vk-schedule.omgtu.ru/api/v1/specialty/';
        var serialize = function (specialty) {

            return {
                code: specialty.code
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

        this.create = function (specialty) {
            return $http.post(url, serialize(specialty));
        };

        this.update = function (specialty) {
            return $http.put(url + specialty.id + '/', serialize(specialty));
        };

        this.delete = function (specialty) {
            return $http.delete(url + specialty.id + '/', serialize(specialty));
        };
    }

})();
