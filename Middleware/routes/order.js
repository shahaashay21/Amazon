//Required Files
var mq = require('../rpc/client');
var resGen = require('./commons/responseGenerator');
var ejs = require("ejs");





//get Order Details


exports.orderDetails = function(req,res){

	var msg_payload = {
		"service":"orderDetails",
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
				console.log("reply from orderDetails");
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
	User.findOne({c_id: req.session.user.c_id}, 'city state zipcode address card_number name_on_card', function(err, ans){
		// User.findOne({c_id: req.session.user.c_id}, 'address', function(err, address){
			console.log(ans);
			// console.log(typeof ans.address);
			if(typeof ans.address != 'undefined'){
				isAddress = 'yes';
				// console.log(ans.address);
			}else{
				isAddress = 'no';
			}
			// console.log(isAddress);
			if(typeof ans.card_number != 'undefined'){
				// cardinfo = ans[0].cardDetails[0];
				isCard = 'yes';
				name_on_card = ans.name_on_card;

				x = ans.card_number.toString();
				lastFourDigit = x.substring(x.length - 4);
				// console.log(lastFourDigit);
				res.render('order', { user: req.session.user, 'cardinfo':  ans, 'lastFourDigit': lastFourDigit, 'isCard': isCard, 'isAddress': isAddress});	
			}else{
				isCard = 'no';
				res.render('order', { user: req.session.user, 'isCard': isCard, 'isAddress': isAddress});	
			}
		// })
	})
	
}

exports.getPending = function(req, res) {
	console.log("pending orders");

	if(req.session.email) {
		//messege payload for sending to server
        msg_payload = {"service" : "getPending"};

        //making request to the server
        mq.make_request('order_queue', msg_payload,function(err, results) {
          if(err) {
            console.log("Error occurred while requesting to server for getPending : " + err);
            var json_resposes = {"status" : 401, "error" : "Could not connect to server"};
            res.send(json_resposes);
          } else {
              res.send(JSON.parse(results));
          }
        });
	} else {
		res.redirect('/admin/login'); 		
	}
}

exports.getInProgress = function(req, res) {
	console.log("in progress orders");

	if(req.session.email) {
		//messege payload for sending to server
        msg_payload = {"service" : "getInProgress"};

        //making request to the server
        mq.make_request('order_queue', msg_payload,function(err, results) {
          if(err) {
            console.log("Error occurred while requesting to server for getInProgress : " + err);
            var json_resposes = {"status" : 401, "error" : "Could not connect to server"};
            res.send(json_resposes);
          } else {
              res.send(JSON.parse(results));
          }
        });
	} else {
		res.redirect('/admin/login'); 		
	}
}

exports.getComplete = function(req, res) {
	console.log("complete orders");

	if(req.session.email) {
		//messege payload for sending to server
        msg_payload = {"service" : "getComplete"};

        //making request to the server
        mq.make_request('order_queue', msg_payload,function(err, results) {
          if(err) {
            console.log("Error occurred while requesting to server for getComplete : " + err);
            var json_resposes = {"status" : 401, "error" : "Could not connect to server"};
            res.send(json_resposes);
          } else {
              res.send(JSON.parse(results));
          }
        });
	} else {
		res.redirect('/admin/login'); 		
	}
}

exports.getCancel = function(req, res) {
	console.log("cancel orders");
	if(req.session.email) {
		//messege payload for sending to server
        msg_payload = {"service" : "getCancel"};

        //making request to the server
        mq.make_request('order_queue', msg_payload,function(err, results) {
          if(err) {
            console.log("Error occurred while requesting to server for getCancel : " + err);
            var json_resposes = {"status" : 401, "error" : "Could not connect to server"};
            res.send(json_resposes);
          } else {
              res.send(JSON.parse(results));
          }
        });
	} else {
		res.redirect('/admin/login'); 		
	}
}