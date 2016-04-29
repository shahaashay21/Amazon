//Required Files
var mq = require('../rpc/client');

//create and order
exports.createOrder = function(req, res) {

	var test = "test";

	console.log("in createorder");

	//messege payload for sending to server
	msg_payload = {"service" : "createOrder", "test" : test};

	//making request to the server
	mq.make_request('order-queue', msg_payload, function(err, results) {
		if(err) {
			console.log("Error occurred while requesting to server for createorder : " + err);
			var json_resposes = {"statusCode" : 401, "error" : "Could not connect to server"};
			res.send(json_resposes);
		} else
			console.log("order created successfully");
			res.send(JSON.parse(results));
	});

var Cart = require('./model/cart.js');

exports.home = function(req, res){
	user = req.session.user.c_id;

	if(typeof req.session.user != 'undefined'){
		// console.log(req.session.user);
		res.render('order', { user: req.session.user });
	}else{
		res.redirect('/');
	}
}