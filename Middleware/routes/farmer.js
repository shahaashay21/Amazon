//

var ejs = require("ejs");
var mq = require('../rpc/client');

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
	
	var msg_payload = {
		"service" : "createFarmer",
		"f_id" : req.param("f_id"), 
		"fname" : req.param("fname"),
		"lname" : req.param("lname"),
		"email" : req.param("email"),
		"pass" : req.param("pass"),
		"address" : req.param("address"),
		"city" : req.param("city"),
		"zipcode" : req.param("zipcode"),
		"intro" : req.param("intro"),
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
};

exports.deleteFarmer = function(req,res){
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
	var msg_payload = {
		"service" : "editFarmer", 
		"f_id" : req.param("f_id"),
		"fname" : req.param("fname"),
		"lname" : req.param("lname"),
		"email" : req.param("email"),
		"pass" : req.param("pass"),
		"address" : req.param("address"),
		"city" : req.param("city"),
		"zipcode" : req.param("zipcode"),
		"intro" : req.param("intro"),
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
};