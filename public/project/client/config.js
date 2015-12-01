"use strict";

(function(){
    angular
        .module("MyBook")
        .config(Configure);

    function Configure($routeProvider) {
        $routeProvider
            .when("/home",{
                templateUrl: "views/home/home.view.html"
            })
            .when("/login", {
                templateUrl: "views/login/login.view.html",
            })
            .when("/register", {
                templateUrl: "views/register/register.view.html",
            })
            .when("/profile", {
                templateUrl: "views/profile/profile.view.html",
            })
            .when("/search", {
                templateUrl: "views/search/search.view.html"
            })
            .when("/search/:keyword", {
                templateUrl: "views/search/search.view.html"
            })
            .when("/book/:bookId", {
                templateUrl: "views/book/book.view.html",
                controller: "BookController",
                controllerAs: "model"
            })
            .when("/bookEdit/:id", {
                templateUrl: "views/bookEdit/bookEdit.view.html"
            })
            .when("/cart", {
                templateUrl: "views/cart/cart.view.html"
            })
            .when("/checkout", {
                templateUrl: "views/checkout/checkout.view.html"
            })
            .when("/orders", {
                templateUrl: "views/orders/orders.view.html"
            })
            .when("/order/:id", {
                templateUrl: "views/order/order.view.html"
            })
            .when("/allOrders", {
                templateUrl: "views/allOrders/allOrders.view.html"
            })
            .when("/addBook", {
                templateUrl: "views/addBook/addBook.view.html"
            })
            .when("/statistics", {
                templateUrl: "views/statistics/statistics.view.html",
                controller: "StatisticsController"
            })
            .otherwise({
                redirectTo: "/home"
            });
        }
})();