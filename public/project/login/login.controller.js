"use strict";

(function(){
    angular
        .module("MyBook")
        .controller("LoginController", LoginController);

    function LoginController($scope, $rootScope, $location, UserService) {
        $scope.$location = $location;
        $scope.login = login;

        function login() {
            UserService.findUserByUsernameAndPassword(
                $scope.username,
                $scope.password,
                function(user) {
                    $rootScope.loginUser = user;
                    $location.url('/profile');
                }
            )
        }
    }
})();