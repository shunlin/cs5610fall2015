"use strict";

(function() {
   angular
       .module("MyBook")
       .controller("HeaderController", HeaderController);

    function HeaderController($location, $rootScope, UserService) {
        var model = this;
        model.$location = $location;
        model.search = search;
        model.logout = logout;

        UserService.loggedin().then(function(user) {
            if (user != null) {
                $rootScope.currentUser = user;
            } else {
                $rootScope.currentUser = null;
            }
        });

        function search() {
            $location.url("/search/" + model.keyword);
        }

        function logout() {
            UserService.logout().then(function() {
                $rootScope.currentUser = null;
            })
        }


    }
})();