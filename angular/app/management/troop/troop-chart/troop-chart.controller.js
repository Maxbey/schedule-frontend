(function(){
    "use strict";

    angular.module('app.controllers').controller('TroopChartController', TroopChartController);

    function TroopChartController($stateParams, $scope, TroopsChartsService){
        var vm = this;
        $scope.data = [];
        vm.troop = {};
        vm.troop.id = $stateParams.id;

        TroopsChartsService.all($stateParams.id)
            .then(function(response) {
                vm.troop = response.data;
                $scope.data.push(vm.troop.statistics.total_progress * 100);
                $scope.data.push((1 - vm.troop.statistics.total_progress) * 100);
            })

        $scope.labels = ["Изучено", "Неизучено"];
    }

})();
