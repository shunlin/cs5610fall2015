"use strict";

(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($rootScope, $location, UserService) {
        var model = this;
        model.$location = $location;
        model.register = register;
        model.user = {};

        function register() {
            if (model.user.password != model.user.password2) alert("Password not match!");
            else {
                UserService.createUser(
                    model.user).then(
                    function(user) {
                        $rootScope.loginUser = user;
                        $location.url('/profile');
                    }
                );
            }
        }
    }
})();