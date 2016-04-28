//

var ejs = require("ejs");
var mq = require('../rpc/client');

//var mysql = require('./mysql');
var resGen = require('./commons/responseGenerator');


exports.getProducts = function(req, res){
	var msg_payload = {"service":"getProducts", "sid":req.sessionID};
  	mq.make_request('product_queue', msg_payload, function(err,doc){
		if(err)
		{
		    console.log(err);
			res.send(resGen.responseGenerator(401, null));
		}
		else
		{
			doc = JSON.parse(doc);
			if(doc.status == 200){
				console.log("reply from getProducts");
				res.send(doc);
			}
			else
			{
				res.send(resGen.responseGenerator(401, null));
			}
		}
	});
};

exports.createProduct = function(req,res){

	var msg_payload = {
		"service" : "createProduct",
		"p_id" : req.param("p_id"),
		"name" : req.param("name"),
		"cat_id" : req.param("cat_id"),
		"price" : req.param("price"),
		"weight" : req.param("weight"),
		"details" : req.param("details"),
		"unit" : req.param("unit"),
		"description" : req.param("description"),
		"sid":req.sessionID
	};

  	mq.make_request('product_queue', msg_payload, function(err,doc){
		if(err)
		{
		    console.log(err);
			res.send(resGen.responseGenerator(401, null));
		}
		else
		{

			doc = JSON.parse(doc);
			if(doc.status == 200){
				console.log("reply from createProduct" + doc);

				res.send(doc);
			}
			else
			{
				res.send(resGen.responseGenerator(401, null));
			}
		}
	});
};

exports.deleteProduct = function(req,res){
	var msg_payload = {
		"service" : "deleteProduct",
		"p_id" : req.param("p_id"),
		"sid":req.sessionID
	};

  	mq.make_request('product_queue', msg_payload, function(err,doc){
		if(err)
		{
		    console.log(err);
			res.send(resGen.responseGenerator(401, null));
		}
		else
		{

			doc = JSON.parse(doc);
			if(doc.status == 200){
				console.log("reply from deleteProduct" + doc);

				res.send(doc);
			}
			else
			{
				res.send(resGen.responseGenerator(401, null));
			}
		}
	});
};

exports.editProduct = function(req,res){
	var msg_payload = {
		"service" : "editProduct",
		"p_id" : req.param("p_id"),
		"name" : req.param("name"),
		"cat_id" : req.param("cat_id"),
		"price" : req.param("price"),
		"weight" : req.param("weight"),
		"details" : req.param("details"),
		//"description" : req.param("description"),
		"unit" : req.param("unit"),
		"sid":req.sessionID
	};

  	mq.make_request('product_queue', msg_payload, function(err,doc){
		if(err)
		{
		    console.log(err);
			res.send(resGen.responseGenerator(401, null));
		}
		else
		{

			doc = JSON.parse(doc);
			if(doc.status == 200){
				console.log("reply from editProduct" + doc);
       			res.send(doc);
			}
			else
			{
				res.send(resGen.responseGenerator(401, null));
			}
		}
	});
};

exports.prod_details = function(req,res){
	var msg_payload = {
		"service" : "get_prod",
		"p_id" : req.param("p_id"),
		"sid":req.session.user
	};
  	mq.make_request('product_queue', msg_payload, function(err,prod){
		if(err)
		{
		    console.log(err);
			res.send(resGen.responseGenerator(401, null));
		}
		else
		{
			if(prod.code == 200){
				console.log(prod);
				if(typeof req.session.user != 'undefined'){
					console.log(req.session.user);
					res.render('product_page', { user: req.session.user, products: prod, session: true });
				}else{
					console.log("No session on");
					res.render('product_page', { products: prod, session: false });
				}
			}
			else
			{
				res.send(resGen.responseGenerator(401, null));
			}
		}
	});
};