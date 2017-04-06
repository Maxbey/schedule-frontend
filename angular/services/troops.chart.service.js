(function () {
    "use strict";

    angular.module('app.services').factory('TroopsChartsService', function ($http) {
        return new TroopsChartsService($http);
    });

    function TroopsChartsService($http) {
        var url = 'http://api.vk-schedule.dev/api/v1/statistics/troop/';

        this.all = function (id) {
            return $http.get(url + id + '/');
        };
    }

})();