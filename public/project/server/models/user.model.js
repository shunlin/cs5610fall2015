"use strict";

var q = require("q");

module.exports = function(app) {
    var UserModel = require("./user.schema.js");
    var api = {
        create: createUser,
        findAll: findAllUsers,
        findById: findById,
        findUserByUsernameAndPassword: findUserByUsernameAndPassword,
        findUserByUsername: findUserByUsername,
        update: updateUser,
        delete: deleteUser,
        updatePassword: updatePassword
    };
    return api;

    function createUser(user) {
        var deferred = q.defer();
        UserModel.findOne({username: user.username}, function(err, existingUser) {
            if (existingUser == null) {
                UserModel.create(user, function(err, user) {
                    if (err) deferred.reject(err);
                    else deferred.resolve(user);
                });
            } else {
                deferred.resolve(null);
            }
        });

        return deferred.promise;
    }

    function findAllUsers() {
        var deferred = q.defer();
        UserModel.find(function(err, users) {
            if (err) deferred.reject(err);
            else deferred.resolve(users);
        });

        return deferred.promise;
    }

    function findById(userId) {
        var deferred = q.defer();
        UserModel.findById(userId, function(err, user) {
            if (err) deferred.reject(err);
            else deferred.resolve(user);
        });

        return deferred.promise;
    }

    function findUserByUsername(username) {
        var deferred = q.defer();
        UserModel.findOne({username: username}, function(err, user) {
            if (err) deferred.reject(err);
            else deferred.resolve(user);
        });

        return deferred.promise;
    }

    function findUserByUsernameAndPassword(username, password) {
        var deferred = q.defer();
        UserModel.findOne({username: username, password: password}, function(err, user) {
            if (err) deferred.reject(err);
            else deferred.resolve(user);
        });

        return deferred.promise;
    }

    function updateUser(userId, userInfo) {
        var deferred = q.defer();
        UserModel.findByIdAndUpdate(
            userId,
            {
                $set: {
                    password: userInfo.password,
                    fullName: userInfo.fullName,
                    address: userInfo.address,
                    telephone: userInfo.telephone,
                    email: userInfo.email,
                    imageURL: userInfo.imageURL
                }
            },
            {
                upsert: true
            },
            function(err, user) {
                if (err) deferred.reject(err);
                else deferred.resolve(user);
            }
        );
        return deferred.promise;
    }

    function deleteUser(userId) {
        var deferred = q.defer();
        UserModel.findByIdAndRemove(userId, function(err, res) {
            if (err) deferred.reject(err);
            else UserModel.find(function(err, users) {
                deferred.resolve(users);
            })
        });

        return deferred.promise;
    }

    function updatePassword(userInfo) {
        var deferred = q.defer();
        UserModel.findByIdAndUpdate(
            userInfo._id,
            {
                $set: {
                    password: userInfo.password
                }
            },
            function(err, user) {
                if (err) deferred.reject(err);
                else deferred.resolve(user);
            }
        );
        return deferred.promise;
    }
};