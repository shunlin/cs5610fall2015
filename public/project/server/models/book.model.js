"use strict";

var q = require("q");

module.exports = function(app, mongoose) {
    var BookSchema = require("./book.schema.js")(app, mongoose);
    var BookModel = mongoose.model("BookModel", BookSchema);

    var api = {
        create: createBook,
        findAll: findAllBooks,
        findById: findById,
        update: updateBook,
        delete: deleteBook,
        findBooksByTitle: findBooksByTitle,
        getTopTenSellers: getTopTenSellers,
        getTenLatestBooks: getTenLatestBooks
    };
    return api;

    function createBook(book) {
        var deferred = q.defer();
        BookModel.create(book, function(err, book) {
            if (err) deferred.reject(err);
            else deferred.resolve(book);
        });

        return deferred.promise;
    }

    function findAllBooks() {
        var deferred = q.defer();
        BookModel.find(function(err, books) {
            if (err) deferred.reject(err);
            else deferred.resolve(books);
        });

        return deferred.promise;
    }

    function findById(bookId) {
        var deferred = q.defer();
        BookModel.findById(bookId, function(err, book) {
            if (err) deferred.reject(err);
            else deferred.resolve(book);
        });

        return deferred.promise;
    }

    function updateBook(bookId, bookInfo) {
        var deferred = q.defer();
        BookModel.findByIdAndUpdate(
            bookId,
            {
                description: bookInfo.description,
                authorIntro: bookInfo.authorIntro,
                price: bookInfo.price,
                quantity: bookInfo.quantity,
                sold: bookInfo.sold
            },
            function(err, user) {
                if (err) deferred.reject(err);
                else deferred.resolve(user);
            }
        );
        return deferred.promise;
    }

    function deleteBook(bookId) {
        var deferred = q.defer();
        BookModel.findByIdAndRemove(bookId, function(err, res) {
            if (err) deferred.reject(err);
            else BookModel.find(function(err, users) {
                deferred.resolve(users);
            })
        });

        return deferred.promise;
    }

    function findBooksByTitle(title) {
        var deferred = q.defer();
        BookModel.find({title: title}, function(err, books) {
            if (err) deferred.reject(err);
            else deferred.resolve(books);
        });

        return deferred.promise;
    }

    function getTopTenSellers() {
        var deferred = q.defer();
        BookModel.find(function(err, books) {
            if (err) deferred.reject(err);
            else deferred.resolve(books);
        }).sort({'sold': -1}).limit(10);

        return deferred.promise;
    }

    function getTenLatestBooks() {
        var deferred = q.defer();
        BookModel.find(function(err, books) {
            if (err) deferred.reject(err);
            else deferred.resolve(books);
        }).sort({'date': -1}).limit(10);

        return deferred.promise;
    }
};