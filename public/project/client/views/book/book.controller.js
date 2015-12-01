"use strict";

(function () {
    angular
        .module("MyBook")
        .controller("BookController", BookController);

    function BookController($location, $routeParams, BookService) {
        var model = this;
        var bookId = $routeParams.bookId;
        model.$location = $location;
        model.delete = deleteBook;
        model.edit = editBook;

        BookService.getBookInfoById(bookId).then(function(bookInfo) {
            model.bookInfo = bookInfo;
        });

        function deleteBook() {
            BookService.deleteBook(bookId).then(function() {
                $location.url('/home');
            })
        }

        function editBook() {
            $location.url('/bookEdit/' + bookId);
        }
    }
})();