"use strict";

(function() {
    angular
        .module("MyBook")
        .factory("OrderService", OrderService);

    function OrderService($http, $q) {
        var api = {
            createOrder: createOrder,
            findAllOrders: findAllOrders,
            findOrderById: findOrderById,
            findOrdersForUser: findOrdersForUser,
            updateOrder: updateOrder,
            updateOrderStatus: updateOrderStatus,
            deleteOrder: deleteOrder
        };
        return api;

        function createOrder(userId, newOrder) {
            var deferred = $q.defer();
            $http.post("/api/project/order/" + userId, newOrder).success(function(response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        }

        function findAllOrders() {
            var deferred = $q.defer();
            $http.get("/api/project/allOrders/").success(function(response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        }

        function findOrderById(orderId) {
            var deferred = $q.defer();
            $http.get("/api/project/order/" + orderId).success(function(order) {
                var booksInOrder = {};
                var ids = [];
                order.booksWithInfo = [];
                for (var i = 0; i < order.books.length; i++) {
                    booksInOrder[order.books[i].book._id] = {};
                    booksInOrder[order.books[i].book._id].bookNumber = order.books[i].quantity;
                    booksInOrder[order.books[i].book._id].price = order.books[i].price;
                    ids.push(order.books[i].book);
                }
                $http.post("/api/project/bookList/", ids).success(function(bookList) {
                    getBookInfoForList(bookList, order, booksInOrder, deferred);
                });

            });
            return deferred.promise;
        }


        function getBookInfoForList(bookList, order, booksInOrder, deferred) {
            $.ajax({
                url: composeURL(bookList),
                dataType: "jsonp",
                success:
                    function (response) {
                        for (var i = 0; i < bookList.length; i++) {
                            var bookId = bookList[i]._id;
                            bookList[i] = combineApiInfo(bookList[i], response);
                            bookList[i].bookNumber = booksInOrder[bookId].bookNumber;
                            bookList[i].price = booksInOrder[bookId].price;
                            bookList[i].linePrice = truncToTwoBits(bookList[i].bookNumber * bookList[i].price);
                            order.booksWithInfo.push(bookList[i]);
                        }
                        deferred.resolve(order);
                    }
            });
        }

        function findOrdersForUser(userId) {
            var deferred = $q.defer();
            $http.get("/api/project/orderForUser/" + userId).success(function(response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        }

        function updateOrder(orderId, orderInfo) {
            var deferred = $q.defer();
            $http.put("/api/project/order/" + orderId, orderInfo).success(function(response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        }

        function updateOrderStatus(orderId, orderStatus) {
            var deferred = $q.defer();
            var newOrder = {};
            newOrder.status = orderStatus;
            $http.put("/api/project/orderStatus/" + orderId, newOrder).success(function(response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        }

        function deleteOrder(orderId) {
            var deferred = $q.defer();
            $http.delete("/api/project/order/" + orderId).success(function(response) {
                deferred.resolve(response);
            });
            return deferred.promise;
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


        function truncToTwoBits(number) {
            return Math.floor(number * 100) / 100
        }
    }

})();