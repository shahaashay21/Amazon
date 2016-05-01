//Required Files
var mq = require('../rpc/client');

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
	User.find({c_id: req.session.user.c_id, 'cardDetails.default_card': 'true'}, 'cardDetails', function(err, ans){
		User.findOne({c_id: req.session.user.c_id}, 'address', function(err, address){
			
			console.log(typeof address.address);
			if(typeof address.address != 'undefined'){
				isAddress = 'yes';
				console.log(address.address);
			}else{
				isAddress = 'no';
			}
			if(ans.length > 0){
				isCard = 'yes';
			}else{
				isCard = 'no';
			}
			console.log(isAddress);
			if(ans.length > 0){
				cardinfo = ans[0].cardDetails[0];

				x = cardinfo.card_number.toString();
				lastFourDigit = x.substring(x.length - 4);

				res.render('order', { user: req.session.user, 'cardDetails':  cardinfo, 'lastFourDigit': lastFourDigit, 'isCard': isCard, 'isAddress': isAddress});	
			}else{
				res.render('order', { user: req.session.user, 'isCard': isCard, 'isAddress': isAddress});	
			}
		})
	})
	
}