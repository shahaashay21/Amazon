//REQUIRE FILES
var bcrypt = require('./bCrypt');

//Collections
var User = require('./model/user');
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;


module.exports = function(passport){

	passport.use('login', new LocalStrategy(function(username, password, done) {
		process.nextTick(function(){
			User.findOne({email: username}, 'pass c_id', function(err, hash){
				if(hash){
					bcrypt.compare(password, hash.pass, function(err,ans){
						if(err) {
		                    return done(err);
		                }
						if(ans){
						 	done(null, hash.c_id);
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
