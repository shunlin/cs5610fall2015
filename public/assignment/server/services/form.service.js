"use strict";

module.exports = function(app, model) {
    app.get("/api/assignment/user/:userId/form", function(req, res) {
        res.json(model.findAllFormsForUser(req.params.userId));
    });

    app.get("/api/assignment/form/:formId", function(req, res) {
        res.json(model.findById(req.params.formId));
    });

    app.delete("/api/assignment/form/:formId", function(req, res) {
        res.json(model.deleteForm(req.params.formId));
    });

    app.post("/api/assignment/user/:userId/form", function(req, res) {
        var newForm = req.body;
        newForm.userId = Number(req.params.userId);
        console.log(newForm);
        res.json(model.create(newForm));
    });

    app.put("/api/assignment/form/:formId", function(req, res) {
        res.json(model.updateForm(req.params.formId, req.body));
    });
}