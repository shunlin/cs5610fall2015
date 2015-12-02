"use strict";
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(app, db, mongoose, passport) {
    var UserSchema = require("./models/user.schema.js")(app, mongoose);
    var UserModel = mongoose.model("UserModel2", UserSchema);

    passport.use(new LocalStrategy(
        function(username, password, done) {
            UserModel.findOne({ username: username }, function (err, user) {
                if (err) { return done(err); }
                if (!user) {
                    return done(null, false, { message: 'Incorrect username.' });
                }
                if (user.password != password) {
                    return done(null, false, { message: 'Incorrect password.' });
                }
                return done(null, user);
            });
        }
    ));

    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        UserModel.findById(id, function(err, user) {
            done(err, user);
        });
    });

    var auth = function(req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else next();
    };

    var books = require("./models/book.model.js")(app, mongoose);
    var users = require("./models/user.model.js")(app, mongoose, UserModel);
    require("./services/book.service.js")(app, books, auth);
    require("./services/user.service.js")(app, users, auth, passport);
};