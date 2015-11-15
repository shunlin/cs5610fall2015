"use strict";

(function () {
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController($routeParams, FieldService) {
        var model = this;
        model.addField = addField;
        model.removeField = removeField;

        var formId = $routeParams.formId;

        FieldService.getForm(formId).then(function(form) {
           model.formName = form.title;
        });

        var fieldValueMap = {};
        initFieldValueMap();

        FieldService.getFieldsForForm(formId).then(function (fields) {
            model.fields = fields;
        });

        function initFieldValueMap() {
            fieldValueMap["SingleLineText"] = {
                "id": null,
                "label": "New Text Field",
                "type": "TEXT",
                "placeholder": "New Field"
            };
            fieldValueMap["MultiLineText"] = {
                "id": null,
                "label": "New Text Field",
                "type": "TEXTAREA",
                "placeholder": "New Field"
            };
            fieldValueMap["Date"] = {"id": null, "label": "New Date Field", "type": "DATE"};
            fieldValueMap["Dropdown"] =
            {
                "id": null, "label": "New Dropdown", "type": "OPTIONS", "options": [
                {"label": "Option 1", "value": "OPTION_1"},
                {"label": "Option 2", "value": "OPTION_2"},
                {"label": "Option 3", "value": "OPTION_3"}
            ]
            };
            fieldValueMap["Checkboxes"] =
            {
                "id": null, "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                {"label": "Option A", "value": "OPTION_A"},
                {"label": "Option B", "value": "OPTION_B"},
                {"label": "Option C", "value": "OPTION_C"}
            ]
            };
            fieldValueMap["RadioButtons"] =
            {
                "id": null, "label": "New Radio Buttons", "type": "RADIOS", "options": [
                {"label": "Option X", "value": "OPTION_X"},
                {"label": "Option Y", "value": "OPTION_Y"},
                {"label": "Option Z", "value": "OPTION_Z"}
            ]
            };
        }

        function addField(fieldType) {
            var newField = fieldValueMap[fieldType];

            FieldService.createFieldForForm(
                formId,
                newField).then(
                function (fields) {
                    model.fields = fields;
                });
        }

        function removeField(field) {
            FieldService.deleteFieldFromForm(
                formId, field.id).then(
                function (fields) {
                    model.fields = fields;
                }
            );
        }
    }
})();