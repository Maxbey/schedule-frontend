(function(){
    "use strict";

    angular.module('app.controllers').controller('ThemeEditController', ThemeEditController);

    function ThemeEditController($state, $stateParams, ThemeService, DisciplineService){
        var vm = this;

        DisciplineService.get($stateParams.id).then(function(response){
          vm.discipline = response.data;
        });

        ThemeService.get($stateParams.themeId).then(function(response){
          vm.theme = response.data;
        });

        vm.goBack = function(){
          $state.go('management.themes-list', {id: $stateParams.id});
        };
    }

})();
