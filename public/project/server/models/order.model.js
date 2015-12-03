"use strict";

var q = require("q");

module.exports = function(app) {
    var OrderModel = require("./order.schema.js").model;

    var api = {
        create: createOrder,
        findAll: findAllOrders,
        findById: findOrderById,
        findOrdersForUser: findOrdersForUser,
        update: updateOrder,
        updateOrderStatus: updateOrderStatus,
        delete: deleteOrder
    };
    return api;

    function createOrder(order) {
        var deferred = q.defer();
        OrderModel.create(order, function(err, order) {
            if (err) deferred.reject(err);
            else deferred.resolve(order);
        });
        return deferred.promise;
    }

    function findAllOrders() {
        var deferred = q.defer();
        OrderModel.find(function(err, orders) {
            if (err) deferred.reject(err);
            else deferred.resolve(orders);
        });
        return deferred.promise;
    }

    function findOrderById(orderId) {
        var deferred = q.defer();
        OrderModel.findById(orderId, function(err, order) {
            if (err) deferred.reject(err);
            else deferred.resolve(order);
        }).populate({
            path: 'books',
            populate: { path: 'book'}
        });

        return deferred.promise;
    }

    function findOrdersForUser(userId) {
        var deferred = q.defer();
        OrderModel.find({user: userId}, function(err, orders) {
            if (err) deferred.reject(err);
            else deferred.resolve(orders);
        }).populate({
            path: 'books',
            populate: { path: 'book'}
        });

        return deferred.promise;
    }

    function updateOrderStatus(orderId, orderInfo) {
        var deferred = q.defer();
        OrderModel.findByIdAndUpdate(
            orderId,
            {
                $set: {
                    status: orderInfo.status
                }
            },
            {
                upsert: true
            },
            function(err, order) {
                if (err) deferred.reject(err);
                else deferred.resolve(order);
            }
        );
        return deferred.promise;
    }

    function updateOrder(orderId, orderInfo) {
        var deferred = q.defer();
        OrderModel.findByIdAndUpdate(
            orderId,
            {
                $set: {
                    address: orderInfo.address,
                    receiver: orderInfo.receiver,
                    status: orderInfo.status
                }
            },
            {
                upsert: true
            },
            function(err, order) {
                if (err) deferred.reject(err);
                else deferred.resolve(order);
            }
        );
        return deferred.promise;
    }

    function deleteOrder(orderId) {
        var deferred = q.defer();
        OrderModel.findByIdAndRemove(orderId, function(err, res) {
            if (err) deferred.reject(err);
            else {
                OrderModel.find(function(err, orders) {
                    if (err) deferred.reject(err);
                    else deferred.resolve(orders);
                });
            }
        });

        return deferred.promise;
    }
};