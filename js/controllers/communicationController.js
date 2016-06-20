'use strict'

var communicationApp = angular.module('communicationApp', ['toaster', 'ngAnimate']);

communicationApp.controller('parentController', ['$scope', 'toaster', 'names',ParentController]);

communicationApp.value('names', {
    objects: [],
    addObject: function(obj) {
        for (var i = 0; i < this.objects.length; i++) {
            if (this.objects[i] === obj) {
                return;
            }
        }
        this.objects.push(obj);
    },
    dropClass: function(obj) {
        for (var i = 0; i < this.objects.length; i++) {
            if (this.objects[i] === obj) {
                this.objects.splice(i, i);
            }
        }
    }
});

function ParentController(scope, toaster, names) {
    /*scope.Names = names.objects;
    scope.ParentAdd = function(name) {
        scope.Names.push(name);
    };

    scope.ParentNotify = function(msg) {
        toaster.success(msg);
    };*/
}

communicationApp.factory('parentAdder', function(names, toaster) {
    return {
        ParentAdd: function(msg) {
            names.addObject(msg);
            toaster.success('parentAdder: ' + msg);
        }
    }
});


communicationApp.factory('parentNotifier', function(toaster) {
    return {
        ParentNotify: function(msg) {
            toaster.success('parentNotifier: ' + msg);
        }
    }
});

communicationApp.controller('childController1', ['$scope', 'parentAdder', 'parentNotifier', ChildController1]);

function ChildController1(scope, parentAdder, parentNotifier) {
    scope.AddNewName = function(name) {
        parentAdder.ParentAdd(name);
        parentNotifier.ParentNotify(name);
    };

}

communicationApp.controller('childController2', ['$scope','names',ChildController2]);

function ChildController2(scope,names) {
    scope.Names = names.objects;
    scope.Child2Names = [];
    scope.$watchCollection('Names', function(newCol, oldCol, scope) {
        scope.Child2Names = [];
        for (var index in newCol) {
            scope.Child2Names.push(index + '. ' + newCol[index]);
        }
    });


}