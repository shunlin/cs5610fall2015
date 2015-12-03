"use strict";
var mongoose = require('mongoose');

var OrderSchema = mongoose.Schema({
    user: {type: mongoose.Schema.ObjectId, ref: "Users"},
    address: String,
    status: {
        type: String,
        enum: ["Processing", "Shipped", "Completed"]
    },
    time: {type: Date, default: Date.now},
    receiver: String,
    totalPrice: Number,
    books: [{
        book: {type: mongoose.Schema.ObjectId, ref: "Books"},
        quantity: Number,
        price: Number
    }]
}, {
    collection: "cs5610.project.book"
});

module.exports = mongoose.model('Books', OrderSchema);
