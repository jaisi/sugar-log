"use strict";

app.controller('EditNumberCtrl', function ($scope, DataFactory, $routeParams, $location, $window){

	$scope.bg = {
		mydate:"",
		breakfast:"",
		lunch:"",
		dinner:"",
		bedtime:"",
		other:""
	};

	DataFactory.getNumber($routeParams.id)
	.then((data) => {
		$scope.bg = data;
		$scope.bg.id = $routeParams.id;
		$scope.bg.mydate = new Date($scope.bg.mydate); 
		console.log("$scope.bg.mydate in EditNumberCtrl", $scope.bg.mydate);
	});

	$scope.submitNumber = function () {
		console.log("submit button was clicked", $scope.bg);
   		DataFactory.editNumber($routeParams.id, $scope.bg)
   		.then((data) => {
   			$location.path("/all");
   		});
  };

});