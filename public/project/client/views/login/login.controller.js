"use strict";

(function(){
    angular
        .module("MyBook")
        .controller("LoginController", LoginController);

    function LoginController($rootScope, $location, UserService) {
        var model = this;
        model.$location = $location;
        model.login = login;

        UserService.loggedin().then(function(res) {
            if (res != null) $location.url("/profile");
        });

        function login() {
            var user = {};
            user.username = model.username;
            user.password = model.password;

            UserService.login(user).then(function(user) {
                if (user === null) alert("Wrong password!");
                else {
                    $rootScope.currentUser = user;
                    $location.url('/profile');
                }
            });
        }
    }
})();