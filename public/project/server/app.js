"use strict";
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(app, db, mongoose, passport) {
    var UserModel = require("./models/user.schema.js").model;

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

    var isAdmin = function(req, res, next) {
        if (req.isAuthenticated() &&
            req.user != null &&
            req.user.group != null &&
            req.user.group.indexOf('admin') != -1) {
            next();
        } else res.send(401);
    };

    var books = require("./models/book.model.js")(app);
    var users = require("./models/user.model.js")(app);
    var orders = require("./models/order.model.js")(app);
    require("./services/book.service.js")(app, books, auth, isAdmin);
    require("./services/user.service.js")(app, users, auth, isAdmin, passport);
    require("./services/comment.service.js")(app, books, auth, isAdmin);
    require("./services/order.service.js")(app, orders, auth, isAdmin);
};