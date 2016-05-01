//REQUIRE FILES
var bcrypt = require('bcrypt-nodejs');

//Collections
var User = require('./model/user');
var Farmer = require('./model/farmer');
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;


module.exports = function(passport){

	passport.use('login', new LocalStrategy(function(username, password, done) {
		process.nextTick(function(){
			User.findOne({email: username}, 'pass c_id fname lname email city address state zipcode', function(err, hash){
				if(hash){
					bcrypt.compare(password, hash.pass, function(err,ans){
						if(err) {
		                    return done(err);
		                }
						if(ans){
						 	done(null, hash);
						}else{
							return done(null, false);
						}
					});
				}else{
					return done(null, false);
				}

			});
        });
	}));

	passport.use('farmerLogin', new LocalStrategy(function(username, password, done) {
		process.nextTick(function(){
			console.log(username);
			Farmer.findOne({email: username},{pass:0}, function(err, hash){
				if(hash){
					bcrypt.compare(password, hash.pass, function(err,ans){
						console.log(err);
						console.log(hash);
						if(err) {
		                    return done(err);
		                }
						if(ans){
						 	done(null, hash);
						}else{
							return done(null, false);
						}
					});
				}else{
					return done(null, false);
				}

			});
        });
	}));
};
