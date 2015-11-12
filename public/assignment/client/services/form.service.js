"use strict";

(function(){
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService() {
        var service = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById,
        };
        return service;

        function createFormForUser(userId, form, callback) {
            form.id = guid();
            form.userId = userId;
            forms.push(form);
            callback(form);
        }

        function findAllFormsForUser(userId, callback) {
            var result = [];
            for (var i in forms) {
                if (forms[i].userId === userId) result.push(forms[i]);
            }
            callback(result);
        }


        function deleteFormById(formId, callback) {
            for (var i = 0, len = forms.length; i < len; i++) {
                if (forms[i].id === formId) forms.splice(i, 1);
                len = forms.length;
            }
            callback(forms);
        }

        function updateFormById(formId, newForm, callback) {
            for (var i in forms) {
                if (forms[i].id === formId) {
                    forms[i].formName = newForm.formName;
                    callback(forms[i]);
                }
            }
        }

        function guid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        }
    }
})();