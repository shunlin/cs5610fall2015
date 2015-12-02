"use strict";
var mongoose = require('mongoose');
var CommentSchema = mongoose.Schema({
    user: {type: mongoose.Schema.ObjectId, ref: "Users"},
    title: String,
    content: String,
    grade: Number,
    time: {type: Date, default: Date.now}
});

module.exports = {
    model: mongoose.model('Comments', CommentSchema),
    schema: CommentSchema
}