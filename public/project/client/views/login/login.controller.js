"use strict";

(function(){
    angular
        .module("MyBook")
        .controller("LoginController", LoginController);

    function LoginController($rootScope, $location, UserService, $cookies) {
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
                if (user === null) alert("Wrong username or password!");
                else {
                    user.password = "";
                    $cookies.putObject("user", user);
                    $rootScope.$broadcast('user.logged.in', user);
                    $location.url('/profile');
                }
            });
        }
    }
})();