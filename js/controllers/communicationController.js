'use strict'

var communicationApp = angular.module('communicationApp', ['toaster','ngAnimate']);

communicationApp.controller('parentController', ['$scope', 'toaster',ParentController]);

function ParentController(scope,toaster) {
    scope.Names = [];
    scope.Names.push('Juan', 'Hasmin');

    scope.ParentAdd = function(name) {
        scope.Names.push(name);
    };

    scope.ParentNotify = function(msg) {
        toaster.success(msg);
    };
}

communicationApp.controller('childController1', ['$scope', ChildController1]);

function ChildController1(scope) {
    scope.AddNewName = function(name)
    {
    	scope.ParentAdd(name);
    	scope.ParentNotify('Name has been added: ' + name);
    };

}

communicationApp.controller('childController2', ['$scope', ChildController2]);

function ChildController2(scope) {
	scope.Child2Names = [];
    scope.$watchCollection('Names', function(newCol, oldCol, scope) {
    	scope.Child2Names = [];
        for (var index in newCol) {
        	scope.Child2Names.push(index + '. ' + newCol[index]);
        }
    });


}