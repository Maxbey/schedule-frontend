(function () {
    "use strict";

    angular.module('app.controllers').controller('TroopFormController', TroopFormController);

    function TroopFormController($scope, $state, SpecialtyService, TroopService, DialogService, ToastService) {
        var vm = this;

        vm.troop = $scope.troop;

        vm.buttonLocked = false;

        SpecialtyService.all().then(function (response) {
            if (!response.data.length) {
                DialogService.action(
                    'В системе не зарегистрированно ни одной специальности. Создание взвода невозможно!',
                    'Добавить специальность'
                ).then(function () {
                    $state.go('management.specialty-create');
                }, function () {
                    $state.go('management.troops-list');
                });
            }
            else {
                vm.specialties = response.data;
            }
        });

        vm.create = function () {
            vm.buttonLocked = true;
            TroopService.create(vm.troop).then(function () {
                ToastService.show('Взвод создан');
                $state.go('management.troops-list');
            }, function () {
                vm.buttonLocked = false;
            });
        };

        vm.update = function () {
            vm.buttonLocked = true;
            TroopService.update(vm.troop).then(function () {
                ToastService.show('Взвод обновлен');
                $state.go('management.troops-list');
            }, function () {
                vm.buttonLocked = false;
            });
        };

        vm.delete = function () {
            DialogService.delete('Вы действительно хотите удалить взвод ?').then(function () {
                vm.buttonLocked = true;
                TroopService.delete(vm.troop).then(function () {
                    ToastService.show('Взвод удален');
                    $state.go('management.troops-list');
                });
            });

        };

    }

})();
