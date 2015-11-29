"use strict";

//var uuid = require("node-uuid");
var q = require("q");

module.exports = function(app, mongoose) {
    var UserSchema = require("./user.schema.js")(app, mongoose);
    var UserModel = mongoose.model("UserModel", UserSchema)

    var api = {
        create: createUser,
        findAll: findAllUsers,
        findById: findById,
        update: updateUser,
        delete: deleteUser,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials
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
        var deferred = $q.defer();
        UserModel.find({_id: userId}, function(err, user) {
            if (err) deferred.reject(err);
            else deferred.resolve(user);
        });

        return deferred.promise;
    }

    function updateUser(userId, userInfo) {
        var deferred = $q.defer();
        UserModel.update(
            {
                _id: userId},
            {
                $set: {
                    firstName: userInfo.firstName,
                    lastName: userInfo.lastName,
                    password: userInfo.password,
                    email: userInfo.email
                }
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
        UserModel.remove({_id: userId}, function(err, res) {
            if (err) deferred.reject(err);
            else deferred.resolve(res);
        })

        return deferred.promise;
    }

    function findUserByUsername(username) {
        var deferred = q.defer();
        UserModel.findOne({username: username}, function(err, user) {
            if (err) deferred.reject(err);
            else deferred.resolve(user);
        })

        return deferred.promise;
    }

    function findUserByCredentials(credentials) {
        var deferred = q.defer();
        UserModel.findOne({
            username: credentials.username,
            password: credentials.password
        }, function(err, user) {
            if (err) deferred.reject(err);
            else deferred.resolve(user);
        })

        return deferred.promise;
    }
};