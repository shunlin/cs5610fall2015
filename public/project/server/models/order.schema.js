"use strict";
var mongoose = require('mongoose');

var OrderSchema = mongoose.Schema({
    user: {type: mongoose.Schema.ObjectId, ref: "Users"},
    address: String,
    telephone: String,
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
    collection: "cs5610.project.order"
});

module.exports = {
    model: mongoose.model('Orders', OrderSchema),
    schema: OrderSchema
};
