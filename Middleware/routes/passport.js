//REQUIRE FILES
var bcrypt = require('bcrypt-nodejs');

//Collections
var User = require('./model/user');
var Farmer = require('./model/farmer');
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;


module.exports = function(passport){


	passport.use('farmerLogin', new LocalStrategy(function(username, password, done) {
		//console.log("hey");
		process.nextTick(function(){
			//console.log(username);
			Farmer.findOne({email: username}, function(err, hash){
				//console.log(password);
				if(hash){
					bcrypt.compare(password, hash.pass, function(err,ans){
						//console.log(hash);
						if(err) {
		                    return done(err);
		                }
		                //console.log(ans);
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

	passport.use('login', new LocalStrategy(function(username, password, done) {
		//console.log("hey1");
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

};
