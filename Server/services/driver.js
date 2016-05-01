/*
-------Created by Darshil Saraiya 5/01/16-------
-------Truck related operations-------
*/
//REQUIRED FILES
var Driver = require('./model/driver');

//getDrivers
exports.getDrivers = function(req, res) {
	console.log("get Drivers");

	Driver.find({isActive :true}, function(err, results) {
		if(err) {
			console.log("err :: " + err);
			json_responses = {"status" : 401, "error" : "error occurred while executing find query"};
			res(null, JSON.stringify(json_responses));
		} else {
			console.log(results);
			if(results != null && results.length > 0) {
				console.log("All Drivers Found!");
				json_responses = {"status" : 200, "data" : results};
				res(null, JSON.stringify(json_responses));

			} else {
				json_responses = {"status" : 401, "error" : "no drivers data found"};
				res(null, JSON.stringify(json_responses));
			}

		}
	});
};

//create Driver
exports.createDriver = function(req, res){
	var newDriver = req.newDriver;

	Driver.findOne({isActive : true, email : newDriver[0].email}, function(err, results) {
		if(err) {
			console.log("err :: " + err);
			json_responses = {"status" : 401, "error" : "error occurred while executing find query"};
			res(null, JSON.stringify(json_responses));
		} else {
			if(results) {
				console.log("driver email exist!");
				json_responses = {"status" : 401, "error" : "Driver Exists"};
				res(null, JSON.stringify(json_responses));
			} else {
				var driver = Driver({
					t_id : newDriver[0].t_id,
					fname : newDriver[0].fname,
					lname : newDriver[0].lname,
					email : newDriver[0].email,
					address : newDriver[0].address,
					city : newDriver[0].city,
					state : newDriver[0].state,
					zipCode : newDriver[0].zipCode,
					contacts : newDriver[0].contacts
				});

				driver.save(function(err, data) {
					if(err) {
						console.log("err :: " + err);
						json_responses = {"status" : 401, "error" : "error occurred while executing save query"};
						res(null, JSON.stringify(json_responses));
					} else {
						console.log("Driver Added!");
						json_responses = {"status" : 200};
						res(null, JSON.stringify(json_responses));
					}
				});
			}
		}
	});
}

exports.editDriver = function(req, res) {

	console.log("editDriver");
	var driver_id = req.driver_id;
	var fname = req.fname;
	var lname = req.lname;
	var email = req.email;
	var address = req.address;
	var city = req.city;
	var state = req.state;
	var zipCode = req.zipCode;
	var contacts = req.contacts;

	Driver.findOne({isActive : true, driver_id : driver_id}, function(err, result){
		if(err) {
			console.log("err :: " + err);
			json_responses = {"status" : 401, "error" : "error occurred while executing find query"};
			res(null, JSON.stringify(json_responses));
		} else {
			console.log("result finding a driver");
			console.log(result);
			if(result) {
				console.log("driver exist");
				result.fname = fname;
				result.lname = lname,
				result.email = email;
				result.address = address;
				result.city = city;
				result.state = state;
				result.zipCode = zipCode;
				result.contacts = contacts;

				result.save(function(err, doc) {
					if(err) {
						console.log("err :: " + err);
						json_responses = {"status" : 401, "error" : "error occurred while executing edit query"};
						res(null, JSON.stringify(json_responses));		
					} else {
						console.log("driver edited!");
						json_responses = {"status" : 200};
						res(null, JSON.stringify(json_responses));
					}
				});
			}
		}
	});
}

exports.deleteDriver = function(req, res ) {
	console.log("delete driver");
	var driver_id = req.driver_id;

	Driver.findOne({driver_id : driver_id}, function(err, result) {
		if(err) {
			console.log("err :: " + err);
			json_responses = {"status" : 401, "error" : "error occurred while executing find query"};
			res(null, JSON.stringify(json_responses));
		} else {
			console.log("result finding a driver");
			console.log(result);
			if(result) {
				console.log("driver exist");

				result.isActive =false;

				result.save(function(err, doc) {
					if(err) {
						console.log("err :: " + err);
						json_responses = {"status" : 401, "error" : "error occurred while executing delete query"};
						res(null, JSON.stringify(json_responses));		
					} else {
						console.log("driver deleted!");
						json_responses = {"status" : 200};
						res(null, JSON.stringify(json_responses));
					}
				});
			}
		}
	});
}