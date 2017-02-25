(function(){
    "use strict";

    angular.module('app.controllers').controller('SpecialtyEditController', SpecialtyEditController);

    function SpecialtyEditController($stateParams, SpecialtyService){
        var vm = this;

        SpecialtyService.get($stateParams.id).then(function(response){
          vm.specialty = response.data;
        });
    }

})();
