(function () {
    "use strict";

    angular.module('app.services').factory('TroopsChartsService', function ($http, envConfig) {
        return new TroopsChartsService($http, envConfig);
    });

    function TroopsChartsService($http, envConfig) {
        var url = envConfig.API_HOST + '/api/v1/statistics/troop/';

        this.all = function (id) {
            return $http.get(url + id + '/');
        };
    }

})();
