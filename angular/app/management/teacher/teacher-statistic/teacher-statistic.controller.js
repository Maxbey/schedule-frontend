(function(){
    "use strict";

    angular.module('app.controllers').controller('TeachersStatisticController', TeachersStatisticController);

    function TeachersStatisticController($state, $scope, TeacherChartsService, $timeout){
        var vm = this;
        vm.teacherStatistic = [];
        vm.chartsIsLoaded = false;

        function convertData(data) {
            var resultObject = {
                relativeData: [],
                absoluteData: [],
                labels: []
            };

            var relativeData = [];
            var absoluteData = [];

            data.map(function(item, index){
                relativeData.push(item.statistics.relative);
                absoluteData.push(item.statistics.absolute);
                resultObject.labels.push(item.name);
            });

            resultObject.relativeData.push(relativeData);
            resultObject.absoluteData.push(absoluteData);

            return resultObject;
        }

        vm.loadCharts = function(dateFrom, dateTo) {
            vm.chartsIsLoaded = false;
            var formatedDateFrom = moment(dateFrom).format('YYYY-MM-DD');
            var formatedDateTo = moment(dateTo).format('YYYY-MM-DD');

            TeacherChartsService.all(formatedDateFrom, formatedDateTo)
                .then(function(response){
                    vm.chart = convertData(response.data);
                    vm.chartsIsLoaded = true;
                });
        }
    }
})();