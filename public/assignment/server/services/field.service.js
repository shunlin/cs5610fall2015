"use strict";

module.exports = function(app, model) {
    app.get("/api/assignment/form/:formId/field", function(req, res) {
        res.json(model.findById(req.params.formId).fields);
    });

    app.get("/api/assignment/form/:formId/field/:fieldId", function(req, res) {
        res.json(model.findFieldByFieldId(req.params.formId, req.params.fieldId));
    });

    app.delete("/api/assignment/form/:formId", function(req, res) {
        res.json(model.deleteForm(req.params.formId));
    });

    app.post("/api/assignment/user/:userId/form", function(req, res) {
        var newForm = req.body;
        newForm.userId = Number(req.params.userId);
        res.json(model.create(newForm));
    });

    app.put("/api/assignment/form/:formId", function(req, res) {
        res.json(model.updateForm(req.params.formId, req.body));
    });
}