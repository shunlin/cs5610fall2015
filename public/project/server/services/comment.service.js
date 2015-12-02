"use strict";

module.exports = function(app, model, auth) {
    app.post("/api/project/book/:bookId/comment/", createComment);
    app.get("/api/project/book/:bookId/comments/", findAllComments);
    app.get("/api/project/book/:bookId/comment/:commentId", findCommentById);
    app.put("/api/project/book/:bookId/comment/:commentId", updateComment);
    app.delete("/api/project/book/:bookId/comment/:commentId", deleteComment);

    function createComment(req, res) {
        var newComment = req.body;
        var bookId = req.params.bookId;
        model.createCommentForBook(bookId, newComment).then(function(book) {
            res.json(book);
        });
    }

    function findAllComments(req, res) {
        model.findAllCommentsForBook(req.params.bookId).then(function(comments) {
            res.json(comments);
        });
    }

    function findCommentById(req, res) {
        model.findCommentForBook(req.params.bookId, req.params.commentId).then(function(comment) {
            res.json(comment);
        });
    }

    function updateComment(req, res) {
        model.updateCommentForBook(req.params.bookId, req.params.commentId, req.body).then(function(book) {
            res.json(book);
        });
    }

    function deleteComment(req, res) {
        model.deleteCommentForBook(req.params.bookId, req.params.commentId).then(function(books) {
            res.json(books);
        });
    }
};