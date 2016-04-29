/*
-------Created by Aashay Shah 4/19/16-------
-------Sign in and sign up related operations-------
*/

//REQUIRE FILES
// var bcrypt = require('./bCrypt');
 var bcrypt = require('bcrypt-nodejs');
//var bcrypt = require('bcrypt');

//Collections
var User = require('./model/user');
//var Counter = require('./model/counter');
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var validate = require("validator");

/*
Aashay Shah 4/19/16
Sign in page
*/
exports.signIn = function(req, res){
	if(typeof req.session.uid == 'undefined'){
		if(typeof req.session.wrongSignIn){
			if(req.session.wrongSignIn == true){
				req.session.wrongSignIn = false;
				res.render('signIn', {'wrong': true});
			}else{
				res.render('signIn');
			}
		}else{
			res.render('signIn');
		}
	}else{
		res.redirect('/');
	}
}


/*
Aashay Shah 4/19/16
Sign up page
*/
exports.signUp = function(req, res){
	res.render('signUp');
}


exports.regUser = function(req,res){

	// console.log("Class Login and function regUser");
	var email = req.param('email');
	var pass = req.param('pass');
	var fname = req.param('fname');
	var lname = req.param('lname');
	var vPass = req.param('verify-pass');

	err = 0;
	ret = {};
	if(!email && !pass && !fname && !lname){
		// console.log('here');
		err = 1;
		ret['nullfield'] = 'Field can not be empty';
	}
	if(pass.length < 6){
		err = 1;
		ret['password'] = 'Password must be more than 5 characters!';
	}
	//var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
	if (!validate.isEmail(email)){
		err = 1;
		ret['email'] = 'Invalid email address';
	}

	if(vPass != pass){
		err = 1;
		ret['verifyPassword'] = 'Verify Password must be same as Password';
	}

	if(err == 1){
		res.end(JSON.stringify(ret));
	}else{
		var hash = bcrypt.hashSync(pass);
		User.findOne({email: email},'email', function(err,useremail){
			console.log(useremail);
			if(useremail){
				res.end(JSON.stringify('available'));
			}else{
				var user = new User();
				user.fname = fname.toLowerCase();
				user.lname = lname.toLowerCase();
				user.email = email;
				user.pass = hash;
				user.save(function (err){
					console.log(err);
					if(!err){
						res.end(JSON.stringify('Registered'));
					}
				});
			}
		});
	}
};

exports.logOut = function(req,res){
	req.session.destroy(function(err) {
		res.json("done");
	});
};