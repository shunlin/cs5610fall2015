"use strict";

(function () {
    angular
        .module("MyBook")
        .controller("BookController", BookController);

    function BookController($location, $routeParams, $cookies, BookService) {
        var model = this;
        var bookId = $routeParams.bookId;
        model.$location = $location;
        model.delete = deleteBook;
        model.edit = editBook;
        model.removeComment = removeComment;
        model.addComment = addComment;
        model.formatTime = formatTime;
        model.addToCart = addToCart;
        model.newComment = {};
        model.currentUser = $cookies.getObject("user");
        model.isAdmin = (model.currentUser != null && model.currentUser.group.indexOf('admin') != -1);


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
            newComment.user = model.currentUser._id;

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

        function addToCart() {
            var cart = {};
            if ($cookies.getObject("cart") == null) {
                $cookies.putObject("cart", cart);
            }
            cart = $cookies.getObject("cart");

            if (cart[bookId] == null) cart[bookId] = Number(1);
            else cart[bookId] = Number(cart[bookId]) + 1;
            $cookies.putObject("cart", cart);
            console.log(cart);
            $location.url("/cart");
        }
    }
})();