"use strict";

var uuid = require("node-uuid");

module.exports = function(app, mongoose, $q) {
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
        var deferred = $q.defer();

        user.id = uuid.v1();
        users.push(user);
        return user;
    }

    function findAllUsers() {
        return users;
    }

    function findById(userId) {
        for (var i in users) {
            if (users[i].id == userId)
                return users[i];
        }
        return null;
    }

    function updateUser(userId, userInfo) {
        var user = findById(userId);
        console.log(user);
        for (var i in userInfo) {
            user[i] = userInfo[i];
        }
        return user;
    }

    function deleteUser(userId) {
        for (var i = 0, len = users.length; i < len; i++) {
            if (users[i].id == userId) users.splice(i, 1);
            len = users.length;
        }
        return users;
    }

    function findUserByUsername(username) {
        for (var i in users) {
            if (users[i].username == username)
                return users[i];
        }
        return null;
    }

    function findUserByCredentials(credentials) {
        for (var i in users) {
            if (users[i].username == credentials.username && users[i].password == credentials.password)
                return users[i];
        }
        return null;
    }
};