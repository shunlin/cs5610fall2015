"use strict";

var uuid = require("node-uuid");

module.exports = function(app) {
    var forms = require("form.mock.json");

    var api = {
        create: createForm,
        findAll: findAllForms,
        findById: findFormById,
        updateForm: updateForm,
        deleteForm: deleteForm,
        findFromByTitle: findFormByTitle
    };
    return api;

    function createForm(form) {
        form.id = uuid.v1();
        forms.push(form);
        return forms;
    }

    function findAllForms() {
        return forms;
    }

    function findFormById(formId) {
        for (var i in forms) {
            if (forms[i].id === formId)
                return forms[i];
        }
        return null;
    }

    function updateForm(formInfo) {
        for (var i in forms) {
            if (forms[i].id === formInfo.id) {
                forms[i] = formInfo;
                return forms[i];
            }
        }
    }

    function deleteForm(formId) {
        for (var i = 0, len = forms.length; i < len; i++) {
            if (forms[i].id === formId) forms.splice(i, 1);
            len = forms.length;
        }
        return forms;
    }

    function findFormByTitle(title) {
        for (var i in forms) {
            if (forms[i].title === title)
                return forms[i];
        }
        return null;
    }
}