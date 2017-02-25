(function () {
    "use strict";

    angular.module('app.controllers').controller('LoginController', LoginController);

    function LoginController(AuthService, $auth, $state, ToastService) {
        var vm = this;

        vm.login = function (email, password) {

            var credentials = {
                email: email,
                password: password
            };

            $auth.login(credentials).then(function (response) {
                console.log(response);
                $auth.setToken(response.data.key);
                $state.go('management.dashboard');
            }, function () {
                ToastService.show('Неправильный e-mail или пароль!');
            });
        };
    }

})();
