"use strict";

module.exports = function(app, model) {
    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", getUser);
    app.get("/api/assignment/user/:id", getUserById);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUser);

    function createUser(req, res) {
        model.create(req.body).then(function(user) {
            res.json(user);
        });
    }

    function getUser(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        if (username == null && password == null) {
            model.findAll().then(function(users) {
                res.json(users);
            });
            return;
        }
        if (password == null) {
            model.findUserByUsername(username).then(function(user) {
                res.json(user);
            });
            return;
        }
        var cred = {
            username: username,
            password: password
        };
        model.findUserByCredentials(cred).then(function(user) {
            res.json(user);
        });
    }

   function getUserById(req, res) {
       model.findById(req.params.id).then(function(user) {
           res.json(user);
       })
    }

    function updateUser(req, res) {
        model.update(req.params.id, req.body).then(function(user) {
            res.json(user);
        });
    }

    function deleteUser(req, res) {
        model.delete(req.params.id).then(function(users) {
            res.json(users);
        });
    }
};