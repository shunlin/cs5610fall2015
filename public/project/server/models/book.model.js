"use strict";

var q = require("q");

module.exports = function(app, mongoose) {
    var BookSchema = require("./book.schema.js")(app, mongoose);
    var BookModel = mongoose.model("BookModel", BookSchema);

    var api = {
        create: createBook,
        findAll: findAllBooks,
        findById: findById,
        findByISBN: findByISBN,
        update: updateBook,
        delete: deleteBook,
        findBooksByKeyword: findBooksByKeyword,
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

    function findByISBN(isbn) {
        var deferred = q.defer();
        BookModel.findOne({isbn: isbn}, function(err, book) {
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
                $set: {
                    title: bookInfo.title,
                    author: bookInfo.author,
                    description: bookInfo.description,
                    authorIntro: bookInfo.authorIntro,
                    price: bookInfo.price,
                    quantity: bookInfo.quantity
                }
            },
            {
                upsert: true
            },
            function(err, book) {
                if (err) deferred.reject(err);
                else deferred.resolve(book);
            }
        );
        return deferred.promise;
    }

    function deleteBook(bookId) {
        var deferred = q.defer();
        BookModel.findByIdAndRemove(bookId, function(err, res) {
            if (err) deferred.reject(err);
            else deferred.resolve(res);
        });

        return deferred.promise;
    }

    function findBooksByKeyword(keyword) {
        var deferred = q.defer();
        BookModel.find({
            $or: [
                {title: new RegExp(keyword, "i")},
                {author: new RegExp(keyword, "i")},
                {description: new RegExp(keyword, "i")}
            ]},
            function(err, books) {
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
        }).sort({'addDate': -1}).limit(10);

        return deferred.promise;
    }
};