(function () {
    "use strict";

    angular.module('app.config').config(function ($authProvider, $httpProvider) {
        $authProvider.withCredentials = true;
        $authProvider.loginUrl = 'http://vk-schedule.omgtu.ru/api/v1/auth/login/';
        $authProvider.authToken = 'Token';
        $authProvider.tokenType = 'Token';
        $authProvider.storageType = 'localStorage';

        $httpProvider.interceptors.push('AuthInterceptor');
    });

})();
