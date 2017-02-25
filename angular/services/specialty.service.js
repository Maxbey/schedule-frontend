(function () {
    "use strict";

    angular.module('app.services').factory('SpecialtyService', function ($http, CollectionHelpersService) {
        return new SpecialtyService($http, CollectionHelpersService);
    });

    function SpecialtyService($http, CollectionHelpersService) {
        var url = 'http://api.vk-schedule.dev/api/v1/specialty/';
        var serialize = function (specialty) {
            var disciplines = CollectionHelpersService
                .getIdsFromCollection(specialty.disciplines);

            return {
                code: specialty.code,
                disciplines: disciplines
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
            // specialty.disciplines = CollectionHelpersService.getIdsFromCollection(specialty.disciplines.data);

            return $http.put(url + specialty.id + '/', serialize(specialty));
        };

        this.delete = function (specialty) {
            return $http.delete(url + specialty.id + '/', serialize(specialty));
        };
    }

})();
