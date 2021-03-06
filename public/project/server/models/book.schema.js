"use strict";
var mongoose = require('mongoose');
var CommentSchema = require("./comment.schema.js").schema;

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
    comments: [CommentSchema]
}, {
    collection: "cs5610.project.book"
});

module.exports = {
    model: mongoose.model('Books', BookSchema),
    schema: BookSchema
};
