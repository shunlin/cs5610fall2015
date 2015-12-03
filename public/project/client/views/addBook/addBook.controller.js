"use strict";

(function () {
    angular
        .module("MyBook")
        .controller("AddBookController", AddBookController);

    function AddBookController($location, $cookies, BookService) {
        var model = this;
        model.$location = $location;
        var currentUser = $cookies.getObject("user");
        if (currentUser.group.indexOf('admin') != -1) {
            $location.url('/login');
            return;
        }


        model.newBook = {};
        var newBook = model.newBook;
        model.addBook = addBook;

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