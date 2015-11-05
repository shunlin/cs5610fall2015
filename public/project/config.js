"use strict";

(function(){
    angular
        .module("MyBook")
        .config(Configure);
    $locationProvider.html5Mode(true);

    function Configure($routeProvider) {
        $routeProvider
            .when("/home",{
                templateUrl: "home/home.view.html"
            })
            .when("/login", {
                templateUrl: "login/login.view.html",
                controller: "LoginController"
            })
            .when("/register", {
                templateUrl: "register/register.view.html",
                controller: "RegisterController"
            })
            .when("/profile", {
                templateUrl: "profile/profile.view.html",
                controller: "ProfileController"
            })
            .when("/search", {
                templateUrl: "search/search.view.html"
            })
            .when("/book/:id", {
                templateUrl: "book/book.view.html"
            })
            .when("/bookEdit/:id", {
                templateUrl: "bookEdit/bookEdit.view.html"
            })
            .when("/addBook", {
                templateUrl: "addBook/addBook.view.html"
            })
            .when("/cart", {
                templateUrl: "cart/cart.view.html"
            })
            .when("/checkout", {
                templateUrl: "checkout/checkout.view.html"
            })
            .when("/orders", {
                templateUrl: "orders/orders.view.html"
            })
            .when("/order/:id", {
                templateUrl: "orders/orders.view.html"
            })
            .when("/allOrders", {
                templateUrl: "allOrders/allOrders.view.html"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();