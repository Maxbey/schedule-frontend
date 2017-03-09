(function () {
    "use strict";

    var app = angular.module('app',
        [
            'app.controllers',
            'app.filters',
            'app.services',
            'app.directives',
            'app.routes',
            'app.config',
            'partialsModule'
        ]);

    angular.module('app.routes', []);
    angular.module('app.controllers', [
        'ui.router', 'ngMaterial', 'ngStorage',
        'angular-loading-bar',
        'ngMessages', 'materialCalendar',
        'validation.match',
        'satellizer', 'chart.js'
    ]);
    angular.module('app.filters', []);
    angular.module('app.services', []);
    angular.module('app.directives', []);
    angular.module('app.config', []);
    angular.module('app.run', []);

    app.run(function ($rootScope, $state, $auth) {
        var stateControl = function (event, toState, toParams, fromState) {
            if (toState.data && toState.data.auth) {
                if (!$auth.isAuthenticated()) {
                    event.preventDefault();
                    return $state.go('auth.login');
                }
            }

            if (toState.data && !toState.data.auth) {
                if ($auth.isAuthenticated()) {
                    event.preventDefault();
                    if (!fromState.name)
                        return $state.go('management.specialties-list');

                    return $state.go(fromState.name);
                }
            }
        };

        var registrationCallback = $rootScope.$on("$stateChangeStart", stateControl);
        $rootScope.$on('$destroy', registrationCallback);
    });

})();
