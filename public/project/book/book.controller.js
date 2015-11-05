"use strict";

(function() {
   angular
       .module("MyBook")
       .controller("BookController", BookController);

    function BookController($scope, $location) {
        $scope.$location = $location;
    }
})();