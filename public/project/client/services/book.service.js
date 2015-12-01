"use strict";

(function() {
    angular
        .module("MyBook")
        .factory("BookService", BookService);

    function BookService($http, $q) {
        var api = {
            getBookInfoById: getBookInfoById
        };
        return api;

        function getBookInfoById(bookId) {
            var deferred = $q.defer();
            var bookInfo;
            $http.get("/api/project/book/" + bookId).success(function (response) {
                bookInfo = response[0];
                $.ajax({
                    url:"http://openlibrary.org/api/books?bibkeys=ISBN:" + bookInfo.isbn + "&jscmd=details&format=jsonp",
                    dataType: "jsonp",
                    success:
                        function (response) {
                            var attriName = "ISBN:" + bookInfo.isbn;
                            var apiInfo = response[attriName].details;
                            bookInfo.title = apiInfo.title;
                            bookInfo.image = "https://covers.openlibrary.org/b/id/" + apiInfo.covers[0].toString() + "-M.jpg";
                            bookInfo.date = apiInfo.created.value;
                            bookInfo.author = apiInfo.authors[0].name;
                            bookInfo.publisher = apiInfo.publishers[0];
                            bookInfo.page = apiInfo.number_of_pages;
                            console.log(bookInfo);
                            deferred.resolve(bookInfo);
                        }
                });
            });
            return deferred.promise;
        }
    }

})();