"use strict";

app.factory('DataFactory', function($q, $http, FBCreds){

	const addNumber = (newObj) => {
		return $q((resolve,reject) => {
			let object = JSON.stringify(newObj);
			$http.post(`${FBCreds.databaseURL}/numbers.json`, object)
			.then(resolve)
			.catch(reject);
		});
	};

	const editNumber = (id, editedObj) => {
		return $q((resolve, reject) => {
			let editedObject = JSON.stringify(editedObj);
			//console.log("editedObject",editedObject);
			$http.patch(`${FBCreds.databaseURL}/numbers/${id}.json`, editedObject)
			.then(resolve)
			.catch(reject);

		});

	};

	const getNumber = (id) => {
		console.log("i am in getNumber and my id is", id);
		return $q((resolve, reject) => {
			$http.get(`${FBCreds.databaseURL}/numbers/${id}.json`)
			.then((itemObj) => {
				resolve(itemObj.data);
				//console.log("itemObj.data", itemObj.data);
			})
			.catch((error) => {
				reject(error);
			});

		});
	};

	const getQuote = () => {
		return $q((resolve, reject) => {
			$http.get(`http://quotes.rest/qod.json`)
			.then((quotesObj) => {
				resolve(quotesObj.data);
				//console.log("quotesObj.data", quotesObj.data);
			})
			.catch((error) => {
				reject(error);
			});

		});
	};

	const getNumbers = () => {
		let bgs = [];
		//console.log("within getNumbers function");
		return $q((resolve,reject) => {
			//console.log("within the promise");
			$http.get(`${FBCreds.databaseURL}/numbers.json`)
			.then((itemObj) => {
				//console.log("data", itemObj.data);
				let itemCollection = itemObj.data;
				Object.keys(itemCollection).forEach((key) => {
					itemCollection[key].id = key;
					bgs.push(itemCollection[key]);
				});
				resolve(bgs);
			})
			.catch( (error) => {
        		reject(error);
      		});
    	});
  	};

  	const deleteNumber = (id) => {
  		return $q((resolve, reject) => {
  			$http.delete(`${FBCreds.databaseURL}/numbers/${id}.json`)
  		.then((data) =>{
  			resolve(data);//always have a resolve
  		});
  	});
  	};



	return {
		addNumber,
		getNumbers,
		editNumber,
		getNumber,
		deleteNumber,
		getQuote
	};
});