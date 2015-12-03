"use strict";

(function () {
    angular
        .module("MyBook")
        .controller("CartController", CartController);

    function CartController($location, $cookies, BookService) {
        var model = this;
        model.$location = $location;
        model.totalPrice = 0;
        model.updateNumber = updateNumber;
        model.deleteBook = deleteBook;
        var cartBooks = $cookies.getObject("cart");

        if (cartBooks != null) {
            getInfoFromCookies(cartBooks, model);
        }

        function updateNumber(model, book) {
            if (book.bookNumber > book.quantity) {
                alert("Not enough books available!");
                return;
            }
            var cart = $cookies.getObject("cart");
            if (book.bookNumber <= 0) delete cart[book._id];
            else cart[book._id] = Number(book.bookNumber);
            $cookies.putObject("cart", cart);

            getInfoFromCookies(cart, model);
        }

        function deleteBook(book) {
            var cart = $cookies.getObject("cart");
            delete cart[book._id];
            $cookies.putObject("cart", cart);

            getInfoFromCookies(cart, model);
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
    }
})();