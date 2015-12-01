"use strict";

module.exports = function(app, mongoose) {
    var BookSchema = mongoose.Schema({
        isbn: String,
        author: [String],
        description: String,
        authorIntro: String,
        price: Number,
        quantity: Number,
        sold: Number,
        addDate: {type: Date, default: Date.now}
    }, {
        collection: "cs5610.project.book"
    });
    return BookSchema;
};