(function () {
    "use strict";

    angular.module('app.config').config(function ($authProvider) {
        $authProvider.withCredentials = true;
        $authProvider.loginUrl = 'http://localhost/api/v1/auth/login/';
        $authProvider.authToken = 'Token';
        $authProvider.tokenType = 'Token';
        $authProvider.storageType = 'localStorage';
    });

})();
