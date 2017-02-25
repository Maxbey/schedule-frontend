(function(){
    "use strict";

    angular.module('app.controllers').controller('AudienceFormController', AudienceFormController);

    function AudienceFormController($scope, $state, AudienceService, ToastService, DialogService){
        var vm = this;

        vm.audience = $scope.audience;

        vm.buttonLocked = false;

        vm.create = function(){
          vm.buttonLocked = true;
          AudienceService.create(vm.audience).then(function(){
            ToastService.show('Аудитория создана');
            $state.go('management.audiences-list');
          }, function(){
            vm.buttonLocked = false;
          });
        };

        vm.update = function(){
          vm.buttonLocked = true;
          delete vm.audience.themes;
          AudienceService.update(vm.audience).then(function(){
            ToastService.show('Аудитория обновлена');
            $state.go('management.audiences-list');
          }, function(){
            vm.buttonLocked = false;
          });
        };

        vm.delete = function(){
          DialogService.delete('Вы действительно хотите удалить аудиторию ?').then(function(){
            vm.buttonLocked = true;
            AudienceService.delete(vm.audience).then(function(){
              ToastService.show('Аудитория удалена');
              $state.go('management.audiences-list');
            });
          });
        };
    }

})();
