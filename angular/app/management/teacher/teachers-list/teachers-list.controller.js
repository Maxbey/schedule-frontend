(function(){
    "use strict";

    angular.module('app.controllers').controller('TeachersListController', TeachersListController);

    function TeachersListController($state, TeacherService, DialogService){
        var vm = this;

        TeacherService.all().then(function(response){
          if(!response.data.length){
            DialogService.action(
              'В системе не зарегистрированно ни одного преподавателя. Создать нового ?',
               'Перейти к созданию'
             ).then(function(){
               $state.go('management.teacher-create');
             });
          }
          else{
            vm.teachers = response.data;
          }
        });

        vm.edit = function(teacher){
          $state.go('management.teacher-edit', {'id': teacher.id});
        };
    }

})();
