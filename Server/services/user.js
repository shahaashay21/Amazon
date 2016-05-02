var User = require('./model/user');
var resGen = require('./commons/responseGenerator');
var bcrypt = require('bcrypt-nodejs');

exports.list = function(req, res){
  res.send("respond with a resource");
};



exports.getAddress = function(req, res){
	
	console.log("cid :: "+ req.c_id);
	//var cid = req.c_id;
	
	User.find({c_id:req.c_id},function(err,results){
		console.log(results);

		if(err)
		{

			resGen.error(err,res);
		}
		else
		{
			console.log(results);
			
			if(results){
				console.log("address found");
				res(null,resGen.responseGenerator(200, results));
			}
			else
			{
				console.log("no data");
				resGen.error(null,res);
			}
		}
	});
}




exports.editAddress = function(req, res){
	//console.log(req);

	User.findOne({c_id:req.c_id},{pass:0},function(err,result){
		if(err)
		{
			resGen.error(err,res);
		}
		else
		{
			if(result){
				//console.log(result);
				
				result.address = req.address;
				result.city = req.city;
				result.state = req.state;
				result.zipcode = req.zipcode;

				// var user = req.session.user.c_id;
				// console.log(users);

				// newUser = {
				// 	pass: user.pass,
				// 	c_id: user.c_id,
				// 	fname: user.fname,
				// 	lname: user.lname,
				// 	email: user.email,
				// 	city: user.city,
				// 	address: req.address,
				// 	state: user.state,
				// 	zipcode: user.zipcode
				// }
				// req.session.user.c_id = newUser;
				//result.description = req.description;
				console.log(result);
				result.save(function(err,doc){
					if(err){
						//console.log(err);
					} else {
						//console.log("Address edited");

						console.log(doc);
						res(null,JSON.stringify(doc));
					}
				});
			}
			else
			{
				resGen.error(null,res);
			}
		}
	});
};





exports.editCard = function(req, res){
	//console.log(req);

	User.findOne({c_id:req.c_id},{pass:0},function(err,result){
		if(err)
		{
			resGen.error(err,res);
		}
		else
		{
			if(result){
				console.log(result);
				
				result.card_number = req.card_number;
				result.name_on_card = req.name_on_card;
				result.exp_month = req.exp_month;
				result.exp_year = req.exp_year;
				result.cvv = req.cvv;
				//result.description = req.description;
				//console.log(result);
				result.save(function(err,doc){
					if(err){
						//console.log(err);
					} else {
						//console.log("Address edited");

						console.log(doc);
						res(null,JSON.stringify(doc));
					}
				});
			}
			else
			{
				resGen.error(null,res);
			}
		}
	});
};


/*
-------Created by Darshil Saraiya 5/01/16-------
-------Customer related operations-------
*/

//getCustomers
exports.getCustomers = function(req, res) {
	console.log("get Customers");

	User.find(function(err, results) {
		if(err) {
			console.log("err :: " + err);
			json_responses = {"status" : 401, "error" : "error occurred while executing find query"};
			res(null, JSON.stringify(json_responses));
		} else {
			console.log(results);
			if(results != null && results.length > 0) {
				console.log("All Customers Found!");
				json_responses = {"status" : 200, "data" : results};
				res(null, JSON.stringify(json_responses));

			} else {
				json_responses = {"status" : 401, "error" : "no customers data found"};
				res(null, JSON.stringify(json_responses));
			}

		}
	});
};

//create Customer
exports.createCustomer = function(req, res){
	console.log("create customer :: ");
	var newCustomer = req.newCustomer;

	newCustomer[0].pass = bcrypt.hashSync(newCustomer[0].pass);

	User.findOne({email : newCustomer[0].email}, function(err, results) {
		if(err) {
			console.log("err :: " + err);
			json_responses = {"status" : 401, "error" : "error occurred while executing find query"};
			res(null, JSON.stringify(json_responses));
		} else {
			if(results) {
				console.log("customer email exist!");
				json_responses = {"status" : 401, "error" : "Customer Exists"};
				res(null, JSON.stringify(json_responses));
			} else {
				var user = User({
					fname : newCustomer[0].fname,
					lname : newCustomer[0].lname,
					email : newCustomer[0].email,
					pass : newCustomer[0].pass,
					address : newCustomer[0].address,
					city : newCustomer[0].city,
					state : newCustomer[0].state,
					zipcode : newCustomer[0].zipcode,
					card_number : newCustomer[0].card_number,
					name_on_card : newCustomer[0].name_on_card,
					exp_month : newCustomer[0].exp_month,
					exp_year : newCustomer[0].exp_year,
					cvv : newCustomer[0].cvv,
					contact : newCustomer[0].contact
				});

				user.save(function(err, data) {
					if(err) {
						console.log("err :: " + err);
						json_responses = {"status" : 401, "error" : "error occurred while executing save query"};
						res(null, JSON.stringify(json_responses));
					} else {
						console.log("Customer Added!");
						json_responses = {"status" : 200};
						res(null, JSON.stringify(json_responses));
					}
				});
			}
		}
	});
}

exports.editCustomer = function(req, res) {

	console.log("editCustomer");
	var c_id = req.c_id;
	var fname = req.fname;
	var lname = req.lname;
	var email = req.email;
	var address = req.address;
	var city = req.city;
	var state = req.state;
	var zipcode = req.zipcode;
	var contact = req.contact;

	User.findOne({c_id : c_id}, function(err, result){
		if(err) {
			console.log("err :: " + err);
			json_responses = {"status" : 401, "error" : "error occurred while executing find query"};
			res(null, JSON.stringify(json_responses));
		} else {
			console.log("result finding a customer");
			console.log(result);
			if(result) {
				console.log("customer exist");
				result.fname = fname;
				result.lname = lname,
				result.email = email;
				result.address = address;
				result.city = city;
				result.state = state;
				result.zipcode = zipcode;
				result.contact = contact;

				result.save(function(err, doc) {
					if(err) {
						console.log("err :: " + err);
						json_responses = {"status" : 401, "error" : "error occurred while executing edit query"};
						res(null, JSON.stringify(json_responses));		
					} else {
						console.log("customer edited!");
						json_responses = {"status" : 200};
						res(null, JSON.stringify(json_responses));
					}
				});
			}
		}
	});
}

exports.deleteCustomer = function(req, res ) {
	console.log("delete customer");
	var c_id = req.c_id;

	User.remove({c_id : c_id}, function(err, result) {
		if(err) {
			console.log("err :: " + err);
			json_responses = {"status" : 401, "error" : "error occurred while executing remove query"};
			res(null, JSON.stringify(json_responses));
		} else {
			console.log("result removing a customer");
			console.log(result);
			if(result) {
				console.log("customer deleted!");
				json_responses = {"status" : 200};
				res(null, JSON.stringify(json_responses));
			} else {
				json_responses = {"status" : 401, "error" : "error occurred while executing delete query"};
				res(null, JSON.stringify(json_responses));
			}
		}
	})

	/*User.findOne({c_id : c_id}, function(err, result) {
		if(err) {
			console.log("err :: " + err);
			json_responses = {"status" : 401, "error" : "error occurred while executing find query"};
			res(null, JSON.stringify(json_responses));
		} else {
			console.log("result finding a customer");
			console.log(result);
			if(result) {
				console.log("customer exist");

				result.isActive =false;

				result.save(function(err, doc) {
					if(err) {
						console.log("err :: " + err);
						json_responses = {"status" : 401, "error" : "error occurred while executing delete query"};
						res(null, JSON.stringify(json_responses));		
					} else {
						console.log("customer deleted!");
						json_responses = {"status" : 200};
						res(null, JSON.stringify(json_responses));
					}
				});
			}
		}
	});*/
}
