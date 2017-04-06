(function () {
    "use strict";

    angular.module('app.services').factory('TeacherChartsService', function ($http) {
        return new TeacherChartsService($http);
    });

    function TeacherChartsService($http) {
        var url = 'http://api.vk-schedule.dev/api/v1/statistics/teachers_load/';

        this.all = function (dateFrom, dateTo) {
            return $http.get(
                url +
                '?date_from=' + dateFrom +
                '&date_to=' + dateTo
            );
        };
    }

})();