"use strict";

(function() {
    angular
        .module("FormBuilderApp")
        .controller("SidebarController", SidebarController);

    function SidebarController($location) {
        var model = this;
        model.$location = $location;
    }
})();