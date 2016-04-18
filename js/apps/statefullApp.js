'use strict'

var app = angular.module('statefullApp', []);

/* ------------------------------------------------------------ */

app.value('statefulService',
{
	Values: [],
	AddValue: function(value)
	{
		this.Values.push(value);
	}
});

app.controller('controllerA',['$scope','statefulService', ControllerA]);

app.controller('controllerB',['$scope','statefulService', ControllerB]);

function ControllerA(scope,state)
{
	scope.Add = state.AddValue;
	scope.Values = state.Values;
}

function ControllerB(scope,state)
{
	scope.Values = state.Values;
}