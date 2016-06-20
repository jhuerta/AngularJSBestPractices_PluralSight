'use strict'

var scopeApp = angular.module('scopeApp', []);

/* */
scopeApp.controller('parentController', ['$scope', ParentController]);
scopeApp.controller('childController', ['$scope', ChildController]);

function ParentController(scope) {
    scope.parent = "This is from the parent";
    scope.obj = {InheritedDirectiveTitle: 'blank'};
    scope.ParentAction = function()
    {
        scope.parent = scope.child;
    };
}

function ChildController(scope) {
	scope.ChildAction = function()
	{
        console.log(scope.child);
		console.log(scope.parent);
		scope.parent = scope.child;
	};
}


scopeApp.directive('sharedScopeDirective', SharedScopeDirective);

function SharedScopeDirective() {
    return {
        restrict: 'E',
        replace: true,
        template: '<div>Shared Scope. Variable: {{parent}} <br/> Inner Variable: {{SharedDirectiveTitle}}</div>',
        controller: function($scope)
        {
            $scope.parent = 'change from shared';
        },
        link: function($scope)
        {
            $scope.SharedDirectiveTitle = 'Title from shared directive';
        }
    };
}

scopeApp.directive('inheritedScopeDirective', InheritedScopeDirective);

function InheritedScopeDirective() {
    return {
        restrict: 'E',
        replace: true,
        template: '<div>Inherited Scope. Variable: {{parent}} <br/> Inner Variable: {{obj.InheritedDirectiveTitle}}</div>',
        scope: true,
        controller: function($scope)
        {
            $scope.parent = 'change from inherited';
        },
        link: function($scope)
        {
            $scope.obj.InheritedDirectiveTitle = 'Title from inherited directive';
        }
    };
}

scopeApp.directive('isolatedScopeDirective', IsolatedScopeDirective);

function IsolatedScopeDirective() {
    return {
        restrict: 'E',
        replace: true,
        template: '<div>Isolated Scope. Variable: {{parent}} <br/> Inner Variable: {{IsolatedDirectiveTitle}}</div>',
        scope: {
            parent: '='
        },
        controller: function($scope)
        {
            $scope.parent = 'change from isolated';
        },
        link: function($scope)
        {
            $scope.IsolatedDirectiveTitle = 'Title from isolated directive';
        }
    };
}