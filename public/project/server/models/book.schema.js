"use strict";

module.exports = function(app, mongoose) {
    var BookSchema = mongoose.Schema({
        isbn: String,
        title: String,
        author: [String],
        description: String,
        authorIntro: String,
        price: Number,
        quantity: Number,
        sold: {type: Number, default: 0},
        addDate: {type: Date, default: Date.now}
    }, {
        collection: "cs5610.project.book"
    });
    return BookSchema;
};