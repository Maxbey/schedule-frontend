(function () {
    "use strict";

    angular.module('app.controllers').controller('ThemeDetailsController', ThemeDetailsController);

    function ThemeDetailsController($state, $stateParams, ThemeService, TeacherService, AudienceService, CollectionHelpersService) {
        var vm = this;

        ThemeService.get($stateParams.themeId).then(function (response) {
            vm.theme = response.data;

            TeacherService.all().then(function (response) {
                vm.theme.teachers = CollectionHelpersService
                    .getCollectionByIds(vm.theme.teachers, response.data);
            });
            AudienceService.all().then(function (response) {
                vm.theme.audiences = CollectionHelpersService
                    .getCollectionByIds(vm.theme.audiences, response.data);
            });
            ThemeService.all().then(function (response) {
                vm.theme.previous_themes = CollectionHelpersService
                    .getCollectionByIds(vm.theme.previous_themes, response.data);
            });
        });

        vm.goBack = function () {
            $state.go('management.themes-list', {id: $stateParams.id});
        };

    }

})();
