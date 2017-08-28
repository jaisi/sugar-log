"use strict";
//require('angular-ui-bootstrap');
//require('angular-bootstrap-confirm');

const app = angular.module('SugarLogApp', ["ngRoute", "ui.bootstrap", "chart.js", "ngPrint", "htmlToPdfSave"])
				   .directive('numbersOnly', numbersOnly);


let isAuth = (AuthFactory) => new Promise((resolve,reject) => {
	AuthFactory.isAuthenticated()
	.then((userExists) => {
		if(userExists){
			console.log("authenticated go ahead");
			resolve();
		}else {
			console.log("authenticated reject GO away");
			reject();
		}
	});
});

numbersOnly.$inject = [];

      function numbersOnly() {

          var directive = {
              restrict: 'A',
              require: 'ngModel',
              link: function (scope, element, attr, ngModelCtrl) {
                  function fromUser(text) {
                      if (text) {
                          var transformedInput = text.replace(/[^0-9-]/g, '');
                          if (transformedInput !== text) {
                              ngModelCtrl.$setViewValue(transformedInput);
                              ngModelCtrl.$render();
                          }
                          return transformedInput;
                      }
                      return undefined;
                  }
                  ngModelCtrl.$parsers.push(fromUser);
              }
          };
          return directive;
      }


app.config(($routeProvider) => {
	$routeProvider
	.when('/', {
		templateUrl:'partials/numberForm.html',
		controller: 'NumberCtrl',
		resolve: {isAuth}
	})
	.when('/login', {
		templateUrl: 'partials/auth.html',
		controller: 'AuthCtrl'
	})
	.when('/logout', {
		templateUrl: 'partials/auth.html',
		controller: 'AuthCtrl'
	})
	.when('/all', {
		templateUrl:'partials/numberList.html',
		controller:'NumberListCtrl',
		resolve: {isAuth}
	})
	.when('/:id/edit', {
		templateUrl:'partials/numberForm.html',
		controller:'EditNumberCtrl',
		resolve: {isAuth}
	})
	.when('/graphs', {
		templateUrl:'partials/graph.html',
		controller:'GraphCtrl'
	})
	.otherwise('/');

});

app.run(($location, FBCreds) => {
	let creds = FBCreds;
	let authConfig = {
		apiKey: creds.apiKey,
		authDomain: creds.authDomain,
		databaseURL: creds.databaseURL
	};

	firebase.initializeApp(authConfig);
});
