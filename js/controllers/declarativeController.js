'use strict'

var declarativeApp = angular.module('declarativeApp', []);

/* */
declarativeApp.controller('declarativeController', ['$scope', DeclarativeController]);

function DeclarativeController(scope)
{
	scope.ItWorks = 'It works!';

	scope.student = {
		Name: 'Juan',
		Course: 'AngularJs'
	};

	scope.edit = function(){
		scope.editing = true;
	};
	scope.save = function(){
		scope.editing = false;
	};
}


declarativeApp.controller('imperativeController', ['$scope', ImperativeController]);

function ImperativeController(scope)
{
	scope.ItWorks = 'It works!';

	scope.student = {
		Name: 'Juan',
		Course: 'AngularJs'
	};

	scope.edit = function(){
		scope.editing = true;
	};
	scope.save = function(){
		scope.editing = false;
	};
}