"use strict";

app.controller('NavCtrl', function ($scope, AuthFactory, $window, DataFactory, $rootScope) {
  
  // Log Button Function
  $scope.today = new Date();
  $scope.isLoggedIn = false;
  //$scope.searchText = SearchTermData;

  //change color scheme of app
  $rootScope.toggle = function(){
 	$rootScope.makeDark = !$rootScope.makeDark;
  };

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      $scope.isLoggedIn = true;
      $scope.name = user.displayName;
      //console.log("currentUser IS logged in", user, $scope.name, $scope.isLoggedIn);
      $scope.$apply();
    } else {
      $scope.isLoggedIn = false;
      //console.log("currentUser IS NOT logged in", $scope.isLoggedIn);
      $window.location.href = "#!/login";
    }
  });

});