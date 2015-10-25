"use strict";

(function(){
    angular
        .module("FormBuilderApp")
        .config(Configure);

    function Configure($routeProvider) {
        $routeProvider
            .when("/home",{
                templateUrl: "./home/home.view.html"
            })
            .when("/register", {
                templateUrl: "register.html"
            })
            .when("/courses", {
                templateUrl: "courses.html",
                controller: "CourseController"
            })
            .when("/courseEdit/:count", {
                templateUrl: "courseEdit.html",
                controller: "CourseEditController"
            })
            .when("/login", {
                templateUrl: "login.html"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();