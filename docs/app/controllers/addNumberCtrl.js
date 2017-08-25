"use strict";

app.controller('NumberCtrl', function($scope, DataFactory, AuthFactory, $location, $window, $routeParams,$timeout){
	let user = AuthFactory.getUser();
	console.log("user", user);
	$scope.bg = {
		mydate:"",
		breakfast:"",
		lunch:"",
		dinner:"",
		bedtime:"",
		other:"",
		uid:user
	};

	$scope.show = true;

	$scope.submitNumber = function () {
		console.log("submit button was clicked", $scope.bg);
   		DataFactory.addNumber($scope.bg)
   		.then((data) => {
   			$location.path("/all");
   		});
  };

  $scope.checkDate = function(dt){
  	$scope.closeAlert = function(index) {
    	$scope.alerts.splice(index, 1);
  	};
  	DataFactory.getNumbers()
	    .then( (numbers) => {
	    	for (let x in numbers){
	    			let mydt1 = new Date(numbers[x].mydate),
	    			    mydt2 = new Date(dt),
	    			    today = new Date();
	    			if(mydt1.getTime() === mydt2.getTime()){
	    				console.log("Date already entered", mydt1,mydt2);
	    				$scope.alerts = [
    						{ type: 'warning', msg: 'Date already entered! Pick another date.' }
  						];
	    				$scope.bg.mydate = null;
	    			}
	    			if(mydt2.getTime() > today.getTime()){
	    				console.log("date and today", mydt2,today);
	    				$scope.alerts = [
    						{ type: 'warning', msg: 'Please enter a date less than or equal to today.' }
  						];
  						$scope.bg.mydate = null;
	    			}
	    		
	    	}
	    });
  };


});