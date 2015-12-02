"use strict";

(function() {
    angular
        .module("MyBook")
        .factory("UserService", UserService);

    function UserService($http, $q) {
        var api = {
            createUser: createUser,
            findAllUsers: findAllUsers,
            findUserById: findUserById,
            updateUser: updateUser,
            deleteUser: deleteUser,
            findUserByUsername: findUserByUsername
        };
        return api;

        function createUser(newUser) {
            var deferred = $q.defer();
            $http.post("/api/project/user/", newUser).success(function(response) {
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
    }

})();