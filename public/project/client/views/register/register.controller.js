"use strict";

(function () {
    angular
        .module("MyBook")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {
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