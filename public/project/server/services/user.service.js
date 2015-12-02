"use strict";

module.exports = function(app, model) {
    app.post("/api/project/user/", createUser);
    app.get("/api/project/allUsers/", findAllUsers);
    app.get("/api/project/user/:userId", findUserById);
    app.put("/api/project/user/:userId", updateUser);
    app.delete("/api/project/user/:userId", deleteUser);
    app.get("/api/project/userSearch/:username", findUserByUsername);

    function createUser(req, res) {
        var newUser = req.body;
        model.create(newUser).then(function(user) {
            res.json(user);
        });
    }

    function findAllUsers(req, res) {
        model.findAllUsers().then(function(users) {
            res.json(users);
        });
    }

    function findUserById(req, res) {
        model.findById(req.params.userId).then(function(user) {
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

};