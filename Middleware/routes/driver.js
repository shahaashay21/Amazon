/*
-------Created by Darshil Saraiya 5/01/16-------
-------Admin related operations-------
*/

//Required Files
var mq = require('../rpc/client');

//get Drivers
exports.getDrivers = function(req, res) {
	//messege payload for sending to server
	msg_payload = {"service" : "getDrivers"};
	
	//making request to the server
	mq.make_request('driver-queue', msg_payload,function(err, results) {
		if(err) {
			console.log("Error occurred while requesting to server for getDrivers : " + err);
			var json_resposes = {"status" : 401, "error" : "Could not connect to server"};
			res.send(json_resposes);
		} else
			res.send(JSON.parse(results));
	});

}

//create Driver
exports.createDriver = function(req, res) {

	//truck number as parameter
	//var number = req.param("number");
	var newDriver = req.param("newDriver");
	
	//if(number.length==7) {
		//messege payload for sending to server
		msg_payload = {"service" : "createDriver", "newDriver" : newDriver};

		//making request to the server
		mq.make_request('driver-queue', msg_payload,function(err, results) {
			if(err) {
				console.log("Error occurred while requesting to server for createDriver : " + err);
				var json_resposes = {"status" : 401, "error" : "Could not connect to server"};
				res.send(json_resposes);
			} else
				res.send(JSON.parse(results));
		});
	//} else {
	//	console.log("Invalid driver details!");
	//	var json_resposes = {"status" : 401, "error" : "invalid driver details"};
	//	res.send(json_resposes);
	//}
}

//delete Driver
exports.deleteDriver = function(req,res){
	
	var driver_id = req.param("driver_id");

	if(driver_id) {
		if(driver_id.length ==9){
			var msg_payload = {
				"service" : "deleteDriver",
				"driver_id" : driver_id,
				"sid":req.sessionID
			};

		  	mq.make_request('driver-queue', msg_payload, function(err,results){
				if(err)
				{
				    console.log("Error occurred while requesting to server for delete Driver : " + err);
					var json_resposes = {"status" : 401, "error" : "Could not connect to server"};
					res.send(json_resposes);
				} else
					res.send(JSON.parse(results));
			});
		}
	} else {
		console.log("Invalid driver id!");
		var json_resposes = {"status" : 401, "error" : "invalid driver id!!"};
		res.send(json_resposes);
	}
};

//edit Driver
exports.editDriver = function(req,res){

	var driver_id = req.param("driver_id");
	var t_id = req.param("t_id");
	var fname = req.param("fname");
	var lname = req.param("lname");
	var email = req.param("email");
	var address = req.param("address");
	var city = req.param("city");
	var state = req.param("state");
	var zipCode = req.param("zipCode");
	var contacts = req.param("contacts");


	console.log("contacts : " + contacts);
	//if(number && t_id) {
	//	if(number.length == 7 && t_id.length ==9){
			var msg_payload = {
				"service" : "editDriver",
				"driver_id": driver_id,
				"t_id" : t_id,
				"fname" : fname,
				"lname" : lname,
				"email" : email,
				"address" : address,
				"city" : city,
				"state" : state,
				"zipCode" : zipCode,
				"contacts" : contacts,
				"sid":req.sessionID
			};

		  	mq.make_request('driver-queue', msg_payload, function(err,results){
				if(err) {
				    console.log("Error occurred while requesting to server for editDriver : " + err);
					var json_resposes = {"status" : 401, "error" : "Could not connect to server"};
					res.send(json_resposes);
				}
				else
					res.send(JSON.parse(results));
			});
	 	//}
	 //} else {
	 //	console.log("Invalid driver number and/or truck id!");
	//	var json_resposes = {"status" : 401, "error" : "invalid driver number and/or driver id!!"};
	//	res.send(json_resposes);
	 //}
};