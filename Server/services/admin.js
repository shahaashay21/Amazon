var mysql = require('./mysql');

exports.checkLogin = function(req, res){

	var email = req.email;
	var pass = req.pass;
	var json_responses;

	if(email != '' && pass != ''){
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
	}
}