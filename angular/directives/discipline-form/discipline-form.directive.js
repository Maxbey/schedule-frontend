(function () {
    "use strict";

    angular.module('app.controllers').controller('DisciplineFormController', DisciplineFormController);

    function DisciplineFormController($scope, $state, SpecialtyService, DisciplineService, CollectionHelpersService, ToastService, DialogService) {
        var vm = this;

        vm.discipline = $scope.discipline;
        if (!vm.discipline) {
            vm.discipline = {
                specialties: []
            };
        }
        else {
            SpecialtyService.all().then(function (response) {
                vm.discipline.specialties = CollectionHelpersService
                    .getCollectionByIds(vm.discipline.specialties, response.data);
            });
        }

        vm.buttonLocked = false;

        SpecialtyService.all().then(function (response) {
            vm.specialties = response.data;
        });

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

        vm.querySearch = function (criteria) {
            if (!criteria)
                return SpecialtyService.search('');

            return SpecialtyService.search(criteria);
        }
    }

})();
