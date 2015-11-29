"use strict";

(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, $location, UserService) {
        var model = this;
        model.$location = $location;
        model.update = update;
        model.loginUser = $rootScope.loginUser;
        model.user = {};

        function update() {
            UserService.updateUser(
                model.loginUser._id,
                model.user).then(
                function(user) {
                    console.log(user);
                }
            );
        }
    }
})();