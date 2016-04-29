var mysql = require('./mysql');
var admin = require('./model/admin');
var Sequelize = require('sequelize');
var sequelize = mysql.sequelize;

exports.checkLogin = function(req, res){

	var email = req.email;
	var pass = req.pass;
	var json_responses;
	
		admin.sync();

		admin.findOne({attributes :['fname','lname','email', 'createdAt'],where :{email : email, pass : pass}})
		.then(function(result) {
			//here result is a large object from which data comes in dataValues object
			if(result.dataValues == null){
				console.log("Unsuccessful Login!");
				json_responses = {"statusCode" : 401, "error" : "Invalid Login"};
				res(null, JSON.stringify(json_responses));
			}else {
				console.log(result.dataValues);
				json_responses = {
					"statusCode" : 200, 
					"fname" : result.dataValues.fname, 
					"lname" : result.dataValues.lname, 
					"createdAt" : result.dataValues.createdAt
				};
				res(null, JSON.stringify(json_responses));
			}	
		}).catch(function(error) {
			console.log("Error : " + error);
		});

	//Create Admin Module with the help of MySQL Sequelize without auto increment 
	//Here find the max value of primary key 'a_id' and then increment it by 1 and store it while adding new admin
	/*var adminId;
	admin.max('a_id').then(function(id){
		adminId = id+1;
		console.log(id);
		admin.create({
			a_id : adminId,
			fname : 	'Vansh',
				lname : 'Shah',
				email : 'vansh.shah@sjsu.edu',
				pass : 'vansh',
				address : 'Eastrisge',
				city : 'San Jose',
				state : 'California',
				zipCode : '95100'
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
		
		//mysql query without using sequelize
		/*if(email != '' && pass != ''){
		var checkLoginQuery = "select fname, lname, email, pass, createdAt from admin where email = '" + email + "' and pass ='" + pass + "'";
		console.log("SQL Query : " + checkLoginQuery);

		mysql.fetchData(function(err, rows) {
			if(err) {
				throw err;
			} else {
				if(rows.length > 0) {

					//Comparing encrypted password
					//if(bcrypt.compareSync(pass, results[0].pass)) {
						json_responses = {"statusCode" : 200, "fname" : rows[0].fname, "lname" : rows[0].lname, "createdAt" : rows[0].createdAt};
						//res(null,resGen.responseGenerator(200, null));
						console.log("json_responses : " + json_responses);
						res(null, JSON.stringify(json_responses));
					//} else {
					//	console.log("Invalid Password!");
					//	json_resposes = {"statusCode" : 401, "error" : "Invalid Password"};
					//	res(null, JSON.stringify(json_responses));
					//}
				} else {
					console.log("Unsuccessful Login!");

					json_responses = {"statusCode" : 401, "error" : "Invalid Login"};
					console.log("json_responses : " + json_responses);
					res(null, JSON.stringify(json_responses));
				}
			}
		}, checkLoginQuery);
	}*/
}