"use strict";

module.exports = function(app, model, auth, isAdmin, passport) {
    app.post("/api/project/login", passport.authenticate('local',
        { failureFlash: 'Invalid username or password.', successFlash: 'Welcome!' }), login);
    app.get("/api/project/loggedin", loggedin);
    app.get("/api/project/logout", logout);
    app.post("/api/project/register", register);
    app.get("/api/project/allUsers/", isAdmin, findAllUsers);
    app.get("/api/project/user", getUser);
    app.put("/api/project/user/:userId", auth, updateUser);
    app.delete("/api/project/user/:userId", isAdmin, deleteUser);
    app.put("/api/project/userUpdatePassword", auth, updatePassword);

    function login(req, res) {
        res.json(req.user);
    }

    function loggedin(req, res) {
        res.json(req.isAuthenticated() ? req.user : null);
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function register(req, res) {
        var newUser = req.body;
        newUser.group = ["customer"];
        model.create(newUser).then(function(user) {
            if (user == null) return next(null);
            req.login(user, function(err) {
                if (err) return next(err);
                res.json(user);
            });
        });
    }

    function findAllUsers(req, res) {
        model.findAllUsers().then(function(users) {
            res.json(users);
        });
    }

    function getUser(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        if (username == null && password == null) {
            return;
        }
        if (password == null) {
            model.findUserByUsername(username).then(function(user) {
                res.json(user);
            });
            return;
        }
        model.findUserByUsernameAndPassword(username, password).then(function(user) {
            res.json(user);
        });
    }

    function updateUser(req, res) {
        model.update(req.params.userId, req.body).then(function(user) {
            res.json(user);
        });
    }

    function deleteUser(req, res) {
        model.delete(req.params.userId).then(function(users) {
            res.json(users);
        });
    }

    function findUserByUsername(req, res) {
        model.findByUsername(req.params.username).then(function(users) {
            res.json(users);
        });
    }

    function updatePassword(req, res) {
        model.updatePassword(req.body).then(function(user) {
            res.json(user);
        });
    }

};