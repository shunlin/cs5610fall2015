"use strict";

(function () {
    angular
        .module("MyBook")
        .controller("ProfileController", ProfileController);

    function ProfileController($location, UserService) {
        var model = this;
        model.updateUser = updateUser;
        model.$location = $location;
        model.updatePassword = updatePassword;


        UserService.loggedin().then(function(user) {
            if (user != null) model.userInfo = user;
            else $location.url("/login");
        });

        function updateUser() {
            UserService.updateUser(model.userInfo._id, model.userInfo).then(
                function(user) {
                    alert("Update success!");
                });
        }

        function updatePassword() {
            if (model.newPassword1 != model.newPassword2) alert("Password not match!");
            else if (model.oldPassword != model.userInfo.password) alert("Old password is wrong!")
            else {
                UserService.updatePassword(model.userInfo._id, model.newPassword1).then(
                    function(user) {
                        if (user == null) alert("Password update failed!");
                        else alert("Password update success!");
                    }
                );
            }
        }
    }
})();