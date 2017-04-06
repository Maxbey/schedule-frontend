(function () {
    "use strict";

    angular.module('app.config').config(function ($authProvider, $httpProvider) {
        $authProvider.withCredentials = true;
        $authProvider.loginUrl = 'http://api.vk-schedule.dev/api/v1/auth/login/';
        $authProvider.authToken = 'Token';
        $authProvider.tokenType = 'Token';
        $authProvider.storageType = 'localStorage';

        $httpProvider.interceptors.push('AuthInterceptor');
    });

})();
