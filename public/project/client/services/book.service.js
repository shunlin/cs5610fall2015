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
            updateBook: updateBook,
            getTenLatestBooks: getTenLatestBooks,
            getTopTenSellers: getTopTenSellers,
            getBooksByTitle: getBooksByTitle

        };
        return api;

        function getBookInfoById(bookId) {
            var deferred = $q.defer();
            var bookInfo;
            $http.get("/api/project/book/" + bookId).success(function(response) {
                bookInfo = response;
                $.ajax({
                    url: "http://openlibrary.org/api/books?jscmd=details&format=jsonp&bibkeys=ISBN:" + bookInfo.isbn,
                    dataType: "jsonp",
                    success:
                        function (response) {
                            bookInfo = combineApiInfo(bookInfo, response);
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

        function getTenLatestBooks() {
            var deferred = $q.defer();
            $http.get("/api/project/tenLatestBooks/").success(function(bookList) {
                getBookInfoForList(bookList, deferred);
            });
            return deferred.promise;
        }

        function getTopTenSellers() {
            var deferred = $q.defer();
            $http.get("/api/project/topTenSellerBooks/").success(function(bookList) {
                getBookInfoForList(bookList, deferred);
            });
            return deferred.promise;
        }

        function getBooksByTitle(bookTitle) {
            var deferred = $q.defer();
            $http.get("/api/project/bookSearch/" + bookTitle).success(function(bookList) {
                getBookInfoForList(bookList, deferred);
            });
            return deferred.promise;
        }


        function getBookInfoForList(bookList, deferred) {
            $.ajax({
                url: composeURL(bookList),
                dataType: "jsonp",
                success:
                    function (response) {
                        for (var i = 0; i < bookList.length; i++) {
                            bookList[i] = combineApiInfo(bookList[i], response);
                        }
                        deferred.resolve(bookList);
                    }
            });
        }

        function composeURL(bookList) {
            var url = "http://openlibrary.org/api/books?jscmd=details&format=jsonp&bibkeys=";
            for (var i = 0; i < bookList.length; i++) {
                url = url + "ISBN:" + bookList[i].isbn + ",";
            }
            return url;
        }

        function combineApiInfo(bookInfo, infoArray) {
            var attriName = "ISBN:" + bookInfo.isbn;
            var apiInfo = infoArray[attriName].details;

            //bookInfo.title = apiInfo.title;
            bookInfo.image = "https://covers.openlibrary.org/b/id/" + apiInfo.covers[0].toString() + "-M.jpg";
            bookInfo.date = apiInfo.created.value.substring(0, 10);
            bookInfo.publisher = apiInfo.publishers[0];
            bookInfo.page = apiInfo.number_of_pages;
            bookInfo.author = bookInfo.author.join(", ");
            return bookInfo;
        }
    }

})();