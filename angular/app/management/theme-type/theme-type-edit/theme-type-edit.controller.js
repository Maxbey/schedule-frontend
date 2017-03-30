(function(){
    "use strict";

    angular.module('app.controllers').controller('ThemeTypeEditController', ThemeTypeEditController);

    function ThemeTypeEditController($stateParams, ThemeTypeService){
        var vm = this;

        ThemeTypeService.get($stateParams.id).then(function(response){
            vm.themeType = response.data;
        });
    }

})();
