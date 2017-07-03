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
                        console.log("$scope.showline", $scope.showline);
                        $scope.labels = [];
                        $scope.series = ['Breakfast', 'Lunch', 'Dinner', 'Bedtime', 'Other'];
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
                        $scope.labels.sort(function(a,b){
                          return new Date(a) - new Date(b);
                        });
                        $scope.data.push($scope.breakfast);
                        $scope.data.push($scope.lunch);
                        $scope.data.push($scope.dinner);
                        $scope.data.push($scope.bedtime);
                        $scope.data.push($scope.other);
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
    console.log("numbers,dt,meal",numbers,dt,meal);
    //numbers.mydate = new Date(numbers.mydate); 
        var today = new Date() ;
        var test = new Date();
        var thirty = new Date(test.setDate(test.getDate() - 30));
        var sixty = new Date(test.setDate(test.getDate() - 60));
        var ninety = new Date(test.setDate(test.getDate() - 90));
        $scope.filtered = [];
        for (let x in numbers){
          numbers[x].mydate = new Date(numbers[x].mydate); 
          //console.log("dt,meal",dt,meal);
          if(dt === "all"){
            if(meal === "all") {
              $scope.filtered = numbers;
              //console.log("i am here");
            }
            if(meal === "breakfast"){
                $scope.filtered.push(numbers[x].breakfast,numbers[x].mydate); 
            } else if(meal === "lunch"){
                $scope.filtered.push(numbers[x].lunch,numbers[x].mydate);
            } else if (meal==="dinner"){
                $scope.filtered.push(numbers[x].dinner,numbers[x].mydate);
            }else if (meal==="bedtime"){
                $scope.filtered.push(numbers[x].bedtime,numbers[x].mydate);
            }else if(meal ==="other"){
                $scope.filtered.push(numbers[x].other,numbers[x].mydate);
            }
          }else if(dt == 30 && numbers[x].mydate > thirty){
            if(meal === "all"){
              $scope.filtered.push(numbers[x]);
            }else if (meal === "breakfast"){
              $scope.filtered.push(numbers[x].breakfast,numbers[x].mydate);
            }else if(meal === "lunch"){
              $scope.filtered.push(numbers[x].lunch,numbers[x].mydate);
            }else if(meal === "dinner"){
              $scope.filtered.push(numbers[x].dinner,numbers[x].mydate);
            }else if(meal === "bedtime"){
              $scope.filtered.push(numbers[x].bedtime,numbers[x].mydate);
            }else if(meal === "other"){
              $scope.filtered.push(numbers[x].other,numbers[x].mydate);
            }

          }else if(dt == 60 && numbers[x].mydate > sixty){
            if(meal === "all"){
              $scope.filtered.push(numbers[x]);
            }else if (meal === "breakfast"){
              $scope.filtered.push(numbers[x].breakfast,numbers[x].mydate);
            }else if(meal === "lunch"){
              $scope.filtered.push(numbers[x].lunch,numbers[x].mydate);
            }else if(meal === "dinner"){
              $scope.filtered.push(numbers[x].dinner,numbers[x].mydate);
            }else if(meal === "bedtime"){
              $scope.filtered.push(numbers[x].bedtime,numbers[x].mydate);
            }else if(meal === "other"){
              $scope.filtered.push(numbers[x].other,numbers[x].mydate);
            }

          }else if(dt == 90 && numbers[x].mydate > ninety){
            if(meal === "all"){
              $scope.filtered.push(numbers[x]);
            }else if (meal === "breakfast"){
              $scope.filtered.push(numbers[x].breakfast,numbers[x].mydate);
            }else if(meal === "lunch"){
              $scope.filtered.push(numbers[x].lunch,numbers[x].mydate);
            }else if(meal === "dinner"){
              $scope.filtered.push(numbers[x].dinner,numbers[x].mydate);
            }else if(meal === "bedtime"){
              $scope.filtered.push(numbers[x].bedtime,numbers[x].mydate);
            }else if(meal === "other"){
              $scope.filtered.push(numbers[x].other,numbers[x].mydate);
            }

          }
        }
        console.log("$scope.filtered",$scope.filtered);
        return $scope.filtered;


   };

   //function to calculate averages and A1c
    $scope.getAverages = function(numbers){
      var showA1c = !showA1c;
      $scope.breakfastAverage = 0;
      $scope.lunchAverage = 0;
      $scope.dinnerAverage = 0;
      $scope.bedtimeAverage = 0;
      $scope.otherAverage = 0;
      $scope.average = 0;
      $scope.A1c = 0;
      
      //console.log("numbers.length", numbers.length);
      let mybreakfast = [], mylunch =[], mydinner = [], mybedtime = [], myother = [], 

      length = numbers.length,
          breakfastLength = numbers.length,
          lunchLength = numbers.length,
          dinnerLength = numbers.length,
          bedtimeLength = numbers.length,
          othersLength = numbers.length;
      //console.log("length before for", length);
      for(let x in numbers){
        mybreakfast.push(numbers[x].breakfast);
        //console.log("numbers[x].breakfast", numbers[x].breakfast);
         //console.log("numbers[x].other", numbers[x].other);
         if (numbers[x].breakfast === ""){
           breakfastLength--;
         }
         else {
            $scope.breakfastAverage += parseInt((numbers[x].breakfast),10);
          }
          if (numbers[x].lunch === ""){
           lunchLength--;
         }
         else {
            $scope.lunchAverage += parseInt((numbers[x].lunch),10);
          }
          if (numbers[x].dinner === ""){
           dinnerLength--;
         }
         else {
            $scope.dinnerAverage += parseInt((numbers[x].dinner),10);
          }
          if (numbers[x].bedtime === ""){
           bedtimeLength--;
         }
         else {
            $scope.bedtimeAverage += parseInt((numbers[x].bedtime),10);
          }
         if (numbers[x].other === ""){
           othersLength--;
         }
         else {
            $scope.otherAverage += parseInt((numbers[x].other),10);
          }
        
      }
      console.log("length", mybreakfast.length, breakfastLength);
      //console.log("length after for", length);
      //console.log("others length after for", othersLength, $scope.otherAverage);
      $scope.breakfastAverage = parseInt($scope.breakfastAverage/breakfastLength,10);
      $scope.lunchAverage = parseInt($scope.lunchAverage/lunchLength,10);
      $scope.dinnerAverage = parseInt($scope.dinnerAverage/dinnerLength,10);
      $scope.bedtimeAverage = parseInt($scope.bedtimeAverage/bedtimeLength,10);
      $scope.otherAverage = parseInt($scope.otherAverage/othersLength,10);
      $scope.average = parseInt(parseInt($scope.breakfastAverage) + parseInt($scope.lunchAverage)+ parseInt($scope.dinnerAverage)+ parseInt($scope.bedtimeAverage) + parseInt($scope.otherAverage))/5;
      $scope.A1c = (46.7 + $scope.average) / 28.7;
      $scope.A1c = $scope.A1c.toFixed(2);          
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
       

