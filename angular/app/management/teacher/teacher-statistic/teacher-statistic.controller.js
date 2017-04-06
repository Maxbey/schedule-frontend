(function(){
    "use strict";

    angular.module('app.controllers').controller('TeachersStatisticController', TeachersStatisticController);

    function TeachersStatisticController($state){
        var vm = this;
        vm.teacherStatistic = [
            {
                name: 'Глебов',
                statistics: {
                    absolute: 163,
                    relative: 0.3
                }
            },
            {
                name: 'Пепеляев',
                statistics: {
                    absolute: 123,
                    relative: 0.6
                }
            }
        ];

        vm.chart = convertData(vm.teacherStatistic);

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
    }

})();