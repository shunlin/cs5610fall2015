"use strict";

module.exports = function(app, mongoose) {
    var UserSchema = mongoose.Schema({
        firstName : String,
        lastName: String,
        username: String,
        password: String,
        email: String
    }, {
        collection: "cs5610.assignment.user"
    });
    return UserSchema;
};