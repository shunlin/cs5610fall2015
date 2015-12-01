"use strict";

module.exports = function(app, model) {
    app.post("/api/project/book/:bookId", createBook);
    app.post("/api/project/book/", findAllBooks);
    app.get("/api/project/book/:bookId", findBookById);
    app.put("/api/project/book/:bookId", updateBook);
    app.delete("/api/project/book/:bookId", deleteBook);
    app.get("/api/project/bookSearch/:bookTitle", findBooksByTitle);
    app.get("/api/project/book/topTenSeller", getTopTenSellers);
    app.get("/api/project/book/tenLatest", getTenLatestBooks);

    function createBook(req, res) {
        var newBook = req.body;
        model.create(newBook).then(function(book) {
            res.json(book);
        });
    }

    function findAllBooks(req, res) {
        model.findAllBooks().then(function(books) {
           res.json(books);
        });
    }

    function findBookById(req, res) {
        model.findById(req.params.bookId).then(function(book) {
            res.json(book);
        });
    }

    function updateBook(req, res) {
        model.update(req.params.bookId, req.body).then(function(book) {
            res.json(book);
        });
    }

    function deleteBook(req, res) {
        model.delete(req.params.bookId).then(function(books) {
            res.json(books);
        });
    }

    function findBooksByTitle(req, res) {
        model.findBooksByTitle(req.params.bookTitle).then(function(books) {
            res.json(books);
        });
    }

    function getTopTenSellers(req, res) {
        model.getTopTenSellers().then(function(books) {
            res.json(books);
        });
    }

    function getTenLatestBooks(req, res) {
        model.getTenLatestBooks().then(function(books) {
            res.json(books);
        });
    }
};