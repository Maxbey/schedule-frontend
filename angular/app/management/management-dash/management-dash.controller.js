(function(){
    "use strict";

    angular.module('app.controllers').controller('ManagementDashController', ManagementDashController);

    function ManagementDashController($scope, $window, $interval, $timeout, ToastService, ScheduleService){
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
              }, 500);
            }
            else {
              vm.progress = false;
            }
          });
        };

        getBuildProgress();

        // var loadCharts = function(dateFrom, dateTo){
        //   vm.loading = true;

        //   API.all('schedule/teachers-stat').getList({
        //     from: dateFrom,
        //     to: dateTo
        //   }).then(function(stat){
        //     if(angular.isDefined(vm.absolute))
        //     {
        //       delete vm.absolute.data;
        //       delete vm.absolute.labels;
        //     }

        //     vm.absolute = {
        //       data: [],
        //       labels: []
        //     };

        //     vm.relatively = {
        //       data: [],
        //       labels: []
        //     };

        //     vm.absolute.data.push([]);
        //     vm.relatively.data.push([]);

        //     angular.forEach(stat, function(teacher){
        //       vm.absolute.labels.push(teacher.name);
        //       vm.relatively.labels.push(teacher.name);

        //       vm.absolute.data[0].push(teacher.absolute);
        //       vm.relatively.data[0].push(teacher.relatively);
        //     });

        // API для графиков производительности
        // [
        //   {name: 'Глебов',
        //     absolute: 16,
        //     relatively: 0.4
        //   },
        //   {}
        // ]

        //API для получения освоения дисциплины взвода
        // {
        //   code: 331,
        //   disciplinsRate: [
        //     {
        //       name: 'УПМВ',
        //       ratio: 0,4 //на сколько освоена дисциплина
        //     },
        //     {}
        //   ]
        // }
        //
        // [
        //   {
        //     code: 331,
        //     ratio: 0,6
        //   },
        //   {
        //     code: 232,
        //     ratio: 0,4
        //   }
        // ]

        //     $timeout(function() {
        //       $scope.$apply();
        //     });

        //     vm.chartsReady = true;
        //     vm.loading = false;
        //   });
        // };

        // vm.loadCharts = function(){
        //   if(angular.isDefined(vm.from) && angular.isDefined(vm.to))
        //     loadCharts(vm.from.toISOString().split('T')[0], vm.to.toISOString().split('T')[0]);
        //   else {
        //     {
        //       ToastService.show("Укажите временной диапазон");
        //     }
        //   }
        // };

        vm.localExport = function(){
          $window.open('http://api.vk-schedule.dev/api/v1/export/excel/');
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
