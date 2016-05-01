 var bcrypt = require('bcrypt-nodejs');
//var bcrypt = require('bcrypt');

//Collections
var User = require('./model/user');
var Farmer = require('./model/farmer');
//var Counter = require('./model/counter');
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var validate = require("validator");
var resGen = require('./commons/responseGenerator');

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

