(function () {
    "use strict";

    angular.module('app.controllers').controller('SpecialtyFormController', SpecialtyFormController);

    function SpecialtyFormController($scope, $state, DialogService, ToastService, SpecialtyService) {
        var vm = this;

        vm.specialty = $scope.specialty;

        if (!vm.specialty)
            vm.specialty = {};

        vm.buttonLocked = false;

        vm.create = function () {
            vm.buttonLocked = true;
            SpecialtyService.create(vm.specialty).then(function () {
                ToastService.show('Специальность создана');
                $state.go('management.specialties-list');
            }, function () {
                vm.buttonLocked = false;
            });
        };

        vm.update = function () {
            vm.buttonLocked = true;
            SpecialtyService.update(vm.specialty).then(function () {
                ToastService.show('Специальность обновлена');
                $state.go('management.specialties-list');
            }, function () {
                vm.buttonLocked = false;
            });
        };

        vm.delete = function () {
            DialogService.delete('Вы действительно хотите удалить специальность ?').then(function () {
                vm.buttonLocked = true;
                SpecialtyService.delete(vm.specialty).then(function () {
                    $state.go('management.specialties-list');
                    ToastService.show('Специальность удалена');
                });
            });
        };
    }

})();
