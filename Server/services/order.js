var Order = require('./model/order');
var OrderDetail = require('./model/orderdetail');
var cart = require('./cart');





exports.getOrders = function(req, res){
	
	console.log("cid :: "+ req.c_id);
	//var cid = req.c_id;
	
	Order.find({c_id:req.c_id},function(err,results){
		console.log(results);

		if(err)
		{

			resGen.error(err,res);
		}
		else
		{
			console.log(results);
			
			if(results){
				console.log("Orders found");
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
