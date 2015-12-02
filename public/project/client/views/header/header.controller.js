"use strict";

(function() {
   angular
       .module("MyBook")
       .controller("HeaderController", HeaderController);

    function HeaderController($location) {
        var model = this;
        model.$location = $location;
        model.search = search;

        function search() {
            $location.url("/search/" + model.keyword);
        }


    }
})();