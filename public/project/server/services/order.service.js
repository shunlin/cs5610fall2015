"use strict";

module.exports = function(app, model, auth) {
    app.post("/api/project/order/:userId", createOrder);
    app.get("/api/project/allOrders/", findAllOrders);
    app.get("/api/project/order/:orderId", findOrderById);
    app.get("/api/project/order/user/:userId", findOrdersForUser);
    app.put("/api/project/order/:orderId", updateOrder);
    app.put("/api/project/order/:orderId/status/", updateOrderStatus);
    app.delete("/api/project/order/:orderId", deleteOrder);

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
};