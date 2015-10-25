"use strict";

(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $rootScope, $location, UserService) {
        $scope.$location = $location;
        $scope.update = update;
        $scope.loginUser = $rootScope.loginUser;
        $scope.user = {};

        function update() {
            UserService.updateUser(
                $scope.loginUser.id,
                $scope.user,
                function(user) {
                    console.log(user);
                }
            )
        }
    }
})();