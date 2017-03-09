(function () {
    "use strict";

    angular.module('app.controllers').controller('LoginController', LoginController);

    function LoginController($auth, $state, ToastService) {
        var vm = this;

        vm.login = function (email, password) {

            var credentials = {
                email: email,
                password: password
            };

            $auth.login(credentials).then(function (response) {
                $auth.setToken(response.data.key);
                $state.go('management.specialties-list');
            }, function () {
                ToastService.show('Неправильный e-mail или пароль!');
            });
        };
    }

})();
