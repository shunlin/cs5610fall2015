"use strict";

(function () {
    angular
        .module("MyBook")
        .controller("OrderController", OrderController);

    function OrderController($location, $routeParams, OrderService) {
        var model = this;
        var orderId = $routeParams.orderId;
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
    }
})();