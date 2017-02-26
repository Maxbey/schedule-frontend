(function () {
    "use strict";

    angular.module('app.controllers').controller('SetPrevThemesController', SetPrevThemesController);


    function SetPrevThemesController(DialogService, DisciplineService, $scope, SelectHelpersService) {
        var vm = this;

        vm.loading = true;
        vm.previous_themes = $scope.previous_themes;

        DisciplineService.all().then(function (response) {
            vm.disciplines = response.data;
            vm.loading = false;
        });

        function themesQuerySearch(criteria) {
            var cachedQuery = cachedQuery || criteria;

            return cachedQuery ? vm.avaliableThemes.filter(createFilterForThemes(cachedQuery)) : [];
        }

        function createFilterForThemes(query) {
            return SelectHelpersService.createFilter(query, 'name', vm.prevThemes);
        }

        vm.disciplinesSearch = function (criteria) {
            if (!criteria)
                return vm.disciplines;

            return DisciplineService.search(criteria);
        };

        vm.themesSearch = function (criteria) {
            if (!criteria) {
                if (!vm.avaliableThemes)
                    return [];

                return vm.avaliableThemes.filter(SelectHelpersService.notAlreadySelectedFilter(vm.prevThemes));
            }

            return themesQuerySearch(criteria);
        };

        vm.loadDisciplineThemes = function (discipline) {
            if (!discipline)
                return;
            vm.loading = true;
            DisciplineService.get(discipline.id).then(function (response) {
                vm.avaliableThemes = response.data.themes;
                vm.loading = false;
            });
        };

        vm.hide = function () {
            DialogService.hide();
        };

    }

})();
