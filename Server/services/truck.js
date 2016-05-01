/*
-------Created by Darshil Saraiya 4/30/16-------
-------Truck related operations-------
*/
//REQUIRED FILES
var Truck = require('./model/truck');

//getTrucks
exports.getTrucks = function(req, res) {
	Truck.find({isActive :true}, function(err, results) {
		if(err) {
			console.log("err :: " + err);
			json_responses = {"status" : 401, "error" : "error occurred while executing find query"};
			res(null, JSON.stringify(json_responses));
		} else {
			if(results != null && results.length > 0) {
				console.log("All Trucks Found!");
				json_responses = {"status" : 200, "data" : results};
				res(null, JSON.stringify(json_responses));

			} else {
				json_responses = {"status" : 401, "error" : "no trucks data found"};
				res(null, JSON.stringify(json_responses));
			}

		}
	})
}

//get Trucks
exports.createTruck = function(req, res){

	var number = req.number;

	Truck.findOne({isActive : true, number : number}, function(err, results) {
		if(err) {
			console.log("err :: " + err);
			json_responses = {"status" : 401, "error" : "error occurred while executing find query"};
			res(null, JSON.stringify(json_responses));
		} else {
			if(results) {
				console.log("truck number exist!");
				json_responses = {"status" : 401, "error" : "Truck Exists"};
				res(null, JSON.stringify(json_responses));
			} else {
				var truck = Truck({
					number : number
				});

				truck.save(function(err, data) {
					if(err) {
						console.log("err :: " + err);
						json_responses = {"status" : 401, "error" : "error occurred while executing save query"};
						res(null, JSON.stringify(json_responses));
					} else {
						console.log("Truck Added!");
						json_responses = {"status" : 200};
						res(null, JSON.stringify(json_responses));
					}
				});
			}
		}
	});
}

exports.editTruck = function(req, res) {

	console.log("editTruck");
	var t_id = req.t_id;
	var number = req.number;

	Truck.findOne({isActive : true, t_id : t_id}, function(err, result){
		if(err) {
			console.log("err :: " + err);
			json_responses = {"status" : 401, "error" : "error occurred while executing find query"};
			res(null, JSON.stringify(json_responses));
		} else {
			console.log("result finding a truck");
			console.log(result);
			if(result) {
				console.log("truck exist");
				result.number = number;

				result.save(function(err, doc) {
					if(err) {
						console.log("err :: " + err);
						json_responses = {"status" : 401, "error" : "error occurred while executing edit query"};
						res(null, JSON.stringify(json_responses));		
					} else {
						console.log("truck edited!");
						json_responses = {"status" : 200};
						res(null, JSON.stringify(json_responses));
					}
				});
			}
		}
	});
}

exports.deleteTruck = function(req, res ) {
	console.log("delete truck");
	var t_id = req.t_id;

	Truck.findOne({t_id : t_id}, function(err, result) {
		if(err) {
			console.log("err :: " + err);
			json_responses = {"status" : 401, "error" : "error occurred while executing find query"};
			res(null, JSON.stringify(json_responses));
		} else {
			console.log("result finding a truck");
			console.log(result);
			if(result) {
				console.log("truck exist");

				result.isActive =false;

				result.save(function(err, doc) {
					if(err) {
						console.log("err :: " + err);
						json_responses = {"status" : 401, "error" : "error occurred while executing delete query"};
						res(null, JSON.stringify(json_responses));		
					} else {
						console.log("truck deleted!");
						json_responses = {"status" : 200};
						res(null, JSON.stringify(json_responses));
					}
				});
			}
		}
	});
}