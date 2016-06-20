'use strict'

function SimpleService() {
    return {
        FromService: 'This comes from service'
    };
}

var app = angular.module('minifyApp', []);

app.service('simpleService', SimpleService);

//app.controller('minificationController', ['$scope', 'simpleService', MinificationController]);
//app.controller('minificationController', MinificationController);

function minificationController($scope, simpleService) {
    $scope.name = simpleService.FromService;
}


