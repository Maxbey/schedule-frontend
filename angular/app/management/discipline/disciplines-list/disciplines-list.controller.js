(function(){
    "use strict";

    angular.module('app.controllers').controller('DisciplinesListController', DisciplinesListController);

    function DisciplinesListController(DisciplineService, $state, DialogService){
        var vm = this;

        DisciplineService.all().then(function(disciplines){
          if(!disciplines.length){
            DialogService.action(
              'В системе не зарегистрированно ни одной дисциплины. Создать новую ?',
               'Перейти к созданию'
             ).then(function(){
               $state.go('management.discipline-create');
             });
          }
          else {
            vm.disciplines = disciplines;
          }

        });

        vm.edit = function(discipline){
          $state.go('management.discipline-edit', {'id': discipline.id});
        };

        vm.details = function(discipline){
          $state.go('management.discipline-details', {'id': discipline.id});
        };
    }

})();
