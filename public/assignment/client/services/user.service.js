"use strict";

(function(){
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http, $q) {

        var service = {
            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };
        return service;

        function findUserByUsernameAndPassword(username, password) {
            var deferred = $q.defer();
            $http.get("/api/assignment/user?username=" + username + "&password=" + password)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findAllUsers() {
            var deferred = $q.defer();
            $http.get("/api/assignment/user").success(function(response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        }

        function createUser(user) {
            var deferred = $q.defer();
            $http.post("/api/assignment/user", user).success(function(response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        }

        function deleteUserById(userId) {
            var deferred = $q.defer();
            $http.delete("/api/assignment/user" + userId).success(function(response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        }

        function updateUser(userId, userInfo) {
            var deferred = $q.defer();
            $http.put("/api/assignment/user/" + userId, userInfo).success(function(response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        }
    }
})();