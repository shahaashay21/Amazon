var Order = require('./model/order');
var OrderDetail = require('./model/orderdetail');
var cart = require('./cart');

exports.createOrder = function(req, callback) {
	console.log("create Order");
	console.log(req.drop_time);
	console.log(req.user);
	var x = {c_id: req.user.c_id};
	cart.cartItems(x,function(res, ans){
		console.log(ans);
	})
	callback(null, JSON.stringify('yes'));
};
