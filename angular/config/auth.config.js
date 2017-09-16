(function () {
    "use strict";

    angular.module('app.config').config(function ($authProvider, $httpProvider, envConfig) {
        $authProvider.withCredentials = true;
        $authProvider.loginUrl = envConfig.API_HOST + '/api/v1/auth/login/';
        $authProvider.authToken = 'Token';
        $authProvider.tokenType = 'Token';
        $authProvider.storageType = 'localStorage';

        $httpProvider.interceptors.push('AuthInterceptor');
    });

})();
