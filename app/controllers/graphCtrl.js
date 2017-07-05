"use strict";

app.controller("GraphCtrl", function ($scope, DataFactory) {
	$scope.getNumberList = function (dt,meal) {
				DataFactory.getNumbers()
	    		.then( (numbers) => {
            $scope.filtered = $scope.myfilter(numbers,dt,meal);
		    		//$scope.numbers = numbers;
            numbers = $scope.filtered;
            console.log("numbers after filtering",numbers);
		    		$scope.averages = $scope.getAverages(numbers);
            if (!$scope.showline){
  		    		console.log("numbers", $scope.numbers, $scope.showline);
  		    		console.log("averages", $scope.averages);
  		    		$scope.labels = ['Breakfast', 'Lunch', 'Dinner', 'Bedtime', 'Other'];
  	  				//$scope.series = ['Series A', 'Series B'];
  	   				$scope.data = [
  	    							[$scope.breakfastAverage, $scope.lunchAverage, $scope.dinnerAverage, $scope.bedtimeAverage, $scope.otherAverage]
  	 					 		  ];
            } else {
                        console.log("$scope.showline", $scope.showline,$scope.filtered);
                        $scope.labels = [];
                        //$scope.series = ['Breakfast', 'Lunch', 'Dinner', 'Bedtime', 'Other'];
                        $scope.data = [];
                        $scope.breakfast = [];
                        $scope.lunch = [];
                        $scope.dinner = [];
                        $scope.bedtime = [];
                        $scope.other = [];
                        $scope.mydate = [];
                        
                        for(let x in numbers){
                          $scope.breakfast.push(numbers[x].breakfast);
                          $scope.lunch.push(numbers[x].lunch);
                          $scope.dinner.push(numbers[x].dinner);
                          $scope.bedtime.push(numbers[x].bedtime);
                          $scope.other.push(numbers[x].other); 
                          numbers[x].mydate = new Date(numbers[x].mydate);
                          numbers[x].mydate =  numbers[x].mydate.toDateString();
                          $scope.mydate.push(numbers[x].mydate); 
                          $scope.labels.push(numbers[x].mydate);  
                        }
                        console.log("$scope.labels",$scope.labels);
                        /*$scope.labels.sort(function(a,b){
                          return new Date(a) - new Date(b);
                        });*/
                       if(meal === "breakfast"){
                          $scope.series = ['Breakfast'];
                          $scope.data.push($scope.breakfast);
                         /* $scope.labels.sort(function(a,b){
                            return new Date(a) - new Date(b);
                          });*/
                       }
                        if(meal === "lunch"){
                          $scope.series = ['Lunch'];
                          $scope.data.push($scope.lunch);
                          /*$scope.labels.sort(function(a,b){
                            return new Date(a) - new Date(b);
                          });*/
                        }
                        if(meal === "dinner"){
                          $scope.series = ['Dinner'];
                          $scope.data.push($scope.dinner);
                          /*$scope.labels.sort(function(a,b){
                            return new Date(a) - new Date(b);
                          });*/
                        }
                        if(meal === "bedtime"){
                          $scope.series = ['Bedtime'];
                          $scope.data.push($scope.bedtime);
                          /*$scope.labels.sort(function(a,b){
                            return new Date(a) - new Date(b);
                          });*/
                        }
                        if(meal === "other"){
                          $scope.series = ['Other'];
                          $scope.data.push($scope.other);
                          /*$scope.labels.sort(function(a,b){
                            return new Date(a) - new Date(b);
                          });*/
                        }
                        if (meal === "all"){
                          $scope.series = ['Breakfast', 'Lunch', 'Dinner', 'Bedtime', 'Other'];
                          $scope.data.push($scope.breakfast,$scope.lunch,$scope.dinner,$scope.bedtime,$scope.other);
                          /*$scope.labels.sort(function(a,b){
                            return new Date(a) - new Date(b);
                          });*/
                        }
                        console.log("$scope.data",$scope.data);
                       
                        
                        $scope.onClick = function (points, evt) {
                          console.log(points, evt);
                        };
                        $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }];
                        $scope.options = {
                          scales: {
                            yAxes: [
                              {
                                id: 'y-axis-1',
                                type: 'linear',
                                display: true,
                                position: 'left'
                              }
                            ]
                          }
                        };
                  }
		    	});
	    	};
  
    $scope.myfilter = function(numbers,dt,meal){

      //numbers is an array of objects
      console.log("numbers",numbers);
      var today = new Date() ;
        var test = new Date();
        var thirty = new Date(test.setDate(test.getDate() - 30));
        var sixty = new Date(test.setDate(test.getDate() - 60));
        var ninety = new Date(test.setDate(test.getDate() - 90));
      $scope.filtered = [];
      $scope.newObj = {
            mydate:"",
            breakfast:"",
            lunch:"",
            dinner:"",
            bedtime:"",
            other:""
      };
      for(let x in numbers){
        numbers[x].mydate = new Date(numbers[x].mydate); 
        $scope.newObj = {
            mydate:numbers[x].mydate,
            breakfast:numbers[x].breakfast,
            lunch:numbers[x].lunch,
            dinner:numbers[x].dinner,
            bedtime:numbers[x].bedtime,
            other:numbers[x].other
        };
        console.log("numbers[x].breakfast",numbers[x].breakfast, "newObj", $scope.newObj);
        if(dt === "all")
          $scope.filtered.push($scope.newObj);
        else if(dt == 30 && numbers[x].mydate > thirty){
          console.log("thirty");
          $scope.filtered.push($scope.newObj);
        }else if(dt == 60 && numbers[x].mydate > sixty){
          $scope.filtered.push($scope.newObj);
        }else if(dt == 90 && numbers[x].mydate > ninety){
          $scope.filtered.push($scope.newObj);
        }
      }
      console.log("$scope.filtered",$scope.filtered);
      return $scope.filtered;

    };
	

   var getAvg = function(num){
        var sum = num.reduce(function(acc, val) {
            return acc + val;
      }, 0);
        var avg = sum/num.length;
        avg = avg.toFixed(0);
        //console.log("num sum",num,sum,avg);
        return avg;
    
    };

    //function to calculate averages and A1c
    $scope.getAverages = function(numbers){
      //console.log("numbers in getAverages", numbers);
      $scope.showA1c = true;
      //console.log("showA1c", $scope.showA1c);
      $scope.breakfastAverage = 0;
      $scope.lunchAverage = 0;
      $scope.dinnerAverage = 0;
      $scope.bedtimeAverage = 0;
      $scope.otherAverage = 0;
      $scope.average = 0;
      $scope.A1c = 0;
      let breakfast = [], lunch = [], dinner = [], bedtime = [], other = [], average = [];
      for(let x in numbers){
        if (numbers[x].breakfast !== ""){
          breakfast.push(parseInt(numbers[x].breakfast,10));
        }
        if (numbers[x].lunch !== ""){
          lunch.push(parseInt(numbers[x].lunch,10));
        }
        if(numbers[x].dinner !== ""){
          dinner.push(parseInt(numbers[x].dinner,10));
        }
        if (numbers[x].bedtime !== ""){
         bedtime.push(parseInt(numbers[x].bedtime,10));
        }
        if (numbers[x].other !== ""){
          other.push(parseInt(numbers[x].other,10));
        }
        
      }
      $scope.breakfastAverage = !isNaN(getAvg(breakfast))?getAvg(breakfast):null;
      $scope.lunchAverage = !isNaN(getAvg(lunch))?getAvg(lunch):null;
      $scope.dinnerAverage = !isNaN(getAvg(dinner))?getAvg(dinner):null;
      $scope.bedtimeAverage = !isNaN(getAvg(bedtime))?getAvg(bedtime):null;
      $scope.otherAverage = !isNaN(getAvg(other))?getAvg(other):null;
      average.push(parseInt($scope.breakfastAverage),parseInt($scope.lunchAverage),parseInt($scope.dinnerAverage),parseInt($scope.bedtimeAverage),parseInt($scope.otherAverage));
      //console.log("average", average,$scope.breakfastAverage );
      $scope.average = !isNaN(getAvg(average))?getAvg(average):null;
      $scope.A1c = (46.7 + parseInt($scope.average)) / 28.7;
      $scope.A1c = $scope.A1c.toFixed(2);   
      $scope.A1c = !isNaN($scope.A1c)?$scope.A1c:null;       
    };
   


  //forgot why i am doing this
	$scope.getNumberList("all","all"); 

  //function to choose between showing line or bar graph
  $scope.dothis = function(value1,value2,value3){
    console.log("within dothis function", value3);
    $scope.showline = false;
    if(value3 === "line"){
      console.log("value is line");
      $scope.showline = true;
      $scope.getNumberList(value1,value2); 
      
    }else{
        $scope.showline = false;
        $scope.getNumberList(value1,value2); 
    }
    console.log("showline", $scope.showline);
  };

  });
       

