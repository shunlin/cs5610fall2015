"use strict";

(function() {
   angular
       .module("MyBook")
       .controller("HeaderController", HeaderController);

    function HeaderController($scope, $location) {
        $scope.$location = $location;
    }
})();