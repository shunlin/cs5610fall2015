"use strict";

(function () {
    angular
        .module("MyBook")
        .controller("BookController", BookController);

    function BookController($location, $routeParams, $rootScope, BookService) {
        var model = this;
        var bookId = $routeParams.bookId;
        model.$location = $location;
        model.delete = deleteBook;
        model.edit = editBook;
        model.removeComment = removeComment;
        model.addComment = addComment;
        model.formatTime = formatTime;
        model.newComment = {};


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

        function removeComment(comment) {
            BookService.deleteCommentForBook(bookId, comment._id).then(function(book) {
                BookService.getBookInfoById(book._id).then(function(bookInfo) {
                    model.bookInfo = bookInfo;
                });
            });
        }

        function addComment() {
            var newComment = model.newComment;
            newComment.user = $rootScope.currentUser._id;

            BookService.addCommentForBook(bookId, newComment).then(function(book) {
                BookService.getBookInfoById(book._id).then(function(bookInfo) {
                    model.bookInfo = bookInfo;
                });
            })
        }

        function formatTime(timeString) {
            var time = new Date(timeString);
            return time.toDateString();
        }
    }
})();