"use strict";

module.exports = function(app, model) {
    app.get("/api/assignment/form/:formId/field", findFieldsById);
    app.get("/api/assignment/form/:formId/field/:fieldId", findFieldById);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteField);
    app.post("/api/assignment/form/:formId/field", createField);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateField);

    function findFieldsById(req, res) {
        model.findById(req.params.formId).then(function(form) {
            res.json(form.fields);
        });
    }

    function findFieldById(req, res) {
        model.findFieldByFieldId(req.params.formId, req.params.fieldId).then(function(field) {
            res.json(field);
        })
    }

    function deleteField(req, res) {
        model.deleteFieldFromForm(req.params.formId, req.params.fieldId).then(function(fields) {
            res.json(fields);
        })
    }

    function createField(req, res) {
        model.createFieldForForm(req.params.formId, req.body).then(function(field) {
            res.json(field);
        })
    }

    function updateField(req, res) {
        model.updateFieldForForm(req.params.formId, req.params.fieldId, req.body).then(function(field) {
            res.json(field);
        });
    }
};