var mq = require('../rpc/client');
var resGen = require('./commons/responseGenerator');
var ejs = require("ejs");
var isValidZip = require('is-valid-zip');


exports.list = function(req, res){
  res.send("respond with a resource");

  
};




exports.getAddress = function(req,res){

	var msg_payload = {
		"service":"getAddress",
		 "c_id": req.session.user.c_id ,
		 "sid":req.sessionID};
	console.log(req.session.user.c_id);
  	mq.make_request('user_queue', msg_payload, function(err,doc){
		if(err)
		{
		    console.log(err);
			res.send(resGen.responseGenerator(401, null));
		}
		else
		{
			doc = JSON.parse(doc);
			if(doc.status == 200){
				console.log("reply from getAddress");
				res.send(doc);
			}
			else
			{
				res.send(resGen.responseGenerator(401, null));
			}
		}
	});
}


exports.editCard = function(req,res){

	var msg_payload = {
		"service" : "editCard",
		//"p_id" : req.param("p_id"),
		"card_number" : req.param("card_number"),
		"name_on_card" : req.param("name_on_card"),
		"exp_month" : req.param("exp_month"),
		"exp_year" : req.param("exp_year"),
		"cvv" : req.param("cvv"),
		"c_id": req.session.user.c_id
	};
	
console.log(msg_payload);
  	mq.make_request('user_queue', msg_payload, function(err,doc){
  		//console.log(doc);
		
		if(err)
		{
		    console.log(err);
		    console.log("Ahya Error che Middleware");
			res.send(resGen.responseGenerator(401, null));
		}
		else
		{

			doc = JSON.parse(doc);
			if(doc.status == 200){
				console.log("reply from updateCardDetails" + doc);
       			res.send(doc);
       			res.redirect("/customerAccount");
			}
			else
			{
				res.send(resGen.responseGenerator(401, null));
			}
		}
	});
}


exports.editAddress = function(req,res){
	
	var msg_payload = {
		"service" : "editAddress",
		//"p_id" : req.param("p_id"),
		"address" : req.param("address"),
		"city" : req.param("city"),
		"state" : req.param("state"),
		
		
		"zipcode" : req.param("zipcode"),
		"c_id": req.session.user.c_id
	};

console.log(msg_payload);

  	mq.make_request('user_queue', msg_payload, function(err,doc){
  		console.log(doc);
		
		if(err)
		{
		    console.log(err);
			res.send(resGen.responseGenerator(401, null));
		}
		else
		{

			doc = JSON.parse(doc);
			if(doc.status == 200){
				console.log("Edited address");
				req.session.user.address = req.param("address");
				//sconsole.log(doc);
       			res.send(doc);
       			//res.redirect("/help");
			}
			else
			{
				res.send(resGen.responseGenerator(401, null));
			}
		}
	});
  
}


/*
-------Created by Darshil Saraiya 5/01/16-------
-------Admin related operations-------
*/

//get Customers
exports.getCustomers = function(req, res) {
	//messege payload for sending to server
	msg_payload = {"service" : "getCustomers"};
	
	//making request to the server
	mq.make_request('user_queue', msg_payload,function(err, results) {
		if(err) {
			console.log("Error occurred while requesting to server for getCustomers : " + err);
			var json_resposes = {"status" : 401, "error" : "Could not connect to server"};
			res.send(json_resposes);
		} else
			res.send(JSON.parse(results));
	});

}

//create Driver
exports.createCustomer = function(req, res) {

	//truck number as parameter
	//var number = req.param("number");
	var newCustomer = req.param("newCustomer");
	console.log("newCustomer :: " + newCustomer[0]);
	//if(number.length==7) {
		//messege payload for sending to server
		msg_payload = {"service" : "createCustomer", "newCustomer" : newCustomer};

		//making request to the server
		mq.make_request('user_queue', msg_payload,function(err, results) {
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

//delete Customer
exports.deleteCustomer = function(req,res){
	
	var c_id = req.param("c_id");

	if(c_id) {
		if(c_id.length ==9){
			var msg_payload = {
				"service" : "deleteCustomer",
				"c_id" : c_id,
				"sid":req.sessionID
			};

		  	mq.make_request('user_queue', msg_payload, function(err,results){
				if(err)
				{
				    console.log("Error occurred while requesting to server for delete Customer : " + err);
					var json_resposes = {"status" : 401, "error" : "Could not connect to server"};
					res.send(json_resposes);
				} else
					res.send(JSON.parse(results));
			});
		}
	} else {
		console.log("Invalid customer id!");
		var json_resposes = {"status" : 401, "error" : "invalid customer id!!"};
		res.send(json_resposes);
	}
};

//edit Customer
exports.editCustomer = function(req,res){

	var c_id = req.param("c_id");
	var fname = req.param("fname");
	var lname = req.param("lname");
	var email = req.param("email");
	var address = req.param("address");
	var city = req.param("city");
	var state = req.param("state");
	var zipcode = req.param("zipcode");
	var card_number = req.param("card_number");
	var name_on_card = req.param("name_on_card");
	var exp_year = req.param("exp_year");
	var exp_month = req.param("exp_month");
	var cvv = req.param("cvv");
	var contact = req.param("contact");


	console.log("contact : " + contact);
	//if(number && t_id) {
	//	if(number.length == 7 && t_id.length ==9){
			var msg_payload = {
				"service" : "editCustomer",
				"c_id": c_id,
				"fname" : fname,
				"lname" : lname,
				"email" : email,
				"address" : address,
				"city" : city,
				"state" : state,
				"zipcode" : zipcode,
				"card_number" : card_number,
				"name_on_card" : name_on_card,
				"exp_month" : exp_month,
				"exp_year" : exp_year,
				"cvv" : cvv,
				"contact" : contact,
				"sid":req.sessionID
			};

		  	mq.make_request('user_queue', msg_payload, function(err,results){
				if(err) {
				    console.log("Error occurred while requesting to server for editCustomer : " + err);
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
