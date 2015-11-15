"use strict";

(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($rootScope, $location, UserService) {
        var model = this;
        model.$location = $location;
        model.login = login;

        function login() {
            UserService.findUserByUsernameAndPassword(
                model.username,
                model.password).then(function(user) {
                    console.log(user);
                    if (user === null) alert("Wrong password!");
                    else {
                        $rootScope.loginUser = user;
                        $location.url('/profile');
                    }
                }
            );
        }
    }
})();