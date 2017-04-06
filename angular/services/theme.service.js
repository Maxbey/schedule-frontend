(function () {
    "use strict";

    angular.module('app.services').factory('ThemeService', function ($http, CollectionHelpersService) {
        return new ThemeService($http, CollectionHelpersService);
    });

    function ThemeService($http, CollectionHelpersService) {
        var url = 'https://vk-schedule.omgtu.ru/api/v1/theme/';
        var serialize = function (theme) {
            var teachers = CollectionHelpersService.getIdsFromCollection(theme.teachers);
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
                teachers: teachers,
                audiences: audiences,
                previous_themes: previous_themes
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
                teachers: [],
                previous_themes: []
            };
        };
    }

})();
