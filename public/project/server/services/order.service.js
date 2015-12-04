"use strict";

module.exports = function(app, model, auth, isAdmin) {
    app.post("/api/project/order/:userId", auth, createOrder);
    app.get("/api/project/allOrders/", isAdmin, findAllOrders);
    app.get("/api/project/order/:orderId", auth, findOrderById);
    app.get("/api/project/order/user/:userId", auth, findOrdersForUser);
    app.put("/api/project/order/:orderId", isAdmin, updateOrder);
    app.put("/api/project/order/:orderId/status/", isAdmin, updateOrderStatus);
    app.delete("/api/project/order/:orderId", isAdmin, deleteOrder);
    app.post("/api/project/orders/timeRange", isAdmin, findOrderInTimeRange);

    function createOrder(req, res) {
        var newOrder = req.body;
        newOrder.user = req.params.userId;
        model.create(newOrder).then(function(order) {
            res.json(order);
        });
    }

    function findAllOrders(req, res) {
        model.findAll().then(function(orders) {
            res.json(orders);
        });
    }

    function findOrderById(req, res) {
        model.findById(req.params.orderId).then(function(order) {
            res.json(order);
        });
    }

    function findOrdersForUser(req, res) {
        model.findOrdersForUser(req.params.userId).then(function(orders) {
            res.json(orders);
        });
    }

    function updateOrder(req, res) {
        model.update(req.params.orderId, req.body).then(function(order) {
            res.json(order);
        });
    }

    function updateOrderStatus(req, res) {
        model.updateOrderStatus(req.params.orderId, req.body).then(function(order) {
            res.json(order);
        });
    }

    function deleteOrder(req, res) {
        model.delete(req.params.orderId).then(function(orders) {
            res.json(orders);
        });
    }

    function findOrderInTimeRange(req, res) {
        model.findOrderInTimeRange(req.body.startTime, req.body.endTime).then(function(orders) {
            res.json(orders);
        });
    }
};