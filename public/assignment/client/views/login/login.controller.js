"use strict";

(function(){
    angular
        .module("FormBuilderApp")
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