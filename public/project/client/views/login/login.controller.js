"use strict";

(function(){
    angular
        .module("MyBook")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService) {
        var model = this;
        model.$location = $location;
        model.login = login;

        UserService.loggedin().then(function(res) {
            console.log(res);
            if (res != '0') $location.url("/profile");
        });

        function login() {
            var user = {};
            user.username = model.username;
            user.password = model.password;

            UserService.login(user).then(function(user) {
                if (user === null) alert("Wrong password!");
                else {
                    $location.url('/profile');
                }
            });
        }
    }
})();