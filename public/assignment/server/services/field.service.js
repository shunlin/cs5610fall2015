"use strict";

module.exports = function(app, model) {
    app.get("/api/assignment/form/:formId/field", function(req, res) {
        res.json(model.findById(req.params.formId).fields);
    });

    app.get("/api/assignment/form/:formId/field/:fieldId", function(req, res) {
        res.json(model.findFieldByFieldId(req.params.formId, req.params.fieldId));
    });

    app.delete("/api/assignment/form/:formId/field/:fieldId", function(req, res) {
        res.json(model.deleteFieldFromForm(req.params.formId, req.params.fieldId));
    });

    app.post("/api/assignment/form/:formId/field", function(req, res) {
        res.json(model.createFieldForForm(req.params.formId, req.body));
    });

    app.put("/api/assignment/form/:formId/field/:fieldId", function(req, res) {
        res.json(model.updateFieldForForm(req.params.formId, req.params.fieldId, req.body));
    });
}