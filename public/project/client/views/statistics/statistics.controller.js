"use strict";

(function(){
    angular
        .module("MyBook")
        .controller("StatisticsController", StatisticsController);

    function StatisticsController($cookies, $rootScope, $location) {
        var currentUser = $cookies.getObject("user");
        if (currentUser == null || currentUser.group.indexOf('admin') == -1) {
            $location.url('/login');
            return;
        }
    }

})();
