"use strict";

(function () {
    angular
        .module("MyBook")
        .controller("AddBookController", AddBookController);

    function AddBookController($location, BookService) {
        var model = this;
        model.newBook = {};
        var newBook = model.newBook;
        model.addBook = addBook;
        model.$location = $location;

        function addBook() {
            var authors = newBook.authorString.split(', ');
            newBook.author = [];
            for (var i = 0; i < authors.length; i++) {
                newBook.author.push(authors[i]);
            }
            BookService.addBook(newBook).then(
                function(book) {
                    $location.url('/book/' + book._id);
                });
        }

    }
})();