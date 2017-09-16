(function () {
    "use strict";

    angular.module('app.controllers').controller('ThemeDetailsController', ThemeDetailsController);

    function ThemeDetailsController($state, $stateParams, ThemeService, TeacherService, AudienceService, SpecialtyService, CollectionHelpersService) {
        var vm = this;

        ThemeService.get($stateParams.themeId).then(function (response) {
            vm.theme = response.data;

            TeacherService.all().then(function (response) {
                vm.theme.teachers_main = CollectionHelpersService
                    .getCollectionByIds(vm.theme.teachers_main, response.data);
                vm.theme.teachers_alternative = CollectionHelpersService
                    .getCollectionByIds(vm.theme.teachers_alternative, response.data);
            });
            AudienceService.all().then(function (response) {
                vm.theme.audiences = CollectionHelpersService
                    .getCollectionByIds(vm.theme.audiences, response.data);
            });
            ThemeService.all().then(function (response) {
                vm.theme.previous_themes = CollectionHelpersService
                    .getCollectionByIds(vm.theme.previous_themes, response.data);
            });
            SpecialtyService.all().then(function (response) {
                vm.theme.specialties = CollectionHelpersService
                    .getCollectionByIds(vm.theme.specialties, response.data);
            });
        });

        vm.goBack = function () {
            $state.go('management.themes-list', {id: $stateParams.id});
        };

    }

})();
