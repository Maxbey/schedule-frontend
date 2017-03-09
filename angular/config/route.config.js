(function(){
    "use strict";

    angular.module('app.config').config(function($locationProvider, $qProvider){
        $qProvider.errorOnUnhandledRejections(false);

        $locationProvider.html5Mode(true);
    });

})();
