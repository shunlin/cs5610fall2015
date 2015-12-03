"use strict";

(function() {
   angular
       .module("MyBook")
       .controller("HeaderController", HeaderController);

    function HeaderController($location, $cookies, UserService, $scope) {
        // This function need $scope because it is using $scope.$on to listen the event.
        var model = this;
        model.$location = $location;
        model.search = search;
        model.logout = logout;

        UserService.loggedin().then(function(user) {
            if (user != null) {
                user.password = "";
                $cookies.putObject("user", user);
            } else {
                $cookies.putObject("user", null);
            }
        });
        model.currentUser = $cookies.getObject("user");

        $scope.$on('user.logged.in', function (event, user) {
            model.currentUser = user;
        });

        function search() {
            $location.url("/search/" + model.keyword);
        }

        function logout() {
            UserService.logout().then(function() {
                $cookies.putObject("user", null);
                model.currentUser = $cookies.getObject("user");
                $location.url("/home");
            })
        }


    }
})();