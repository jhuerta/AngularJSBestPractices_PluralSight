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

app.value('calculateValue',
	function(input)
	{
		return input + ' is calculated';
	});

app.controller('controllerA',['$scope','statefulService','calculateValue',ControllerA]);

app.controller('controllerB',['$scope','statefulService', ControllerB]);

function ControllerA(scope,state, calculatevalue)
{
	scope.Calculatedvalue = calculatevalue(456456);
	scope.Add = state.AddValue;
	scope.Values = state.Values;
}

function ControllerB(scope,state)
{
	scope.Values = state.Values;
}


