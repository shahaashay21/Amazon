var mysql = require('./mysql');
var admin = require('./model/admin');
var Sequelize = require('sequelize');
var sequelize = mysql.sequelize;
var bcrypt = require('bcrypt-nodejs');

exports.checkLogin = function(req, res){

	var email = req.email;
	var pass = req.pass;
	var json_responses;

		admin.sync();

		admin.findOne({attributes :['fname','lname','email', 'createdAt', 'pass'],where :{email : email, pass : pass}})
		.then(function(result) {
			//here result is a large object from which data comes in dataValues object
			if(result.dataValues == null){
				console.log("Unsuccessful Login!");
				json_responses = {"statusCode" : 401, "error" : "Invalid Login"};
				res(null, JSON.stringify(json_responses));
			}else {
				console.log(result.dataValues);
				//bcrypt.compare(pass, result.dataValues.pass, function(errorPassword, ans) {
					//if(errorPassword) {
					//	console.log("Unsuccessful Login!");
					//	json_responses = {"statusCode" : 401, "error" : "Invalid Login"};
					//	res(null, JSON.stringify(json_responses));
					//}
					//if (ans) {
					if(result.dataValues) {
						json_responses = {
							"statusCode" : 200, 
							"fname" : result.dataValues.fname, 
							"lname" : result.dataValues.lname, 
							"createdAt" : result.dataValues.createdAt
						};
						res(null, JSON.stringify(json_responses));
					} else {
						console.log("Unsuccessful Login!");
						json_responses = {"statusCode" : 401, "error" : "Invalid Login"};
						res(null, JSON.stringify(json_responses));
					}
				//});
				
			}	
		}).catch(function(error) {
			console.log("Error : " + error);
		});

	//Create Admin Module with the help of MySQL Sequelize without auto increment 
	//Here find the max value of primary key 'a_id' and then increment it by 1 and store it while adding new admin
	/*var hash = bcrypt.hashSync('darshil');

	admin.sync();
	var adminId;
	admin.max('a_id').then(function(id){
		adminId = id+1;
		console.log(id);
		admin.create({
			a_id : adminId,
			fname : 	'Darshil',
				lname : 'Saraiya',
				email : 'darshil.saraiya@sjsu.edu',
				pass : hash,
				address : '201 S 4th Street',
				city : 'San Jose',
				state : 'California',
				zipCode : '95112'
			}).then(function(err, reply) {
			
				if(err)
					console.log(err);

				console.log("data : ");
				console.log(reply);
			}).catch(function(err) {
				console.log(err);
			});
		}).error(function(err) {
			console.log(err);
		});*/	
}