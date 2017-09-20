(function () {
    "use strict";

    angular.module('app.services').factory('TeacherService', function ($http, envConfig) {
        return new TeacherService($http, envConfig);
    });

    function TeacherService($http, envConfig) {
        var url = envConfig.API_HOST + '/api/v1/teacher/';
        var serialize = function (teacher) {
            return {
                name: teacher.name,
                military_rank: teacher.military_rank,
                work_hours_limit: teacher.work_hours_limit
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

        this.create = function (teacher) {
            return $http.post(url, serialize(teacher));
        };

        this.update = function (teacher) {
            return $http.put(url + teacher.id + '/', serialize(teacher));
        };

        this.delete = function (teacher) {
            return $http.delete(url + teacher.id + '/');
        };
    }

})();
