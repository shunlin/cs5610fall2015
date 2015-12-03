"use strict";

(function () {
    angular
        .module("MyBook")
        .controller("AllOrdersController", AllOrdersController);

    function AllOrdersController($location, $cookies, OrderService) {
        var model = this;
        model.$location = $location;
        var currentUser = $cookies.getObject("user");
        if (currentUser == null || currentUser.group.indexOf('admin') == -1) {
            $location.url('/login');
            return;
        }

        model.$location = $location;
        model.formatTime = formatTime;
        model.deleteOrder = deleteOrder;

        OrderService.findAllOrders().then(function(orders) {
            model.orders = orders;
        });

        function formatTime(timeString) {
            var time = new Date(timeString);
            return time.toDateString();
        }

        function deleteOrder(order) {
            OrderService.deleteOrder(order._id).then(function(orders) {
                model.orders= orders;
            });
        }

    }
})();