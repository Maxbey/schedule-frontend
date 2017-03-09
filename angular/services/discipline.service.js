(function () {
    "use strict";

    angular.module('app.services').factory('DisciplineService', function ($http, CollectionHelpersService) {
        return new DisciplineService($http, CollectionHelpersService);
    });

    function DisciplineService($http, CollectionHelpersService) {
        var url = 'http://vk-schedule.omgtu.ru/api/v1/discipline/';
        var serialize = function (discipline) {
            var specialties = CollectionHelpersService.getIdsFromCollection(discipline.specialties);

            return {
                full_name: discipline.full_name,
                short_name: discipline.short_name,
                specialties: specialties
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
