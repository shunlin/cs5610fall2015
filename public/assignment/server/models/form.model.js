"use strict";

var q = require("q");

module.exports = function(app, mongoose) {
    var forms = require("./form.mock.json");
    var FieldSchema = require("./field.schema.js")(app, mongoose);
    var FieldModel = mongoose.model("FieldModel", FieldSchema);
    var FormSchema = require("./form.schema.js")(app, mongoose);
    var FormModel = mongoose.model("FormModel", FormSchema);

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
        var deferred = q.defer();
        FormModel.create(form, function(err, form) {
            if (err) deferred.reject(err);
            else deferred.resolve(form);
        });
        return deferred.promise;
    }

    function findAllForms() {
        var deferred = q.defer();
        FormModel.find(function(err, forms) {
            if (err) deferred.reject(err);
            else deferred.resolve(forms);
        });
        return deferred.promise;
    }

    function findFormById(formId) {
        var deferred = q.defer();
        FormModel.findById(formId, function(err, form) {
            if (err) deferred.reject(err);
            else deferred.resolve(form);
        });
        return deferred.promise;
    }

    function updateForm(formId, formInfo) {
        var deferred = q.defer();
        FormModel.findByIdAndUpdate(
            formId,
            {
                title: formInfo.title
            },
            {   new : true},
            function(err, form) {
                console.log(form);
                if (err) deferred.reject(err);
                else deferred.resolve(form);
            }
        );

        return deferred.promise;
    }

    function deleteForm(formId) {
        var deferred = q.defer();
        FormModel.findByIdAndRemove(formId, function(err, res) {
            if (err) deferred.reject(err);
            else FormModel.find(function(err, forms) {
                deferred.resolve(forms);
            })
        });

        return deferred.promise;
    }

    function findFormByTitle(title) {
        var deferred = q.defer();
        FormModel.findOne({title: title}, function(err, form) {
            if (err) deferred.reject(err);
            else deferred.resolve(form);
        });

        return deferred.promise;
    }

    function findAllFormsForUser(userId) {
        var deferred = q.defer();
        FormModel.find({userId: userId}, function(err, forms) {
            if (err) deferred.reject(err);
            else deferred.resolve(forms);
        });

        return deferred.promise;
    }

    function findFieldByFieldId(formId, fieldId) {
        var deferred = q.defer();
        FormModel.findById(formId, function(err, form) {
            if (err) {
                deferred.reject(err);
                return;
            }
            var fields = form.fields;
            for (var i = 0; i < fields.length; i++) {
                if (fields[i]._id == fieldId) {
                    deferred.resolve(fields[i]);
                    break;
                }
            }
        });

        return deferred.promise;
    }

    function deleteFieldFromForm(formId, fieldId) {
        var deferred = q.defer();
        FormModel.findById(formId, function(err, form) {
            if (err) {
                deferred.reject(err);
                return;
            }
            var fields = form.fields;
            for (var i = 0; i < fields.length; i++) {
                if (fields[i]._id == fieldId) {
                    fields.splice(i, 1);
                    form.save(function(err, form) {
                        deferred.resolve(form.fields);
                    });
                    break;
                }
            }
        });

        return deferred.promise;
    }

    function createFieldForForm(formId, fieldInfo) {
        var deferred = q.defer();
        FormModel.findById(formId, function(err, form) {
            if (err) {
                deferred.reject(err);
                return;
            }
            form.fields.push(fieldInfo);
            form.save(function(err, form) {
                console.log(err);
                if (err) deferred.reject(err);
                else deferred.resolve(form.fields);
            })
        });

        return deferred.promise;
    }

    function updateFieldForForm(formId, fieldId, fieldInfo) {
        var deferred = q.defer();
        FormModel.findById(formId, function(err, form) {
            if (err) {
                deferred.reject(err);
                return;
            }
            var fields = form.fields;
            for (var i = 0; i < fields.length; i++) {
                if (fields[i]._id == fieldId) {
                    fields[i] = fieldInfo;
                    form.save(function(err, form) {
                        deferred.resolve(form.fields);
                    });
                    break;
                }
            }
        });

        return deferred.promise;
    }
};