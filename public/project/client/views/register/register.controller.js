"use strict";

(function () {
    angular
        .module("MyBook")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, $cookies, $rootScope, UserService) {
        var model = this;
        model.$location = $location;
        model.register = register;
        model.newUser = {};

        function register() {
            if (model.newUser.password != model.newUser.password2) alert("Password not match!");
            else {
                UserService.createUser(model.newUser).then(
                    function(user) {
                        if (user != null) {
                            user.password = "";
                            $cookies.putObject("user", user);
                            $rootScope.$broadcast('user.logged.in', user);
                            $location.url('/profile');
                        } else {
                            alert("User already exists!");
                        }
                    }
                );
            }
        }

    }
})();