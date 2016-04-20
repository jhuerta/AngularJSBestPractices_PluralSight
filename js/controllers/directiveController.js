'use strict'

var directiveApp = angular.module('directiveApp',[]);

directiveApp.controller('directiveController', ['$scope', DirectiveController]);

function DirectiveController(scope)
{
	scope.name = "App 1 - Controller 1";
}