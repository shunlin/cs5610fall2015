"use strict";
var mongoose = require('mongoose');
var CommentModel = require("./comment.schema.js");

var BookSchema = mongoose.Schema({
    isbn: String,
    title: String,
    author: [String],
    description: String,
    authorIntro: String,
    price: Number,
    quantity: Number,
    sold: {type: Number, default: 0},
    addDate: {type: Date, default: Date.now},
    comments: [CommentModel.schema]
}, {
    collection: "cs5610.project.book"
});

module.exports = mongoose.model('BookModel', BookSchema);
