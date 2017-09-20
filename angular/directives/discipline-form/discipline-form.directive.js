(function () {
    "use strict";

    angular.module('app.controllers').controller('DisciplineFormController', DisciplineFormController);

    function DisciplineFormController($scope, $state, DisciplineService, ToastService, DialogService) {
        var vm = this;

        vm.discipline = $scope.discipline;
        if (!vm.discipline)
            vm.discipline = {};

        vm.buttonLocked = false;

        vm.create = function () {
            vm.buttonLocked = true;
            DisciplineService.create(vm.discipline).then(function () {
                ToastService.show('Дисциплина создана');
                $state.go('management.disciplines-list');
            }, function () {
                vm.buttonLocked = false;
            });
        };

        vm.update = function () {
            vm.buttonLocked = true;
            DisciplineService.update(vm.discipline).then(function () {
                ToastService.show('Дисциплина обновлена');
                $state.go('management.disciplines-list');
            }, function () {
                vm.buttonLocked = false;
            });
        };

        vm.delete = function () {
            DialogService.delete('Вы действительно хотите удалить дисциплину ?').then(function () {
                vm.buttonLocked = true;
                DisciplineService.delete(vm.discipline).then(function () {
                    ToastService.show('Дисциплина удалена');
                    $state.go('management.disciplines-list');
                });
            });
        };
    }

})();
