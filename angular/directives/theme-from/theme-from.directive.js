(function () {
    "use strict";

    angular.module('app.controllers').controller('ThemeFromController', ThemeFromController);

    function ThemeFromController($scope, $state, $stateParams, CollectionHelpersService, TeacherService, AudienceService, ThemeService, SpecialtyService, ThemeTypeService, ToastService, DialogService) {
        var vm = this;

        vm.theme = $scope.theme;
        if (!vm.theme) {
            vm.theme = ThemeService.getEmptyInstance();
        }
        else {
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
            SpecialtyService.all().then(function (response) {
                vm.theme.specialties = CollectionHelpersService
                    .getCollectionByIds(vm.theme.specialties, response.data);
            });
            ThemeService.all().then(function (response) {
                vm.theme.previous_themes = CollectionHelpersService
                    .getCollectionByIds(vm.theme.previous_themes, response.data);

                $scope.previous_themes = vm.theme.previous_themes;
            });
        }
        vm.theme.discipline = $stateParams.id;

        vm.buttonLocked = false;

        ThemeTypeService.all().then(function(response){
            vm.themeTypes = response.data;
        });

        vm.teachersSearch = function (criteria) {
            if (!criteria)
                return TeacherService.search('');

            return TeacherService.search(criteria);
        };

        vm.specialtiesSearch = function (criteria) {
            if (!criteria)
                return SpecialtyService.search('');

            return SpecialtyService.search(criteria);
        };

        vm.audiencesSearch = function (criteria) {
            if (!criteria)
                return AudienceService.search('');

            return AudienceService.search(criteria);
        };

        function checkTeachersAdequacy() {
            return vm.theme.teachers_count <= (vm.theme.teachers_main.length + vm.theme.teachers_alternative.length);
        }

        function checkAudiencesAdequacy() {
            return vm.theme.audiences_count <= vm.theme.audiences.length;
        }

        function showNotEnoughTeachersAlert() {
            DialogService.alert('Ошибка!', 'Для занятия по теме требуется больше преподавателей, чем было прикреплено');
        }

        function showNotEnoughAudiencesAlert() {
            DialogService.alert('Ошибка!', 'Для занятия по теме требуется больше аудиторий, чем было прикреплено');
        }

        vm.create = function () {
            if (!checkTeachersAdequacy()) {
                showNotEnoughTeachersAlert();
                return;
            }

            if (!checkAudiencesAdequacy()) {
                showNotEnoughAudiencesAlert();
                return;
            }

            vm.buttonLocked = true;
            ThemeService.create(vm.theme).then(function () {
                ToastService.show('Тема создана');
                $state.go('management.themes-list', {id: $stateParams.id});
            }, function () {
                vm.buttonLocked = false;
            });
        };

        vm.update = function () {
            if (!checkTeachersAdequacy()) {
                showNotEnoughTeachersAlert();
                return;
            }

            if (!checkAudiencesAdequacy()) {
                showNotEnoughAudiencesAlert();
                return;
            }

            vm.buttonLocked = true;
            ThemeService.update(vm.theme).then(function () {
                ToastService.show('Тема обновлена');
                $state.go('management.themes-list', {id: $stateParams.id});
            }, function () {
                vm.buttonLocked = false;
            });
        };

        vm.delete = function () {
            DialogService.delete('Вы действительно хотите удалить тему ?').then(function () {
                vm.buttonLocked = true;
                ThemeService.delete(vm.theme).then(function () {
                    ToastService.show('Тема удалена');
                    $state.go('management.themes-list', {id: $stateParams.id});
                });
            });
        };

        vm.getSetPrevThemesModal = function () {
            DialogService.fromTemplate('set-prev-themes', $scope);
        };
    }

})();
