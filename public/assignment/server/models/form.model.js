"use strict";

var uuid = require("node-uuid");

module.exports = function(app) {
    var forms = require("./form.mock.json");

    var api = {
        create: createForm,
        findAll: findAllForms,
        findById: findFormById,
        updateForm: updateForm,
        deleteForm: deleteForm,
        findFromByTitle: findFormByTitle,
        findAllFormsForUser: findAllFormsForUser,
        findFieldByFieldId: findFieldByFieldId,
        deleteFieldFromForm: deleteFieldFromForm,
        createFieldForForm: createFieldForForm,
        updateFieldForForm: updateFieldForForm
    };
    return api;

    function createForm(form) {
        form.id = uuid.v1();
        forms.push(form);
        return form;
    }

    function findAllForms() {
        return forms;
    }

    function findFormById(formId) {
        for (var i in forms) {
            if (forms[i].id == formId)
                return forms[i];
        }
        return null;
    }

    function updateForm(formId, formInfo) {
        var form = findFormById(formId);
        for (var i in formInfo) {
            form[i] = formInfo[i];
        }
        return form;
    }

    function deleteForm(formId) {
        for (var i = 0, len = forms.length; i < len; i++) {
            if (forms[i].id == formId) forms.splice(i, 1);
            len = forms.length;
        }
        return forms;
    }

    function findFormByTitle(title) {
        for (var i in forms) {
            if (forms[i].title == title)
                return forms[i];
        }
        return null;
    }

    function findAllFormsForUser(userId) {
        var result = [];
        for (var i in forms) {
            if (forms[i].userId == userId) result.push(forms[i]);
        }
        return result;
    }

    function findFieldByFieldId(formId, fieldId) {
        var fields = findFormById(formId).fields;
        for (var i in fields) {
            if (fields[i].id == fieldId) return fields[i];
        }
        return null;
    }

    function deleteFieldFromForm(formId, fieldId) {
        var fields = findFormById(formId).fields;
        for (var i = 0, len = fields.length; i < len; i++) {
            if (fields[i].id == fieldId) fields.splice(i, 1);
            len = fields.length;
        }
        return forms;
    }

    function createFieldForForm(formId, fieldInfo) {
        var fields = findFormById(formId).fields;
        fieldInfo.id = uuid.v1();
        fields.push(fieldInfo);
        return fields;
    }

    function updateFieldForForm(formId, fieldId, fieldInfo) {
        var fields = findFormById(formId).fields;
        for (var i in fields) {
            if (fields[i].id == fieldId) {
                fields[i] = fieldInfo;
                return fields[i];
            }
        }
    }
}