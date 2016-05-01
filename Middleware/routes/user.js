var mq = require('../rpc/client');
var resGen = require('./commons/responseGenerator');
var ejs = require("ejs");


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
				console.log(doc);
       			res.send(doc);
       			res.redirect("/help");
			}
			else
			{
				res.send(resGen.responseGenerator(401, null));
			}
		}
	});
}


