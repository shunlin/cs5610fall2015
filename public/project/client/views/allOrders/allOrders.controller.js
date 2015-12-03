"use strict";

(function () {
    angular
        .module("MyBook")
        .controller("AllOrdersController", AllOrdersController);

    function AllOrdersController($location, UserService) {
        model.$location = $location;
        var currentUser = $cookies.getObject("user");
        if (currentUser.group.indexOf('admin') != -1) {
            $location.url('/login');
            return;
        }
    }
})();