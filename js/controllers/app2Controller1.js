'use strict'

angular.module('app2').controller('controller1', ['$scope', Controller1]);

function Controller1(scope)
{
	scope.name = "App 2 - Controller 1";

}