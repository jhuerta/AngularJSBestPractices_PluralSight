'use strict'

var app = angular.module('servicesApp', []);

/* ------------------------------------------------------------ */
function factoryMethod()  {
    return {
        Value: 'Factory method value' 
    };
}

var serviceMethod = function()
{
	this.Value =  'Service method value';
};


var valueMethod = function() {
    return {
        Value: 'Value service value'
    };
};

/* ------------------------------------------------------------ */

app.value('valueService', valueMethod());

app.service('serviceWithServiceMethod', serviceMethod);
app.service('serviceWithFactoryMethod', factoryMethod);
app.factory('factoryWithFactoryMethod', factoryMethod);
app.factory('factoryWithServiceMethod', factoryMethod);

/* ------------------------------------------------------------ */

app.controller('servicesController', ['$scope', 'valueService', 'serviceWithServiceMethod', 'serviceWithFactoryMethod','factoryWithFactoryMethod', 'factoryWithServiceMethod', 'providerService','ratingFilter','formerRatingFilter',ServicesController]);

/* ------------------------------------------------------------ */

app.config(['$provide',provider]);

/* Service as a filter */
/* This filter can be injected in a controller by just using the name 'filterName + Filter' as the name in dependencies*/
app.filter('rating', Rating);
function Rating()
{
	return  RatingFunction;

	function RatingFunction(input)
	{
		var rating = parseInt(input);
		var result = '';
		for(var i=0;i< rating;i++)
		{
			result +='*';
		}
		return result;
	}
}

/*This factory is the same filter as abover, appending the name Filter to the factory name,therefore, a filter can easily be converted into a factory*/
app.factory('formerRatingFilter', RatingFilterFactory);
function RatingFilterFactory()
{
	return  RatingFunction;

	function RatingFunction(input)
	{
		var rating = parseInt(input);
		var result = '';
		for(var i=0;i< rating;i++)
		{
			result +='*';
		}
		return result;
	}
}


function provider(provide)
{
	provide.provider('providerService', ProviderService);

	function ProviderService()
	{
		var configValue;
		return {
			setConfigValue: function(value){
				configValue = value;
			},
			$get: Get
		};

		function Get()
		{
			return {Value: 'Value from Provider of type: ' + configValue};
		}
	}
}

app.config(function(providerServiceProvider)
{
	providerServiceProvider.setConfigValue("New settings config value");

});

function ServicesController(scope, valService, serviceWithServiceMethod, serviceWithFactoryMethod,factoryWithFactoryMethod, factoryWithServiceMethod, providerService, rating,formerRatingFilter) {
    scope.valueServicename = valService.Value;

    scope.serviceWithServiceMethodValue = serviceWithServiceMethod.Value;
    scope.serviceWithFactoryMethodValue = serviceWithFactoryMethod.Value;

	scope.factoryWithFactoryMethodValue = factoryWithFactoryMethod.Value;
    scope.serviceServicenameB = "not possible";
	scope.providerServiceValue = providerService.Value;
	

	scope.representFilter = function()
	{
		scope.usingRatingAsFilter = rating(scope.inputFilter);
		scope.usingFormerFilterAsFactory = formerRatingFilter(scope.inputFilter);
	};

}