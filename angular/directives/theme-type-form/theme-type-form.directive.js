(function () {
    "use strict";

    angular.module('app.controllers').controller('ThemeTypeFormController', ThemeTypeFormController);

    function ThemeTypeFormController($scope, $state, DialogService, ToastService, ThemeTypeService) {
        var vm = this;

        vm.themeType = $scope.type;
        vm.buttonLocked = false;

        vm.create = function () {
            vm.buttonLocked = true;
            ThemeTypeService.create(vm.themeType).then(function () {
                ToastService.show('Вид создан');
                $state.go('management.theme-type-list');
            }, function () {
                vm.buttonLocked = false;
            });
        };

        vm.update = function () {
            vm.buttonLocked = true;
            ThemeTypeService.update(vm.themeType).then(function () {
                ToastService.show('Вид обновлен');
                $state.go('management.theme-type-list');
            }, function () {
                vm.buttonLocked = false;
            });
        };

        vm.delete = function () {
            DialogService.delete('Вы действительно хотите удалить вид занятия ?').then(function () {
                vm.buttonLocked = true;
                ThemeTypeService.delete(vm.themeType).then(function () {
                    $state.go('management.theme-type-list');
                    ToastService.show('Вид удален');
                });
            });
        };
    }

})();
