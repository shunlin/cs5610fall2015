"use strict";

(function() {
    angular
        .module("MyBook")
        .factory("BookService", BookService);

    function BookService($http, $q) {
        var api = {
            getBookInfoById: getBookInfoById,
            addBook: addBook,
            deleteBook: deleteBook,
            updateBook: updateBook

        };
        return api;

        function getBookInfoById(bookId) {
            var deferred = $q.defer();
            var bookInfo;
            $http.get("/api/project/book/" + bookId).success(function(response) {
                bookInfo = response;
                $.ajax({
                    url:"http://openlibrary.org/api/books?bibkeys=ISBN:" + bookInfo.isbn + "&jscmd=details&format=jsonp",
                    dataType: "jsonp",
                    success:
                        function (response) {
                            var attriName = "ISBN:" + bookInfo.isbn;
                            var apiInfo = response[attriName].details;
                            bookInfo.title = apiInfo.title;
                            bookInfo.image = "https://covers.openlibrary.org/b/id/" + apiInfo.covers[0].toString() + "-M.jpg";
                            bookInfo.date = apiInfo.created.value.substring(0, 10);
                            bookInfo.author = apiInfo.authors[0].name;
                            bookInfo.publisher = apiInfo.publishers[0];
                            bookInfo.page = apiInfo.number_of_pages;
                            deferred.resolve(bookInfo);
                        }
                });
            });
            return deferred.promise;
        }

        function addBook(newBook) {
            var deferred = $q.defer();
            $http.post("/api/project/book/", newBook).success(function(response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        }

        function deleteBook(bookId) {
            var deferred = $q.defer();
            $http.delete("/api/project/book/" + bookId).success(function(response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        }

        function updateBook(bookId, bookInfo) {
            var deferred = $q.defer();
            $http.put("/api/project/book/" + bookId, bookInfo).success(function(response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        }
    }

})();