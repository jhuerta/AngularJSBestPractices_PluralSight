'use strict'

var directiveApp = angular.module('directiveApp', []);

/* */
directiveApp.controller('directiveController', ['$scope', DirectiveController]);

function DirectiveController(scope) {
    scope.name = "App 1";
    scope.varInController = "Var in controller";
}

directiveApp.directive('myDirective', MyDirective);

function MyDirective() {
    return {
        restrict: 'E',
        replace: true,
        template: '<div>This is my directive</div>'
    };
}

directiveApp.directive('span', Div);

function Div() {
    return {
        restrict: 'E',
        replace: true,
        template: '<div>This is a span direction</div>'
    };
}

directiveApp.directive('encapsulatedHelloWorld', EncapsulatedHelloWorld);

function EncapsulatedHelloWorld() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: '/js/templates/encapsualatedTemplate.html'
    };
}

var controllerDefinedArray = ['$scope', controllerFunction];

function controllerFunction(thisIsTheScope) {
    thisIsTheScope.varInController = 'var in directive replacing var in controller';
    thisIsTheScope.doSomething = function(nm) {
        console.log('The log: ' + nm);
    };
}

directiveApp.controller('controllerDefined', controllerDefinedArray);

directiveApp.directive('directiveWithFunctionality', DirectiveWithFunctionality);

function DirectiveWithFunctionality() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: '/js/templates/directiveWithFunctionality.html',
        //link: controllerFunction
        controller: 'controllerDefined'
    };
}

