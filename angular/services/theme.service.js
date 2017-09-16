(function () {
    "use strict";

    angular.module('app.services').factory('ThemeService', function ($http, CollectionHelpersService, envConfig) {
        return new ThemeService($http, CollectionHelpersService, envConfig);
    });

    function ThemeService($http, CollectionHelpersService, envConfig) {
        var url = envConfig.API_HOST + '/api/v1/theme/';
        var serialize = function (theme) {
            var teachers_main = CollectionHelpersService.getIdsFromCollection(theme.teachers_main);
            var teachers_alternative = CollectionHelpersService.getIdsFromCollection(theme.teachers_alternative);
            var specialties = CollectionHelpersService.getIdsFromCollection(theme.specialties);
            var audiences = CollectionHelpersService.getIdsFromCollection(theme.audiences);
            var previous_themes = CollectionHelpersService.getIdsFromCollection(theme.previous_themes);

            return {
                name: theme.name,
                number: theme.number,
                term: theme.term,
                self_education: theme.self_education,
                duration: theme.duration,
                discipline: theme.discipline,
                type: theme.type,
                audiences_count: theme.audiences_count,
                teachers_count: theme.teachers_count,
                teachers_main: teachers_main,
                teachers_alternative: teachers_alternative,
                audiences: audiences,
                previous_themes: previous_themes,
                specialties: specialties
            };
        };

        this.all = function () {
            return $http.get(url);
        };

        this.get = function (id) {
            return $http.get(url + id + '/');
        };

        this.create = function (theme) {
            return $http.post(url, serialize(theme));
        };

        this.update = function (theme) {
            return $http.put(url + theme.id + '/', serialize(theme));
        };

        this.delete = function (theme) {
            return $http.delete(url + theme.id + '/');
        };


        this.getEmptyInstance = function () {
            return {
                self_education: false,
                audiences: [],
                teachers_main: [],
                teachers_alternative: [],
                specialties: [],
                previous_themes: []
            };
        };
    }

})();
