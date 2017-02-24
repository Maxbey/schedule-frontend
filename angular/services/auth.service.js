(function () {
    "use strict";

    angular.module('app.services').factory('AuthService', function (locker, API) {
        return new AuthService(locker, API);
    });

    function AuthService(locker, API) {

        this.getToken = function () {
            return locker.get('token');
        };

        this.getAuthorizedUser = function () {
            return API.one('auth/user').get();
        };

        this.login = function (email, password) {
            return API.one('auth/login/').customPOST(angular.toJson({
                'email': email,
                'username': email,
                'password': password
            }));
        };
    }

})();
