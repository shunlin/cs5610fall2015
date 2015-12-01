"use strict";

(function () {
    angular
        .module("MyBook")
        .controller("BookController", BookController);

    function BookController($routeParams, BookService) {
        var model = this;
        var bookId = $routeParams.bookId;

        BookService.getBookInfoById(bookId).then(function(bookInfo) {
            model.bookInfo = bookInfo;
        })
    }
})();