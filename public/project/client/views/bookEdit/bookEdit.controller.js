"use strict";

(function () {
    angular
        .module("MyBook")
        .controller("BookEditController", BookEditController);

    function BookEditController($location, $cookies, $routeParams, BookService) {
        var model = this;
        model.$location = $location;
        var currentUser = $cookies.getObject("user");
        if (currentUser == null || currentUser.group.indexOf('admin') == -1) {
            $location.url('/login');
            return;
        }
        var bookId = $routeParams.bookId;

        model.editBook = editBook;
        model.$location = $location;

        BookService.getBookInfoById(bookId).then(function(book) {
            model.bookInfo = book;
        });

        function editBook() {
            var authors = model.bookInfo.author.split(', ');
            model.bookInfo.author = [];
            for (var i = 0; i < authors.length; i++) {
                model.bookInfo.author.push(authors[i]);
            }
            BookService.updateBook(bookId, model.bookInfo).then(
                function(book) {
                    $location.url('/book/' + book._id);
                });
        }
    }
})();