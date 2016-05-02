/*
-------Created by Darshil Saraiya 4/30/16-------
-------Admin related operations-------
*/

//Required Files
var mq = require('../rpc/client');

//get Trucks
exports.getTrucks = function(req, res) {
	//messege payload for sending to server
	msg_payload = {"service" : "getTrucks"};

	//making request to the server
	mq.make_request('truck-queue', msg_payload,function(err, results) {
		if(err) {
			console.log("Error occurred while requesting to server for getTrucks : " + err);
			var json_resposes = {"status" : 401, "error" : "Could not connect to server"};
			res.send(json_resposes);
		} else
			res.send(JSON.parse(results));
	});

}

//create Truck
exports.createTruck = function(req, res) {

	//truck number as parameter
	var number = req.param("number");

	if(number.length==7) {
		//messege payload for sending to server
		msg_payload = {"service" : "createTruck", "number" : number};

		//making request to the server
		mq.make_request('truck-queue', msg_payload,function(err, results) {
			if(err) {
				console.log("Error occurred while requesting to server for createTruck : " + err);
				var json_resposes = {"status" : 401, "error" : "Could not connect to server"};
				res.send(json_resposes);
			} else
				res.send(JSON.parse(results));
		});
	} else {
		console.log("Invalid truck number!");
		var json_resposes = {"status" : 401, "error" : "invalid truck number"};
		res.send(json_resposes);
	}
}

//delete Truck
exports.deleteTruck = function(req,res){
	
	var t_id = req.param("t_id");

	if(t_id) {
		if(t_id.length ==9){
			var msg_payload = {
				"service" : "deleteTruck",
				"t_id" : req.param("t_id"),
				"sid":req.sessionID
			};

		  	mq.make_request('truck-queue', msg_payload, function(err,results){
				if(err)
				{
				    console.log("Error occurred while requesting to server for delete Trucks : " + err);
					var json_resposes = {"status" : 401, "error" : "Could not connect to server"};
					res.send(json_resposes);
				} else
					res.send(JSON.parse(results));
			});
		}
	} else {
		console.log("Invalid truck number truck id!");
		var json_resposes = {"status" : 401, "error" : "invalid truck truck id!!"};
		res.send(json_resposes);
	}
};

//edit Truck
exports.editTruck = function(req,res){

	var t_id = req.param("t_id");
	var number = req.param("number");

	if(number && t_id) {
		if(number.length == 7 && t_id.length ==9){
			var msg_payload = {
				"service" : "editTruck",
				"t_id": t_id,
				"number" : number,
				"sid":req.sessionID
			};

		  	mq.make_request('truck-queue', msg_payload, function(err,results){
				if(err) {
				    console.log("Error occurred while requesting to server for editTrucks : " + err);
					var json_resposes = {"status" : 401, "error" : "Could not connect to server"};
					res.send(json_resposes);
				}
				else
					res.send(JSON.parse(results));
			});
	 	}
	 } else {
	 	console.log("Invalid truck number and/or truck id!");
		var json_resposes = {"status" : 401, "error" : "invalid truck number and/or truck id!!"};
		res.send(json_resposes);
	 }
};