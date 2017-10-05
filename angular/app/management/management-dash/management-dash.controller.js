(function(){
    "use strict";

    angular.module('app.controllers').controller('ManagementDashController', ManagementDashController);

    function ManagementDashController($scope, $window, $interval, $timeout, ToastService, ScheduleService, envConfig){
        var vm = this;

        vm.chartsReady = false;
        vm.loading = false;
        vm.exporting = false;
        vm.scheduleExportLink = false;

        vm.scheduleParams = {};
        vm.progress = false;

        var getScheduleStatus = function(){
          ScheduleService.getStatus().then(function(response){
              vm.progress = false;
              $interval.cancel(vm.interval);
          }, function(response) {
            if (response.status == 400) {
              vm.progress = response.data.progress;
            }
            else {
              vm.progress = false;
              $interval.cancel(vm.interval);
            }
          });
        };

        var getBuildProgress = function(){
          ScheduleService.getStatus().then(function(response){
            vm.progress = false;
          }, function(response) {
            if (response.status == 400) {
              vm.progress = response.data.progress;
              console.log('One time');
              vm.interval = $interval(function() {
                getScheduleStatus();
              }, 3000);
            }
            else {
              vm.progress = false;
            }
          });
        };

        getBuildProgress();

        vm.localExport = function(){
          $window.open(envConfig.API_HOST + '/api/v1/export/excel/');
        };

        vm.buildSchedule = function(){
          var start_date = moment(vm.scheduleParams.start_date).format('YYYY-MM-DD');
          ScheduleService.build(start_date, vm.scheduleParams.term_length).then(function(){
            getBuildProgress();
            while(vm.progress !== false);
          });
        };
    }





})();
