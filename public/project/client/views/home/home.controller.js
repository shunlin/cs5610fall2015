"use strict";

(function () {
    angular
        .module("MyBook")
        .controller("HomeController", HomeController);

    function HomeController(BookService) {
        var model = this;

        BookService.getTenLatestBooks().then(function(bookList) {
            model.tenLatestBooks = bookList;
        });

        BookService.getTopTenSellers().then(function(bookList) {
            model.topTenSellers = bookList;
        });

    }
})();