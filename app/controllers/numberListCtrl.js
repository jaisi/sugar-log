"use strict";

app.controller('NumberListCtrl', function($scope, DataFactory, AuthFactory, $location, $timeout){
  let user = AuthFactory.getUser();
	$scope.getNumberList = function (user) {
	    // get the list
	    DataFactory.getNumbers()
	    .then( (numbers) => {
	    	$scope.numbers = numbers;
       // console.log("aj", $scope.aj);
	    	$scope.averages = $scope.getAverages(numbers);
	    	//console.log("numbers", $scope.numbers);
	    });
  	};

    
  	$scope.removeRecord = function (recordId){
  		DataFactory.deleteNumber(recordId)
  		.then((data)=>{
  			$scope.getNumberList();
        $timeout();
  		});

  	};

    $scope.sortType     = 'mydate'; // set the default sort type
    $scope.sortReverse  = false;  // set the default sort order
    $scope.show = false;

    var getAvg = function(num){
        var sum = num.reduce(function(acc, val) {
            return acc + val;
      }, 0);
        var avg = sum/num.length;
        avg = avg.toFixed(2);
        console.log("num sum",num,sum,avg);
        return avg;
    
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
      console.log("average", average,$scope.breakfastAverage );
      $scope.average = !isNaN(getAvg(average))?getAvg(average):null;
      $scope.A1c = (46.7 + parseInt($scope.average)) / 28.7;
      $scope.A1c = $scope.A1c.toFixed(2);   
      $scope.A1c = !isNaN($scope.A1c)?$scope.A1c:null;       
    };
   /*
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
      
      var sum = [0, 1, 2, 3].reduce(function(acc, val) {
            return acc + val;
      }, 0);
      // sum is 6
      console.log("sum", sum);
  		//console.log("numbers.length", numbers.length);
  		let length = numbers.length,
          breakfastLength = numbers.length,
          lunchLength = numbers.length,
          dinnerLength = numbers.length,
          bedtimeLength = numbers.length,
          othersLength = numbers.length;
      //console.log("length before for", length);
  		for(let x in numbers){
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
    */
    //filter function
  	$scope.myFilter = function(dt1, dt2, dt, prop, val){
  		console.log("within greaterThan function", $scope.aj);
  		console.log("dt and prop and val are", dt1, dt2, dt, prop, val);
  		return function(item){
        //console.log("aj within myFilter function", $scope.aj);
  			//console.log("item",item);
        $scope.mydt1 = dt1;
        $scope.mydt2 = dt2;
        $scope.mydt = dt;
        $scope.myprop = prop;
        $scope.myval = val;
        //console.log("typeof", typeof(item.mydate));
        item.mydate = new Date(item.mydate); 
        var today = new Date() ;
        var test = new Date();
        var thirty = new Date(test.setDate(test.getDate() - 30));
        var sixty = new Date(test.setDate(test.getDate() - 60));
        var ninety = new Date(test.setDate(test.getDate() - 90));
        //console.log("today 30 60 90", today, thirty, sixty, ninety);
        /*if(dt==30){
          console.log("dt is 30", typeof(item.mydate));
          return (item.mydate > thirty) ;
        }*/

        //custom date range starts
        if (dt1 !== undefined && dt2 !== undefined){
          $scope.show=false;
          dt1 = new Date(dt1);
          dt2 = new Date(dt2);
          console.log("dt1 and dt2 are set", dt1, dt2);
          return (item.mydate >= dt1 && item.mydate <= dt2);
        }
        //custom date range ends


  			if(dt === "all" && prop === "all" && val === "all"){
            $scope.show=true;
            console.log("all all all", $scope.show);
      			return item;
        }else $scope.show=false;
        console.log("$scope.show", $scope.show);
        //dt === all
        if (dt === "all"){
          if(prop === "all"){
            if(val === "70")
              return ((parseInt(item.breakfast) < val) && (parseInt(item.lunch) < val) && (parseInt(item.dinner) < val) && (parseInt(item.bedtime) < val));
            else
              return ((parseInt(item.breakfast) > val) && (parseInt(item.lunch) > val) && (parseInt(item.dinner) > val) && (parseInt(item.bedtime) > val));
          }else if (prop == "breakfast"){
              if (val === "all")
                 return item;
              else if(val === "70")
                return ((parseInt(item.breakfast) < val));
              else
                return ((parseInt(item.breakfast) > val));
          }else if (prop == "lunch"){
              if (val === "all")
                 return item;
              else if(val === "70")
                return ((parseInt(item.lunch) < val));
              else
                return ((parseInt(item.lunch) > val));
          }else if (prop == "dinner"){
              if (val === "all")
                 return item;
              else if(val === "70")
                return ((parseInt(item.dinner) < val));
              else
                return ((parseInt(item.dinner) > val));
          }else if (prop == "bedtime"){
              if (val === "all")
                 return item;
              else if(val === "70")
                return ((parseInt(item.bedtime) < val));
              else
                return ((parseInt(item.bedtime) > val));
          }

        }else if (dt == 30){
          //console.log("dt prop val in 30", dt, prop, val);
          if(prop === "all"){
            if (val === "all")
              return item.mydate > thirty;
            else if(val === "70")
              return ((parseInt(item.breakfast) < val) && (parseInt(item.lunch) < val) && (parseInt(item.dinner) < val) && (parseInt(item.bedtime) < val) && (item.mydate > thirty));
            else
              return ((parseInt(item.breakfast) > val) && (parseInt(item.lunch) > val) && (parseInt(item.dinner) > val) && (parseInt(item.bedtime) > val) && (item.mydate > thirty));
          }else if (prop == "breakfast"){
             //console.log("dt prop val in 30", dt, prop, val);
              if (val === "all")
                 return item.mydate > thirty;
              else if(val === "70")
                return ((parseInt(item.breakfast) < val) && (item.mydate > thirty));
              else
                return ((parseInt(item.breakfast) > val) && (item.mydate > thirty));
          }else if (prop == "lunch"){
              if (val === "all")
                 return item.mydate > thirty;
              else if(val === "70")
                return ((parseInt(item.lunch) < val) && (item.mydate > thirty));
              else
                return ((parseInt(item.lunch) > val) && (item.mydate > thirty));
          }else if (prop == "dinner"){
              if (val === "all")
                 return item.mydate > thirty;
              else if(val === "70")
                return ((parseInt(item.dinner) < val) && (item.mydate > thirty));
              else
                return ((parseInt(item.dinner) > val) && (item.mydate > thirty));
          }else if (prop == "bedtime"){
              if (val === "all")
                 return item.mydate > thirty;
              else if(val === "70")
                return ((parseInt(item.bedtime) < val) && (item.mydate > thirty));
              else
                return ((parseInt(item.bedtime) > val) && (item.mydate > thirty));
          }   
        }else if(dt == 60){
          if(prop === "all"){
              if (val === "all")
                return item.mydate > sixty;
              else if(val === "70")
                return ((parseInt(item.breakfast) < val) && (parseInt(item.lunch) < val) && (parseInt(item.dinner) < val) && (parseInt(item.bedtime) < val) && (item.mydate > sixty));
            else
              return ((parseInt(item.breakfast) > val) && (parseInt(item.lunch) > val) && (parseInt(item.dinner) > val) && (parseInt(item.bedtime) > val) && (item.mydate > sixty));
          }else if (prop == "breakfast"){
              if (val === "all")
                 return item.mydate > sixty;
              else if(val === "70")
                return ((parseInt(item.breakfast) < val) && (item.mydate > sixty));
              else
                return ((parseInt(item.breakfast) > val) && (item.mydate > sixty));
          }else if (prop == "lunch"){
              if (val === "all")
                 return item.mydate > sixty;
              else if(val === "70")
                return ((parseInt(item.lunch) < val) && (item.mydate > sixty));
              else
                return ((parseInt(item.lunch) > val) && (item.mydate > sixty));
          }else if (prop == "dinner"){
              if (val === "all")
                 return item.mydate > sixty;
              else if(val === "70")
                return ((parseInt(item.dinner) < val) && (item.mydate > sixty));
              else
                return ((parseInt(item.dinner) > val) && (item.mydate > sixty));
          }else if (prop == "bedtime"){
              if (val === "all")
                 return item.mydate > sixty;
              else if(val === "70")
                return ((parseInt(item.bedtime) < val) && (item.mydate > sixty));
              else
                return ((parseInt(item.bedtime) > val) && (item.mydate > sixty));
          }   
        }else if(dt == 90){
          if(prop === "all"){
            if (val === "all")
              return item.mydate > ninety;
            else if(val === "70")
              return ((parseInt(item.breakfast) < val) && (parseInt(item.lunch) < val) && (parseInt(item.dinner) < val) && (parseInt(item.bedtime) < val) && (item.mydate > ninety));
            else
              return ((parseInt(item.breakfast) > val) && (parseInt(item.lunch) > val) && (parseInt(item.dinner) > val) && (parseInt(item.bedtime) > val) && (item.mydate > ninety));
          }else if (prop == "breakfast"){
              if (val === "all")
                 return item.mydate > ninety;
              else if(val === "70")
                return ((parseInt(item.breakfast) < val) && (item.mydate > ninety));
              else
                return ((parseInt(item.breakfast) > val) && (item.mydate > ninety));
          }else if (prop == "lunch"){
              if (val === "all")
                 return item.mydate > ninety;
              else if(val === "70")
                return ((parseInt(item.lunch) < val) && (item.mydate > ninety));
              else
                return ((parseInt(item.lunch) > val) && (item.mydate > ninety));
          }else if (prop == "dinner"){
              if (val === "all")
                 return item.mydate > ninety;
              else if(val === "70")
                return ((parseInt(item.dinner) < val) && (item.mydate > ninety));
              else
                return ((parseInt(item.dinner) > val) && (item.mydate > ninety));
          }else if (prop == "bedtime"){
              if (val === "all")
                 return item.mydate > ninety;
              else if(val === "70")
                return ((parseInt(item.bedtime) < val) && (item.mydate > ninety));
              else
                return ((parseInt(item.bedtime) > val) && (item.mydate > ninety));
          }   
        }
    	};
  	};



	$scope.getNumberList();
  

});


