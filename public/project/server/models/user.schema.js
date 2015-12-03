"use strict";
var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    username: String,
    password: String,
    fullName: String,
    address: String,
    telephone: String,
    email: String,
    imageURL: String,
    group: [String],
    likeBooks: [String]
}, {
    collection: "cs5610.project.user"
});

module.exports = {
    model: mongoose.model('Users', UserSchema),
    schema: UserSchema
};