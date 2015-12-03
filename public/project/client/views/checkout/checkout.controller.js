"use strict";

(function () {
    angular
        .module("MyBook")
        .controller("CheckoutController", CheckoutController);

    function CheckoutController($rootScope, $location, $cookies, OrderService, BookService, UserService) {
        var model = this;
        var currentUser = $cookies.getObject("user");
        if (currentUser == null) {
            $location.url('/login');
            return;
        }
        init();

        function init() {
            model.$location = $location;
            model.submitOrder = submitOrder;
            model.totalPrice = 0;
            model.order = {};
            model.bookList = [];

            var cartBooks = $cookies.getObject("cart");
            if (cartBooks != null) {
                getInfoFromCookies(cartBooks, model);
            }

            initOrder(currentUser, model);
        }

        function getInfoFromCookies(cartBooks, model) {
            model.totalPrice = 0;
            model.bookList = [];

            var ids = [];
            for (var bookId in cartBooks) ids.push(bookId);
            BookService.getBooksByIds(ids).then(function(bookList) {
                for (var i = 0; i < bookList.length; i++) {
                    bookList[i].bookNumber = cartBooks[bookList[i]._id];
                    bookList[i].linePrice = truncToTwoBits(bookList[i].bookNumber * bookList[i].price);
                    model.totalPrice = model.totalPrice + bookList[i].linePrice;
                    model.bookList.push(bookList[i]);
                }
                model.totalPrice = truncToTwoBits(model.totalPrice);
            });

        }

        function truncToTwoBits(number) {
            return Math.floor(number * 100) / 100
        }

        function initOrder(currentUser, model) {
            model.order.user = currentUser._id;
            model.order.receiver = currentUser.fullName;
            model.order.address = currentUser.address;
            model.order.telephone = currentUser.telephone;
            model.order.status = "Processing";
            model.order.totalPrice = model.totalPrice;

        }

        function submitOrder() {
            var bookList = model.bookList;
            model.order.totalPrice = model.totalPrice;
            model.order.books = [];
            for (var i = 0; i < bookList.length; i++) {
                var newItemLine = {};
                newItemLine.book = bookList[i]._id;
                newItemLine.quantity = bookList[i].bookNumber;
                newItemLine.price = bookList[i].price;
                model.order.books.push(newItemLine);
            }
            OrderService.createOrder(currentUser._id, model.order).then(function(order) {
                for (var i = 0; i < order.books.length; i++) {
                    var req = {};
                    req.quantity = order.books[i].quantity;
                    BookService.updateBookAfterSold(order.books[i].book, req).then(function(book) {

                    })
                }

                $cookies.putObject("cart", null);
                $location.url('/order/'+ order._id);
            });

        }
    }
})();