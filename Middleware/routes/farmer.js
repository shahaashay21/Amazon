//

var ejs = require("ejs");
var mq = require('../rpc/client');
var validate = require("validator");
	
//var mysql = require('./mysql');
var resGen = require('./commons/responseGenerator');


exports.getFarmers = function(req, res){
	var msg_payload = {"service":"getFarmers", "sid":req.sessionID};
  	mq.make_request('farmer_queue', msg_payload, function(err,doc){
		if(err)
		{
		    console.log(err);
			res.send(resGen.responseGenerator(401, null));
		}
		else
		{
   			doc = JSON.parse(doc);
			if(doc.status == 200){
				console.log("reply from getFarmers");
				res.send(doc);
			}
			else
			{
				res.send(resGen.responseGenerator(401, null));
			}
		}
	});
};

exports.createFarmer = function(req,res){
	var email = req.param("email");
	var pass = req.param("pass");
	var err = 0;

	if(!validate.isEmail(email)){
		res.send(resGen.responseGenerator(500,null));
		err = 1;
	}

	if(pass.length < 6){
		res.send(resGen.responseGenerator(500,null));
		err = 1;
	}

	if(err == 0){
		var msg_payload = {
			"service" : "createFarmer",
			//"f_id" : req.param("f_id"),
			"fname" : req.param("fname"),
			"lname" : req.param("lname"),
			"email" : req.param("email"),
			"pass" : req.param("pass"),
			"intro" : req.param("intro"),
			"contacts" : req.param("contacts"),
			"video": req.param("video"),
			"tax": req.param("tax"),
			"address" : req.param("address"),
			"city" : req.param("city"),
			"state": req.param("state"),
			"zipcode" : req.param("zipcode"),
			"isActive" : req.param("isActive"),
			"sid":req.sessionID
		};

	  	mq.make_request('farmer_queue', msg_payload, function(err,doc){
			if(err)
			{
			    console.log("createFarmer error middleware");
				res.send(resGen.responseGenerator(401, null));
			}
			else
			{
				doc = JSON.parse(doc);
				if(doc.status == 200){
					console.log("reply from createFarmer" + doc);
	       			res.send(doc);
				}
				else
				{
					res.send(resGen.responseGenerator(401, null));
				}
			}
		});
	}
};

exports.deleteFarmer = function(req,res){
	if(req.param("f_id").length!=9){
		res.send(500);
	}

	var msg_payload = {
		"service" : "deleteFarmer",
		"f_id" : req.param("f_id"),
		"sid":req.sessionID
	};


  	mq.make_request('farmer_queue', msg_payload, function(err,doc){
		if(err)
		{
		    console.log(err);
			res.send(resGen.responseGenerator(401, null));
		}
		else
		{
			doc = JSON.parse(doc);
			if(doc.status == 200){
				console.log("reply from deleteFarmer" + doc);
       			res.send(doc);
			}
			else
			{
				res.send(resGen.responseGenerator(401, null));
			}
		}
	});
};

exports.editFarmer = function(req,res){

	var email = req.param('email');
	var err = 0;
	console.log("validate email");
	console.log(validate.isEmail(email));
	if(!validate.isEmail(email)){
		res.send(resGen.responseGenerator(500,null));
		err = 1;
	}

	if(req.param("f_id").length!=9){
		res.send(resGen.responseGenerator(500,null));
		err = 1;
	}

	if( err == 0){
		var msg_payload = {
			"service" : "editFarmer",
			"f_id": req.param("f_id"),
			"fname" : req.param("fname"),
			"lname" : req.param("lname"),
			"email" : req.param("email"),
			"address" : req.param("address"),
			"city": req.param("city"),
			"state": req.param("state"),
			"zipcode": req.param("zipcode"),
			"intro": req.param("intro"),
			"video": req.param("video"),
			"tax": req.param("tax"),
			"contacts": req.param("contacts"),
			//"city" : req.param("city"),
			//"zipcode" : req.param("zipcode"),
			//"intro" : req.param("intro"),
			"sid":req.sessionID
		};

	  	mq.make_request('farmer_queue', msg_payload, function(err,doc){
			if(err)
			{
			    console.log(err);
				res.send(resGen.responseGenerator(401, null));
			}
			else
			{
	   			doc = JSON.parse(doc);
				if(doc.status == 200){
					console.log("reply from editFarmer" + doc);
					res.send(doc);
				}
				else
				{
					res.send(resGen.responseGenerator(401, null));
				}
			}
		});
	}
};
