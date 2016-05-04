var mysql = require('./mysql');
var admin = require('./model/admin');
var Sequelize = require('sequelize');
var sequelize = mysql.sequelize;
var bcrypt = require('bcrypt-nodejs');

exports.checkLogin = function(req, res){

	var email = req.email;
	var pass = req.pass;
	var json_responses;

		/*admin.sync();

		admin.update({"email" : email}, {"$set" : {"pass" : "darshil"}}, function(err, result) {
			if(err) {
				console.log("err : " + err);
			} else {
				if(result) {
					console.log("result update query :: ");
					console.log(result);
				}
			}
		});*/

		admin.sync();

		admin.findOne({attributes :['fname','lname','email', 'createdAt', 'pass'],where :{email : email, pass : pass}})
		.then(function(result) {
			//here result is a large object from which data comes in dataValues object
			
			console.log(result);

			if(!result){
				console.log("Unsuccessful Login!");
				json_responses = {"statusCode" : 401, "error" : "Invalid Login"};
				res(null, JSON.stringify(json_responses));
			}else {
				//console.log(result);
				//console.log(result);
				//console.log("Successful log in");
				console.log(result.dataValues);
				//console.log(result.dataValues.length);
				//bcrypt.compare(pass, result.dataValues.pass, function(errorPassword, ans) {
					//if(errorPassword) {
					//	console.log("Unsuccessful Login!");
					//	json_responses = {"statusCode" : 401, "error" : "Invalid Login"};
					//	res(null, JSON.stringify(json_responses));
					//}
					//if (ans) {
					//if(result.dataValues.lenght > 0) {
						json_responses = {
							"statusCode" : 200, 
							"fname" : result.dataValues.fname, 
							"lname" : result.dataValues.lname, 
							"createdAt" : result.dataValues.createdAt
						};
						res(null, JSON.stringify(json_responses));
					//} else {
					//	console.log("Unsuccessful Login!");
					//	json_responses = {"statusCode" : 401, "error" : "Invalid Login"};
					//	res(null, JSON.stringify(json_responses));
					//}
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

exports.getAdminProfile = function(req, res) {

	console.log("getAdminProfile");
	var email = req.email;

	admin.sync();

	admin.findOne({attributes :['a_id', 'fname','lname','email', 'pass', 'address', 'city', 'state', 'zipCode'],where :{email : email}})
		.then(function(result) {
			//here result is a large object from which data comes in dataValues object
			if(result.dataValues == null){
				console.log("Cannot get Admin Profile Details!");
				json_responses = {"status" : 401, "error" : "Cannot get Admin Profile Details"};
				res(null, JSON.stringify(json_responses));
			}else {
				//console.log(result);
				console.log(result.dataValues);
				
				json_responses = {
					"status" : 200, 
					"data" : result.dataValues
				};
				res(null, JSON.stringify(json_responses));
			}	
		}).catch(function(error) {
			console.log("Error : " + error);
		});
}

exports.saveAdminProfile = function(req, res) {

	console.log("saveAdminProfile");

	var a_id = req.a_id;
	var fname = req.fname;
	var lname = req.lname;
	var email = req.email;
	var pass = req.pass;
	var address = req.address;
	var city = req.city;
	var state = req.state;
	var zipCode = req.zipCode;	

	admin.sync();

	admin.findOne({where :{a_id : a_id}})
		.then(function(result) {
			//here result is a large object from which data comes in dataValues object
			if(result.dataValues == null){
				console.log("Cannot get Admin Profile Details!");
				json_responses = {"status" : 401, "error" : "Cannot get Admin Profile Details"};
				res(null, JSON.stringify(json_responses));
			}else {
				result.updateAttributes({
					fname : fname,
					lname : lname,
					email : email,
					pass : pass,
					address : address,
					city : city,
					state : state,
					zipCode : zipCode
				}).then(function(data) {
					console.log("Successfully updated admin profile");

					console.log("data");
					console.log(data.dataValues);
					console.log("data end");

					json_responses = {"status" : 200, "data" : data.dataValues};
					res(null, JSON.stringify(json_responses));
				}).catch(function(error) {
					console.log("Error while firing update query : " + error);
				});
			}	
		}).catch(function(error) {
			console.log("Error : " + error);
		});
}