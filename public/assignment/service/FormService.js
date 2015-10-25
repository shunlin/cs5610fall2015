(function(){
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService() {
        var forms = [
            {username: "Tom", password: "123456", id: 1},
            {username: "Mike", password: "123456", id: 2},
            {username: "Jack", password: "654321", id: 3},
            {username: "Tom", password: "234567", id: 4},
        ];

        var service = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById,
        };
        return service;

        function createFormForUser(userId, form, callback) {
            form.id = createGuid();
            form.userId = userId;
            forms.push(form);
            callback(form);
        }

        function findAllFormsForUser(userId, callback) {
            var result = [];
            for (var form in forms) {
                if (form.userId === userId) result.push(form);
            }
            callback(result);
        }


        function deleteFormById(formId, callback) {
            for (var i = 0, len = forms.length; i < len; i++) {
                if (forms[i].id === formId) forms.splice(i, 1);
            }
            callback(forms);
        }

        function updateFormById(formId, newForm, callback) {
            for (var i in forms) {
                if (forms[i].id === formId) {
                    forms[i].name = newForm.name;
                    callback(forms[i]);
                }
            }
        }

        // Reference to http://byronsalau.com/blog/how-to-create-a-guid-uuid-in-javascript/
        function createGuid() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
                return v.toString(16);
            });
        }
    }
})();