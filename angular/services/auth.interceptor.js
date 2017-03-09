(function () {
    "use strict";

    angular.module('app.services').factory('AuthInterceptor', function ($q, $injector) {
        return new AuthInterceptor($q, $injector);
    });

    function AuthInterceptor($q, $injector) {
        this.response = function(response) {
            return response;
        };

        this.responseError = function(response) {
            if (response.status === 401) {
                var $auth = $injector.get('$auth');
                var $state = $injector.get('$state');

                $auth.logout();
                $state.go('auth.login');
            }

            return $q.reject(response);
        };


    }

})();
