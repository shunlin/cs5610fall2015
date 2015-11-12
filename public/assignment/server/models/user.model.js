"use strict";

var uuid = require("node-uuid");

module.exports = function(app) {
    var users = require("user.mock.json");

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
        user.id = uuid.v1();
        users.push(user);
        return user;
    }

    function findAllUsers() {
        return users;
    }

    function findById(userId) {
        for (var i in users) {
            if (users[i].id === userId)
                return users[i];
        }
        return null;
    }

    function updateUser(userId, userInfo) {
        for (var i in users) {
            if (users[i].id === userId) {
                users[i] = userInfo;
                return users[i];
            }
        }
    }

    function deleteUser(userId) {
        for (var i = 0, len = users.length; i < len; i++) {
            if (users[i].id === userId) users.splice(i, 1);
            len = users.length;
        }
        return users;
    }

    function findUserByUsername(username) {
        for (var i in users) {
            if (users[i].username === username)
                return users[i];
        }
        return null;
    }

    function findUserByCredentials(credentials) {
        for (var i in users) {
            if (users[i].username === credentials.username && users[i].password === credentials.password)
                return users[i];
        }
        return null;
    }
};