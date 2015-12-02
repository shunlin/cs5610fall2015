"use strict";

var q = require("q");

module.exports = function(app, mongoose) {
    var UserSchema = require("./user.schema.js")(app, mongoose);
    var UserModel = mongoose.model("UserModel", UserSchema);

    var api = {
        create: createUser,
        findAll: findAllUsers,
        findById: findById,
        findByUsername: findByUsername,
        update: updateUser,
        delete: deleteUser
    };
    return api;

    function createUser(user) {
        var deferred = q.defer();
        UserModel.create(user, function(err, user) {
            if (err) deferred.reject(err);
            else deferred.resolve(user);
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

    function findByUsername(username) {
        var deferred = q.defer();
        UserModel.findOne({username: username}, function(err, user) {
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
                    firstName: userInfo.firstName,
                    lastName: userInfo.lastName,
                    address: userInfo.address,
                    telephone: userInfo.telephone,
                    email: userInfo.email
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
};