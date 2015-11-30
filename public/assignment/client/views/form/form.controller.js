"use strict";

(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($rootScope, $location, FormService) {
        var model = this;
        model.$location = $location;
        model.addForm = addForm;
        model.updateForm = updateForm;
        model.deleteForm = deleteForm;
        model.selectForm = selectForm;

        var userId = $rootScope.loginUser._id;
        model.userId = userId;

        FormService.findAllFormsForUser(userId).then(function(forms) {
            model.forms = forms;
        });

        function addForm() {
            var newForm = {};
            newForm.title = model.newTitle;
            FormService.createFormForUser(
                userId,
                newForm).then(
                function(form) {
                    model.forms.push(form);
                    console.log(model.forms);
                });
        }

        function updateForm() {
            var newForm = {};
            newForm.title = model.newTitle;
            FormService.updateFormById(
                model.selectedForm._id,
                newForm).then(
                    function(form) {
                        model.selectedForm.title = form.title;
                    }
            );
        }

        function deleteForm(index) {
            FormService.deleteFormById(
                model.forms[index]._id).then(
                    function(forms) {
                        model.forms.splice(index, 1);
                        console.log(model.forms);
                    }
            );
        }

        function selectForm(index) {
            model.selectedForm = model.forms[index];
            model.newTitle = model.selectedForm.title;
        }
    }
})();