(function(){
    "use strict";

    angular.module('app.controllers').controller('TroopEditController', TroopEditController);

    function TroopEditController($stateParams, TroopService){
        var vm = this;

        TroopService.get($stateParams.id).then(function(response){
          vm.troop = response.data;
        });
    }

})();
