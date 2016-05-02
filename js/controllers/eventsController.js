'use strict'

var eventsApp = angular.module('eventsApp', ['toaster', 'ngAnimate']);

eventsApp.controller('parentEventController', ['$scope', '$rootScope',ParentEventController]);

function ParentEventController(scope, rootScope) {


    scope.ParentAdd = function(name) {
        rootScope.$broadcast('nameAdded',name);
    };

    scope.ParentNotify = function(msg) {
        rootScope.$broadcast('notifyMessage',msg);
    };
}

eventsApp.controller('childEventController1', ['$scope', ChildEventController1]);

function ChildEventController1(scope) {
    scope.AddNewName = function(name) {
        scope.ParentAdd(name);
        scope.ParentNotify('Name has been added: ' + name);
    };

}

eventsApp.controller('childEventController2', ['$scope', 'toaster',ChildEventController2]);

function ChildEventController2(scope,toaster) {
    scope.Names = [];
    scope.Names.push('Juan', 'Hasmin');
    UpdateNames(scope.Names);

    scope.$on('nameAdded', function(event, name) {
        scope.Names.push(name);
        UpdateNames(scope.Names);
    });


    scope.$on('notifyMessage', function(event, msg) {
        toaster.success(msg);
    });



    function UpdateNames(arrayOfNames)
    {
        scope.Child2Names = [];
        var i = 0;
        arrayOfNames.forEach(function(thisName) {
            i++;
            scope.Child2Names.push(i + '. ' + thisName);
        });
    }


}