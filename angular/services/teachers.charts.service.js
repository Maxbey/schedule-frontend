(function () {
    "use strict";

    angular.module('app.services').factory('TeacherChartsService', function ($http, envConfig) {
        return new TeacherChartsService($http, envConfig);
    });

    function TeacherChartsService($http, envConfig) {
        var url = envConfig.API_HOST + '/api/v1/statistics/teachers_load/';

        this.all = function (dateFrom, dateTo) {
            return $http.get(
                url +
                '?date_from=' + dateFrom +
                '&date_to=' + dateTo
            );
        };
    }

})();
