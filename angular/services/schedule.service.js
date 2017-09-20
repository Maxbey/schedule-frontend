(function(){
    "use strict";

    angular.module('app.services').factory('ScheduleService', function($http, envConfig){
      return new ScheduleService($http, envConfig);
    });

    function ScheduleService($http, envConfig){
        var schedule_url = envConfig.API_HOST + '/api/v1/schedule/';
        var export_url = envConfig.API_HOST + '/api/v1/export/excel/';

        this.getStatus = function(id){
            return $http.get(schedule_url);
        };

        this.export = function(){
            return $http.get(export_url);
        };

        this.build = function(start_date, term_length){
            var payload = {
                start_date: start_date,
                term_length: term_length
            };

            return $http.post(schedule_url, payload);
        };
    }

})();
