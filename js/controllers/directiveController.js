'use strict'

var directiveApp = angular.module('directiveApp', []);

/* */
directiveApp.controller('directiveController', ['$scope', DirectiveController]);

function DirectiveController(scope) {
    scope.name = "App 1";
    scope.ctrlVariable = '10';
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


directiveApp.directive('parentDirective', ParentDirective);

function ParentDirective() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: '/js/templates/parentDirective.html',
        controller: function($scope)
        {
        	$scope.count = 0;
        	this.IncreaseCount = function()
        	{
        		return $scope.count++;
        	};
        }
    };
}

directiveApp.directive('brotherDirective', BrotherDirective);

function BrotherDirective() {
    return {
        restrict: 'AE',
        //require: 'childDirective',
        controller: function($scope)
        {
        	var brotherCount = 0;
        	this.IncreaseBrother = function()
        	{
        		var value = brotherCount++;
        		$scope.fromBrother = value;
        		return value;
        	};
        	
        }
    };
}


directiveApp.directive('childDirective', ChildDirectve);

function ChildDirectve() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: '/js/templates/childDirective.html',
        require:['^parentDirective','brotherDirective'],
		link: function(scope,element,attrs,ctrl)
        {
        	scope.fromBrother = 0;
        	scope.increaseParent = function()
        	{
        		var newValue = ctrl[0].IncreaseCount();
        		element.css('color',newValue);
        	};

        	scope.increaseBrother = function()
        	{
        		var newValue = ctrl[1].IncreaseBrother();
        		console.log(newValue);
        		element.css('color',newValue);
        	};
        }
    };
}

directiveApp.directive('dirIsolatedScope', DirIsolatedScope);

function DirIsolatedScope()
{
    return {
        restrict:'E',
        replace: true,
        template:   '<div>'+
                        '<button ng-click="increase()"> Increase</button>'+
                        '<div>The Object: {{theobject}}</div>'+
                        '<div>Val: {{val}}</div>'+
                    '</div>',
        scope:{
            val: '='
        },
        controller: function($scope)
        {
            $scope.increase = function()
            {
                $scope.theobject = $scope.val++;
            };
            
        }

    };
}


directiveApp.directive('commentDirective', CommentDirective);

function CommentDirective()
{
    return {
        restrict:'M',
        replace: true,
        template:   '<span>--------------------- I am a comment comming from a directive!!! -----------------------</span>'
    };
}