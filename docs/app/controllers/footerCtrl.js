"use strict";

app.controller('FooterCtrl', function ($scope, AuthFactory, $window, DataFactory) {
  
  // Log Button Function
  $scope.today = new Date();
  $scope.isLoggedIn = false;
  //$scope.searchText = SearchTermData;

  $scope.getQuote = function () {
	    // get the list
	    DataFactory.getQuote()
	    .then( (quote) => {
	    	console.log("quote after then", quote.contents.quotes[0].quote);
	    	$scope.quote = quote.contents.quotes[0].quote;
	    	console.log("$scope.quote", $scope.quote);
        	
	    });
  	};
console.log("$scope.quote", $scope.quote);

 
 //$scope.getQuote(); 
});