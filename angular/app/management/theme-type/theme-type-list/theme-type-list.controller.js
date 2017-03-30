(function(){
    "use strict";

    angular.module('app.controllers').controller('ThemeTypeListController', ThemeTypeListController);

    function ThemeTypeListController($state, ThemeTypeService){
        var vm = this;

        var renderList = function(){
            ThemeTypeService.all().then(function(response){
                vm.themeTypes = response.data;
            });
        };

        vm.edit = function(themeType){
            $state.go('management.theme-type-edit', {'id': themeType.id});
        };

        renderList();
    }

})();
