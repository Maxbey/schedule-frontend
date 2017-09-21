(function () {
    "use strict";

    angular.module('app.controllers').controller('SpecialtyDetailsController', SpecialtyDetailsController);

    function SpecialtyDetailsController($stateParams, SpecialtyService, DisciplineService, CollectionHelpersService) {
        var vm = this;

        vm.tableParams = {
            page: 1,
            limit: 5
        };

        SpecialtyService.get($stateParams.id).then(function (response) {
            vm.specialty = response.data;

            DisciplineService.all().then(function (response) {
                vm.specialty.disciplines = CollectionHelpersService
                    .getCollectionByIds(vm.specialty.disciplines, response.data);
            });
        });

        SpecialtyService.getCourseLength($stateParams.id).then(function(response) {
            vm.course_length = response.data.course_length;
        });
    }

})();
