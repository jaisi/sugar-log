"use strict";

app.controller('NavCtrl', function ($scope, AuthFactory, $window, DataFactory) {
  
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

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      $scope.isLoggedIn = true;
      $scope.name = user.displayName;
      console.log("currentUser IS logged in", user, $scope.name, $scope.isLoggedIn);
      $scope.$apply();
    } else {
      $scope.isLoggedIn = false;
      console.log("currentUser IS NOT logged in", $scope.isLoggedIn);
      $window.location.href = "#!/login";
    }
  });
 
 //$scope.getQuote(); 
});