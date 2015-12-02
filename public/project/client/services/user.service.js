"use strict";

(function() {
    angular
        .module("MyBook")
        .factory("UserService", UserService);

    function UserService($http, $q) {
        var api = {
            login: login,
            loggedin: loggedin,
            logout: logout,
            createUser: createUser,
            findAllUsers: findAllUsers,
            findUserById: findUserById,
            updateUser: updateUser,
            deleteUser: deleteUser,
            findUserByUsername: findUserByUsername,
            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
            updatePassword: updatePassword
        };
        return api;

        function login(user) {
            var deferred = $q.defer();
            $http.post("/api/project/login", user).success(function(response) {
                deferred.resolve(response);
            }).error(function(response) {
                deferred.resolve(null);
            });
            return deferred.promise;
        }

        function loggedin() {
            var deferred = $q.defer();
            $http.get("/api/project/loggedin").success(function(response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        }

        function logout() {
            var deferred = $q.defer();
            $http.get("/api/project/logout").success(function(response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        }

        function createUser(newUser) {
            var deferred = $q.defer();
            $http.post("/api/project/register", newUser).success(function(response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        }

        function findAllUsers() {
            var deferred = $q.defer();
            $http.get("/api/project/allUsers/").success(function(users) {
                deferred.resolve(users);
            });
            return deferred.promise;
        }

        function findUserById(userId) {
            var deferred = $q.defer();
            $http.get("/api/project/user/" + userId).success(function(book) {
                deferred.resolve(book);
            });
            return deferred.promise;
        }

        function updateUser(userId, userInfo) {
            var deferred = $q.defer();
            $http.put("/api/project/user/" + userId, userInfo).success(function(response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        }

        function deleteUser(userId) {
            var deferred = $q.defer();
            $http.delete("/api/project/user/" + userId).success(function(response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        }

        function findUserByUsername(username) {
            var deferred = $q.defer();
            $http.get("/api/project/userSearch/" + username).success(function(user) {
                deferred.resolve(user);
            });
            return deferred.promise;
        }

        function findUserByUsernameAndPassword(username, password) {
            var deferred = $q.defer();
            $http.get("/api/project/user?username=" + username + "&password=" + password)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function updatePassword(userId, password) {
            var deferred = $q.defer();
            var userInfo = {};
            userInfo._id = userId;
            userInfo.password = password;
            $http.put("/api/project/userUpdatePassword", userInfo)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }
    }

})();