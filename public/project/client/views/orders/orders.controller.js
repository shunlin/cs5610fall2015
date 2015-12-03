"use strict";

(function () {
    angular
        .module("MyBook")
        .controller("OrdersController", OrdersController);

    function OrdersController($location, $cookies, OrderService) {
        var model = this;
        var currentUser = $cookies.getObject("user");
        if (currentUser == null) {
            $location.url('/login');
            return;
        }

        model.$location = $location;
        model.formatTime = formatTime;

        OrderService.findOrdersForUser(currentUser._id).then(function(orders) {
            model.orders = orders;
        });

        function formatTime(timeString) {
            var time = new Date(timeString);
            return time.toDateString();
        }
    }
})();