(function(){
    "use strict";

    angular.module('app.directives').directive('themeTypeForm', themeTypeFormDefinition);

    function themeTypeFormDefinition() {

        var directive = {
            restrict: 'EA',
            templateUrl: './views/directives/theme-type-form/theme-type-form.html',
            controller: 'ThemeTypeFormController',
            controllerAs: 'vm',
            scope: {
                type: "="
            }
        };

        return directive;
    }
})();
