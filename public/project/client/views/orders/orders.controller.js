"use strict";

(function () {
    angular
        .module("MyBook")
        .controller("OrdersController", OrdersController);

    function OrdersController($routeParams, $cookies, UserService) {
        var model = this;
        var currentUser = $cookies.getObject("user");
        if (currentUser == null) {
            $location.url('/login');
            return;
        }

        model.$location = $location;
        model.updateStatus = updateStatus;
        model.formatTime = formatTime;

        OrderService.findOrderById(orderId).then(function(order) {
            model.order = order;
        });


        function updateStatus() {
            OrderService.updateOrderStatus(orderId, model.newStatus).then(function(order) {
                OrderService.findOrderById(order._id).then(function(order) {
                    console.log(order);
                    model.order = order;
                });
            })
        }

        function formatTime(timeString) {
            var time = new Date(timeString);
            return time.toDateString();
        }
        findOrdersForUser
    }
})();