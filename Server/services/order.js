var Order = require('./model/order');
var OrderDetail = require('./model/orderdetail');
var Product = require('./model/product');
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
	// console.log("create Order");
	// console.log(req.drop_time);
	// console.log(req.user);
	var c_id = {c_id: req.user.c_id};
	cart.cartItems(c_id, function(res, ans){
		// console.log(ans);
		ans = JSON.parse(ans);
		items = ans.items;
		totalEachitem = ans.totalEachitem;
		cartItemDetails = ans.cartItemDetails;
		itemAvailFlag = 'false';
		function checkRemainItems(i, callAgain){
			if(i < items.length){
				Product.findOne({p_id: items[i].p_id}, 'quantity', function(err, q){
					// console.log(q.quantity);
					if(q.quantity < cartItemDetails[i].qty){
						// console.log(items[i].name);
						itemAvailFlag = 'true';
						returnData = { 'suc': 'false', itemName: items[i].name.toUpperCase(), 'availableQuant': q.quantity };
						callback(null, JSON.stringify(returnData));
					}
					checkRemainItems( i+1, callAgain );
				})
			}
			else{
				callAgain();
			}
		}

		//CHECK WHETHER QUNTITY IS AVAILABLE OR NOT
		checkRemainItems(0, function(){
			console.log(itemAvailFlag);
			if(itemAvailFlag == 'false'){
				console.log('baddhu barabar');
			}else{
				//ALL QUANTITY IS AVAILABLE, NOW WE CAN DO FURTHER
				//EVERY LOGIC FOR ORDER
				returnData = { 'suc': 'true'};
				callback(null, JSON.stringify(returnData));
			}
		})
	});
};
