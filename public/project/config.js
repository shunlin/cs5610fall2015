"use strict";

(function(){
    angular
        .module("MyBook")
        .config(Configure);

    function Configure($routeProvider) {
        $routeProvider
            .when("/home",{
                templateUrl: "home/home.view.html"
            })
            .when("/login", {
                templateUrl: "login/login.view.html",
            })
            .when("/register", {
                templateUrl: "register/register.view.html",
            })
            .when("/profile", {
                templateUrl: "profile/profile.view.html",
            })
            .when("/search", {
                templateUrl: "search/search.view.html"
            })
            .when("/search/:keyword", {
                templateUrl: "search/search.view.html"
            })
            .when("/book/:id", {
                templateUrl: "book/book.view.html"
            })
            .when("/bookEdit/:id", {
                templateUrl: "bookEdit/bookEdit.view.html"
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
                templateUrl: "order/order.view.html"
            })
            .when("/allOrders", {
                templateUrl: "allOrders/allOrders.view.html"
            })
            .when("/addBook", {
                templateUrl: "addBook/addBook.view.html"
            })
            .when("/statistics", {
                templateUrl: "statistics/statistics.view.html",
                controller: "StatisticsController"
            })
            .otherwise({
                redirectTo: "/home"
            });
        }
})();