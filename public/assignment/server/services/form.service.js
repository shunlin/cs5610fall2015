"use strict";

module.exports = function(app, model) {
    app.get("/api/assignment/user/:userId/form", findFormsForUser);
    app.get("/api/assignment/form/:formId", findFormById);
    app.delete("/api/assignment/form/:formId", deleteForm);
    app.post("/api/assignment/user/:userId/form", createForm);
    app.put("/api/assignment/form/:formId", updateForm);

    function findFormsForUser(req, res) {
        model.findAllFormsForUser(req.params.userId).then(function(forms) {
            res.json(forms);
        });
    }

    function findFormById(req, res) {
        model.findById(req.params.formId).then(function(form) {
            res.json(form);
        })
    }

    function deleteForm(req, res) {
        model.deleteForm(req.params.formId).then(function(forms) {
            res.json(forms);
        })
    }

    function createForm(req, res) {
        var newForm = req.body;
        newForm.userId = req.params.userId;
        model.create(newForm).then(function(form) {
            res.json(form);
        });
    }

    function updateForm(req, res) {
        model.updateForm(req.params.formId, req.body).then(function(forms) {
            res.json(forms);
        });
    }
};