"use strict";

var q = require("q");

module.exports = function(app) {
    var BookModel = require("./book.schema.js");
    var CommentModel = require("./comment.schema.js").model;

    var api = {
        create: createBook,
        findAll: findAllBooks,
        findById: findById,
        getBooksByIds: getBooksByIds,
        findByISBN: findByISBN,
        update: updateBook,
        delete: deleteBook,
        findBooksByKeyword: findBooksByKeyword,
        getTopTenSellers: getTopTenSellers,
        getTenLatestBooks: getTenLatestBooks,
        createCommentForBook: createCommentForBook,
        findAllCommentsForBook: findAllCommentsForBook,
        findCommentForBook: findCommentForBook,
        updateCommentForBook: updateCommentForBook,
        deleteCommentForBook: deleteCommentForBook,

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
        }).populate({
            path: 'comments',
            populate: { path: 'user'}
        });

        return deferred.promise;
    }

    function getBooksByIds(bookIds) {
        var deferred = q.defer();
        BookModel.find({ _id : { $in : bookIds } }, function(err, book) {
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

    function createCommentForBook(bookId, comment) {
        var deferred = q.defer();
        BookModel.findById(bookId, function(err, book) {
            if (err) deferred.reject(err);
            else {
                var newComment = new CommentModel({
                    user: comment.user,
                    title: comment.title,
                    content: comment.content,
                    grade: comment.grade
                });
                book.comments.push(newComment);
                book.save(function(err, savedBook) {
                    if (err) deferred.reject(err);
                    else deferred.resolve(savedBook);
                })
            }
        });

        return deferred.promise;
    }

    function findAllCommentsForBook(bookId) {
        var deferred = q.defer();
        BookModel.findById(bookId, function(err, book) {
            if (err) deferred.reject(err);
            else deferred.resolve(book.comments);
        });
        return deferred.promise;
    }

    function findCommentForBook(bookId, commentId) {
        var deferred = q.defer();
        BookModel.findById(bookId, function(err, book) {
            if (err) deferred.reject(err);
            else {
                for (var i = 0; i < book.comments.length; i++) {
                    if (book.comments[i]._id == commentId) {
                        deferred.resolve(book.comments[i]);
                        break;
                    }
                }
            }
        });
        return deferred.promise;
    }

    function updateCommentForBook(bookId, commentId, comment) {
        var deferred = q.defer();
        BookModel.findById(bookId, function(err, book) {
            if (err) deferred.reject(err);
            else {
                for (var i = 0; i < book.comments.length; i++) {
                    if (book.comments[i]._id == commentId) {
                        book.comments[i].title = comment.title;
                        book.comments[i].content = comment.content;
                        book.comments[i].grade = comment.grade;
                        book.save(function(err, savedBook) {
                            if (err) deferred.reject(err);
                            else deferred.resolve(savedBook);
                        });
                        break;
                    }
                }
            }
        });

        return deferred.promise;
    }

    function deleteCommentForBook(bookId, commentId) {
        var deferred = q.defer();
        BookModel.findById(bookId, function(err, book) {
            if (err) deferred.reject(err);
            else {
                for (var i = 0; i < book.comments.length; i++) {
                    if (book.comments[i]._id == commentId) {
                        book.comments.splice(i, 1);
                        book.save(function(err, savedBook) {
                            if (err) deferred.reject(err);
                            else deferred.resolve(savedBook);
                        });
                        break;
                    }
                }
            }
        });

        return deferred.promise;
    }
};