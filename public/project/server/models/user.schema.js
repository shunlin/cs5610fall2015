"use strict";

module.exports = function(app, mongoose) {
    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        address: String,
        telephone: String,
        email: String,
        group: [String],
        likeBooks: [String]
    }, {
        collection: "cs5610.project.user"
    });
    return UserSchema;
};