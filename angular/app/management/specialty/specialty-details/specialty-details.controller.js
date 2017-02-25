(function () {
    "use strict";

    angular.module('app.controllers').controller('SpecialtyDetailsController', SpecialtyDetailsController);

    function SpecialtyDetailsController($stateParams, SpecialtyService, DisciplineService, CollectionHelpersService) {
        var vm = this;

        SpecialtyService.get($stateParams.id).then(function (response) {
            vm.specialty = response.data;

            DisciplineService.all().then(function (response) {
                vm.specialty.disciplines = CollectionHelpersService
                    .getCollectionByIds(vm.specialty.disciplines, response.data);
            });
        });
    }

})();
