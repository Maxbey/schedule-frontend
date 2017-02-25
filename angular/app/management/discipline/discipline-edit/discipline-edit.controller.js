(function(){
    "use strict";

    angular.module('app.controllers').controller('DisciplineEditController', DisciplineEditController);

    function DisciplineEditController($stateParams, DisciplineService){
        var vm = this;

        DisciplineService.get($stateParams.id).then(function(response){
          vm.discipline = response.data;
        });
    }

})();
