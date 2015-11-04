"use strict";

(function(){
    angular
        .module("MyBook")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $rootScope, $location, UserService) {
        $scope.$location = $location;
        $scope.register = register;
        $scope.user = {};

        function register() {
            if ($scope.user.password != $scope.user.password2) alert("Password not match!");
            else {
                UserService.createUser(
                    $scope.user,
                    function(user) {
                        $rootScope.loginUser = user;
                        $location.url('/profile');
                    }
                )
            }
        }
    }
})();