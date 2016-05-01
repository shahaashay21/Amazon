//var User = require('./model/user');
var Farmer = require('./model/farmer');
var bcrypt = require("bcrypt-nodejs");
//var Counter = require('./model/counter');
//var passport = require("passport");
//var LocalStrategy = require("passport-local").Strategy;



exports.farmerSignUp = function(req,res){
	console.log("here");
	var hash = bcrypt.hashSync(req.pass);
	var farmer = new Farmer();
	farmer.fname = req.fname;
	farmer.lname = req.lname;
	farmer.email = req.email;
	farmer.pass = hash;
	console.log(hash);
	farmer.save(function (err,result){
		//console.log(err);
		if(!err){
			console.log("registered");
			res(null,JSON.stringify('Registered'));
		} else {
			console.log(err);
			res(null, JSON.stringify('error' + err));
		}
	});

}