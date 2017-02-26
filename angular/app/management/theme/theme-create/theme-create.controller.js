(function(){
    "use strict";

    angular.module('app.controllers').controller('ThemeCreateController', ThemeCreateController);

    function ThemeCreateController($state, $stateParams, DisciplineService){
      var vm = this;

      DisciplineService.get($stateParams.id).then(function(response){
        vm.discipline = response.data;
      });

      vm.goBack = function(){
        $state.go('management.themes-list', {id: $stateParams.id});
      };
    }

})();
