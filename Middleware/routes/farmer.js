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

			if(doc.status == 200){
				console.log("reply from getFarmers");
       			doc = JSON.parse(doc);
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

			if(doc.status == 200){
				console.log("reply from createFarmer" + doc);
       			doc = JSON.parse(doc);
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
		"fid" : req.param("fid"),
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

			if(doc.status == 200){
				console.log("reply from deleteFarmer" + doc);
       			doc = JSON.parse(doc);
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
		"fid" : req.param("fid"),
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

			if(doc.status == 200){
				console.log("reply from editFarmer" + doc);
       			doc = JSON.parse(doc);
				res.send(doc);
			}
			else
			{
				res.send(resGen.responseGenerator(401, null));
			}
		}
	});
};