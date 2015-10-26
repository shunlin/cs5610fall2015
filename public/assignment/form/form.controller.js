"use strict";

(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, $rootScope, $location, FormService) {
        $scope.$location = $location;
        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;

        var userId = $rootScope.loginUser.id;

        FormService.findAllFormsForUser(userId, function(forms) {
            $scope.forms = forms;
        });

        function addForm() {
            var newForm = {};
            newForm.formName = $scope.newFormName;
            FormService.createFormForUser(
                userId,
                newForm,
                function(form) {
                    $scope.forms.push(form);
                    console.log($scope.forms);
                })
        }

        function updateForm() {
            var newForm = {};
            newForm.formName = $scope.newFormName;
            FormService.updateFormById(
                $scope.selectedForm.id,
                newForm,
                function(form) {
                    //console.log($scope.forms);
                }
            )
        }

        function deleteForm(index) {
            FormService.deleteFormById(
                $scope.forms[index].id,
                function(forms) {
                    $scope.forms.splice(index, 1);
                    console.log($scope.forms);
                }
            )
        }

        function selectForm(index) {
            $scope.selectedForm = $scope.forms[index];
            $scope.newFormName = $scope.selectedForm.formName;
        }

    }
})();