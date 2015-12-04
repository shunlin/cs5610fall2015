"use strict";

(function () {
    angular
        .module("MyBook")
        .controller("SearchController", SearchController);

    function SearchController($routeParams, BookService) {
        var model = this;
        var keyword = $routeParams.keyword;

        BookService.getBooksByTitle(keyword).then(function(bookList) {
            model.result = bookList;
        });
    }
})();