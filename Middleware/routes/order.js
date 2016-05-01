//Required Files
var mq = require('../rpc/client');




exports.getOrders = function(req,res){

	var msg_payload = {
		"service":"getOrders",
		 "c_id": req.session.user.c_id ,
		 "sid":req.sessionID};
			console.log(req.session.user.c_id);
  	mq.make_request('order_queue', msg_payload, function(err,doc){
		if(err)
		{
		    console.log(err);
			res.send(resGen.responseGenerator(401, null));
		}
		else
		{
			doc = JSON.parse(doc);
			if(doc.status == 200){
				console.log("reply from getOrders");
				res.send(doc);
			}
			else
			{
				res.send(resGen.responseGenerator(401, null));
			}
		}
	});
}







//create and order
exports.createOrder = function(req, res) {

	console.log("in createorder");
	drop_time = req.param('drop_time');
	console.log(req.session.user);
	//messege payload for sending to server
	msg_payload = {"service" : "createOrder", "drop_time" : drop_time, 'user': req.session.user};
	console.log(msg_payload);
	//making request to the server
	mq.make_request('order_queue', msg_payload, function(err, results) {
		if(err) {
			console.log("Error occurred while requesting to server for createorder : " + err);
			var json_resposes = {"statusCode" : 401, "error" : "Could not connect to server"};
			res.send(json_resposes);
		} else {
			console.log("order created successfully");
			res.send(JSON.parse(results));
		}
	});
}

var Cart = require('./model/cart.js');
var User = require('./model/user');

exports.home = function(req, res){
	User.findOne({c_id: req.session.user.c_id}, 'address card_number name_on_card', function(err, ans){
		// User.findOne({c_id: req.session.user.c_id}, 'address', function(err, address){
			console.log(ans);
			console.log(typeof ans.address);
			if(typeof ans.address != 'undefined'){
				isAddress = 'yes';
				console.log(ans.address);
			}else{
				isAddress = 'no';
			}
			console.log(isAddress);
			if(typeof ans.card_number != 'undefined'){
				// cardinfo = ans[0].cardDetails[0];
				isCard = 'yes';
				name_on_card = ans.name_on_card;

				x = ans.card_number.toString();
				lastFourDigit = x.substring(x.length - 4);

				res.render('order', { user: req.session.user, 'name_on_card':  name_on_card, 'lastFourDigit': lastFourDigit, 'isCard': isCard, 'isAddress': isAddress});	
			}else{
				isCard = 'no';
				res.render('order', { user: req.session.user, 'isCard': isCard, 'isAddress': isAddress});	
			}
		// })
	})
	
}