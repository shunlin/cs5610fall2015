"use strict";

(function(){
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService() {
        var users = [
            //{username: "Tom", password: "123", id: 1, firstName: "Tommy", lastName: "Gates", email: "TomG@gmail.com"}
        ];

        var service = {
            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,

        };
        return service;

        function findUserByUsernameAndPassword(username, password, callback) {
            for (var i in users) {
                if (users[i].username === username && users[i].password === password)
                    callback(users[i]);
            }
        }

        function findAllUsers(callback) {
            callback(users);
        }

        function createUser(user, callback) {
            user.id = guid();
            users.push(user);
            callback(user);
        }

        function deleteUserById(userId, callback) {
            for (var i = 0, len = users.length; i < len; i++) {
                if (users[i].id === userId) users.splice(i, 1);
                len = users.length;
            }
            callback(users);
        }

        function updateUser(userId, userInfo, callback) {
            for (var i in users) {
                if (users[i].id === userId) {
                    users[i].username = userInfo.username;
                    users[i].password = userInfo.password;
                    users[i].firstName = userInfo.firstName;
                    users[i].lastName = userInfo.lastName;
                    users[i].email = userInfo.email;
                    callback(users[i]);
                }
            }
        }

        function guid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        }
    }
})();