 var bcrypt = require('bcrypt-nodejs');
//var bcrypt = require('bcrypt');

//Collections
var User = require('./model/user');
var Farmer = require('./model/farmer');
//var Counter = require('./model/counter');
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var validate = require("validator");
var Product = require('./model/product');
var Farmer = require('./model/farmer');
var Category = require('./model/category');
var resGen = require('./commons/responseGenerator');
var Farmer = require('./model/farmer');

//Required Files
var mq = require('../rpc/client');


exports.checkEmail = function(req,res){
	Farmer.findOne({email: req.param("email")},'email', function(err,useremail){
		console.log(useremail);
		if(useremail){
			res.send(resGen.responseGenerator(402,'Email already Registered'));
		}
		else{
			res.send(resGen.responseGenerator(200,'Email available'));
		}
	});
}

exports.signup = function(req,res){

	// console.log("Class Login and function regUser");
	var email = req.param('email');
	var pass = req.param('pass');
	var fname = req.param('fname');
	var lname = req.param('lname');
	var err = 0;
	
	if(!validate.isEmail(email))
	{
		res.send(500);
		err = 1;
	}

	if(err == 1){
		res.send(500);
	} else {
		/*
		*/	
		msg_payload = {"service" : "farmerSignUp", "fname" : fname, "lname": lname, "email": email, "pass": pass};
		//console.log(msg_payload);
		//making request to the server
		mq.make_request('farmer_queue', msg_payload, function(err, results) {
			if(err) {
				res.send((resGen.responseGenerator(401,null)));
			}
			else{
				res.send(results);
			}
		});
	}	
};

exports.userSignUp = function(req,res){
	res.render('./farmer/signup');
};

exports.userSignIn = function(req,res){
	res.render('./farmer/signin');
};

exports.home = function(req,res){
	res.render('./farmer/farmerHome');
};



exports.productlist = function(req,res){
	console.log(req.session.farmer.f_id);
	Product.find({isActive:true, f_id: req.session.farmer.f_id},function(err,results){
		if(err)
		{
			res.send(resGen.responseGenerator(400,null));
		}
		else
		{
			if(results.length > 0){
				console.log("all products found");
				//console.log(results[0]);
				res.send(resGen.responseGenerator(200, results));
			}
			else
			{
				console.log("no data");
				res.send(resGen.responseGenerator(400,null));		
			}
		}
	});
};

exports.createProduct = function(req,res){
	console.log("f_id");
	console.log(req.session.farmer.f_id);
	var product = Product({
		//p_id : req.p_id,
		name : req.param("name"),
		f_id: req.session.farmer.f_id,
		f_name: req.session.farmer.fname +" "+ req.session.farmer.lname,
		cat_id: req.param("cat_id"),
		price : req.param("price"),
		weight : req.param("weight"),
		unit: req.param("unit"),
		price_unit: Number(req.param("price"))/Number(req.param("weight")),
		quantity: req.param("quantity"),
		details : req.param("details"),
		description : req.param("description"),
		features: req.param("features"),
		product_img: req.param("product_img")
	});
	product.images[0] = req.param("image1");
	product.images[1] = req.param("image2");
	product.images[2] = req.param("image3");

	product.save(function(err,results){
		if(err)
		{
			console.log(err);
			res.send(resGen.responseGenerator(400,null));
		}
		else
		{
			if(results){
				console.log("product created");
				//console.log(results);
				res.send(resGen.responseGenerator(200, results));
			}
			else
			{
				console.log("no data");
				res.send(resGen.responseGenerator(400,null));
			}
		}
	});
};



exports.editProduct = function(req, res){

	Product.findOne({p_id:req.param("p_id")},function(err,result){
		if(err)
		{
			res.send(resGen.responseGenerator(400,null));
		}
		else
		{
			console.log(result);
			if(result){
				result.name = req.param("name");
				result.cat_id = req.param("cat_id");
				result.price = req.param("price");
				result.weight = req.param("weight");
				result.price_unit = Number(req.param("price"))/Number(req.param("weight")),
				result.unit = req.param("unit");
				result.details = req.param("details");
				result.description = req.param("description");
				result.features = req.param("features");
				result.quantity = req.param("quantity");
				//result.description = req.description;
				result.save(function(err,doc){
					if(err){
						res.send(resGen.responseGenerator(400,null));
					} else {
						console.log("product edited");
						//console.log(doc);
						res.send(resGen.responseGenerator(200, doc));
					}
				});
			}
			else
			{
				res.send(resGen.responseGenerator(400,null));
			}
		}
	});
};

exports.deleteProduct = function(req, res){

	console.log(req.param("p_id"));
	Product.findOne({p_id:req.param("p_id")},function(err,result){
		if(err)
		{
			res.send(resGen.responseGenerator(400,null));
		}
		else
		{
			console.log(result);
			if(result){
				//console.log("all products found");
				//console.log(result);
				result.isActive = false;
				result.save(function(err,doc){
					if(err){
						res.send(resGen.responseGenerator(400,null));
					} else {
						console.log("product inactive now");
						//console.log(doc);
						res.send(resGen.responseGenerator(200, doc.isActive));
					}
				});
			}
			else
			{
				console.log("no data delete product");
				res.send(resGen.responseGenerator(400,null));
			}
		}
	});
};
