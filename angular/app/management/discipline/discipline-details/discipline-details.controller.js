(function () {
    "use strict";

    angular.module('app.controllers').controller('DisciplineDetailsController', DisciplineDetailsController);

    function DisciplineDetailsController($state, $stateParams, DisciplineService, SpecialtyService, CollectionHelpersService) {
        var vm = this;

        vm.goToThemes = function () {
            $state.go('management.themes-list', {id: $stateParams.id});
        };

        DisciplineService.get($stateParams.id).then(function (response) {
            vm.discipline = response.data;

            SpecialtyService.all().then(function (response) {
                vm.discipline.specialties = CollectionHelpersService
                    .getCollectionByIds(vm.discipline.specialties, response.data);
            });
        });
    }

})();
