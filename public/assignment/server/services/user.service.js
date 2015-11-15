"use strict";

module.exports = function(app, model) {
    app.post("/api/assignment/user", function(req, res) {
        res.json(model.create(req.body));
    });

    app.get("/api/assignment/user", function(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        if (username == null && password == null) {
            res.json(model.findAll());
            return;
        }
        if (password == null) {
            res.json(model.findUserByUsername(username));
            return;
        }
        var cred = {
            username: username,
            password: password
        };
        res.json(model.findUserByCredentials(cred));

    });

    app.get("/api/assignment/user/:id", function(req, res) {
        res.json(model.findById(req.params.id));
    });

    app.put("/api/assignment/user/:id", function(req, res) {
        console.log(req.body);
        res.json(model.update(req.params.id, req.body));
    });

    app.delete("/api/assignment/user/:id", function(req, res) {
        res.json(model.delete(req.params.id));
    });

}