'use strict'

var declarativeApp = angular.module('declarativeApp', []);

/* */
declarativeApp.controller('declarativeController', ['$scope', DeclarativeController]);

function DeclarativeController(scope) {
    scope.ItWorks = 'It works!';

    scope.student = {
        Name: 'Juan',
        Course: 'AngularJs'
    };

    scope.edit = function() {
        scope.editing = true;
    };
    scope.save = function() {
        scope.editing = false;
    };
}




declarativeApp.directive('afEditStudent', AFEditStudent);

function AFEditStudent() {
    return {
        restrict: 'E',
        replace: true,
        template: "<span ng-show='showThis'>" +
            "<div>Name:<input ng-model='student.Name'></div>" +
            "<div>Course:<input ng-model='student.Course'></div>" +
            "<button ng-click=saveMethod()>Save</button>" +
            "</span>",
        scope: {
            showThis: '=shows',
            student: '=',
            saveMethod: '=saveThisMethod'
        }
    };
}

declarativeApp.directive('afDisplayStudent', AFDisplayStudent);

function AFDisplayStudent() {
    return {
        restrict: 'M',
        replace: true,
        template: "<span><div>Name:<span ng-bind='student.Name'></span></div>" +
            "<div>Course:<span ng-bind='student.Course'></span></div></span>"
    };
}