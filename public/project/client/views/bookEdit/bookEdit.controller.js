"use strict";

(function () {
    angular
        .module("MyBook")
        .controller("BookEditController", BookEditController);

    function BookEditController($location, $routeParams, BookService) {
        var model = this;
        model.bookInfo = {};
        var bookInfo = model.bookInfo;
        model.editBook = editBook;
        model.$location = $location;

        function editBook() {
            var authors = bookInfo.authorString.split(', ');
            bookInfo.author = [];
            for (var i = 0; i < authors.length; i++) {
                bookInfo.author.push(authors[i]);
            }
            BookService.addBook(bookInfo).then(
                function(book) {
                    $location.url('/book/' + book._id);
                });
        }
    }
})();