var Order = require('./model/order');
var Product = require('./model/product');
var User = require('./model/user');
var Cart = require('./model/cart');
var cart = require('./cart');
var resGen = require('./commons/responseGenerator');




exports.orderDetails = function(req, res){
	
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
				console.log("order Details found");
				res.code = "200";
				res.value = "Found";
				res.object = results;
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
	availableProductQuant = [];
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
					availableProductQuant[i] =  q.quantity;
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
			// console.log(itemAvailFlag);
			if(itemAvailFlag == 'false'){
				// console.log('baddhu barabar');
				//ALL QUANTITY IS AVAILABLE, NOW WE CAN DO FURTHER
				//EVERY LOGIC FOR ORDER
				User.findOne({c_id: c_id.c_id}, 'address city zipcode state contact', function(err, u){
					// console.log(u);

					allItemDetail = [];
					function itemDetail(i, callItemDetail){
						if(i < items.length){
							eachItemDetail = {
									p_id: items[i].p_id,
									f_id: items[i].f_id,
									'qty': cartItemDetails[i].qty,
									'price': totalEachitem[i].total
								}
							allItemDetail[i] = eachItemDetail;
							itemDetail( i+1, callItemDetail);
						}else{
							callItemDetail();
						}
					}

					itemDetail(0, function(){
						o = new Order();
						dataToStore = {
							c_id: c_id.c_id,
							order_detail: allItemDetail,
							address: u.address,
							zipcode: u.zipcode,
							city: u.city,
							state: u.state,
							contact: u.contact,
							sub_total: ans.grandTotal,
							tax: ans.tax,
							ship_cost: ans.delivery_charge,
							total: ans.finalTotal,
							drop_time: req.drop_time
						}

						//DATA TO STORE
						o.c_id = dataToStore.c_id;
						o.order_detail = dataToStore.order_detail;
						o.address = dataToStore.address;
						o.zipcode = dataToStore.zipcode;
						o.city = dataToStore.city;
						o.state = dataToStore.state;
						o.contact = dataToStore.contact;
						o.sub_total = dataToStore.sub_total;
						o.tax = dataToStore.tax;
						o.ship_cost = dataToStore.ship_cost;
						o.total = dataToStore.total;
						o.drop_time = dataToStore.drop_time;

						o.save(function (err){
							// console.log(err);
							Cart.remove({c_id: c_id.c_id}, function(err){

								function updateQuant(i,callUpdateQuant){
									if(i < items.length){
										decrementItemQuant = Number('-'+cartItemDetails[i].qty);
										// console.log(decrementItemQuant);
										Product.update({p_id: items[i].p_id},{$inc: {'quantity': decrementItemQuant}}, function(err, up){
											updateQuant( i+1, callUpdateQuant);
										});
									}else{
										callUpdateQuant();
									}
								}

								updateQuant(0, function(){
									returnData = { 'suc': 'true'};
									callback(null, JSON.stringify(returnData));
								});
							});
						});
						// console.log(dataToStore);
						// o = new Order();

					});
				})
			}else{

			}
		})
	});
};

/*
-------Created by Darshil Saraiya 5/01/16-------
-------Order related operations-------
*/

exports.getPending = function(req, res) {
	console.log("pending orders");

	Order.find({status : "pending"}, function(err, results) {
		if(err) {
			console.log("err :: " + err);
			json_responses = {"status" : 401, "error" : "error occurred while executing find query"};
			res(null, JSON.stringify(json_responses));
		} else {
			console.log(results);
			if(results != null && results.length > 0) {
				console.log("All Pending Orders Found!");
				json_responses = {"status" : 200, "data" : results};
				res(null, JSON.stringify(json_responses));

			} else {
				json_responses = {"status" : 401, "error" : "no data found"};
				res(null, JSON.stringify(json_responses));
			}
		}
	});
}

exports.assignDriverId = function(req, res) {
	console.log("assignDriverId");

	Order.update({"o_id" : req.o_id}, {"$set" : {"driver_id" : req.driver_id, "status" : "inprogress"}}, function(err, results) {
		console.log("err :: " + err);
		console.log(results);
		if(err) {
			console.log("err :: " + err);
			json_responses = {"status" : 401, "error" : "error occurred while executing update query"};
			res(null, JSON.stringify(json_responses));
		} else {
			if(results !=null) {
				console.log("Pending Order Updated!");
				json_responses = {"status" : 200};
				res(null, JSON.stringify(json_responses));
			}
		}
<<<<<<< HEAD
	});*/

	Order.update({"o_id" : req.o_id}, {"$set" : {"driver_id" : req.driver_id, "status" : "inprogress"}}, function(err, results) {
=======
	});
/*	Order.update({"o_id" : req.o_id}, {"$set" : {"driver_id" : req.driver_id, "status" : "cancel"}}, function(err, results) {
>>>>>>> d54dc5e0163fd07fc526c267793f5b7a050f38b5
		console.log("err :: " + err);
		console.log(results);
		if(err) {
			console.log("err :: " + err);
			json_responses = {"status" : 401, "error" : "error occurred while executing update query"};
			res(null, JSON.stringify(json_responses));
		} else {
			if(results !=null) {
				console.log("Pending Order Updated!");
				json_responses = {"status" : 200};
				res(null, JSON.stringify(json_responses));
			}
		}
	});*/
}

exports.getInProgress = function(req, res) {
	console.log("in progress orders");

	Order.find({status : "inprogress"}, function(err, results) {
		if(err) {
			console.log("err :: " + err);
			json_responses = {"status" : 401, "error" : "error occurred while executing find query"};
			res(null, JSON.stringify(json_responses));
		} else {
			console.log(results);
			if(results != null && results.length > 0) {
				console.log("All In Progress Orders Found!");
				json_responses = {"status" : 200, "data" : results};
				res(null, JSON.stringify(json_responses));

			} else {
				json_responses = {"status" : 401, "error" : "no data found"};
				res(null, JSON.stringify(json_responses));
			}
		}
	});
}

exports.assignComplete = function(req, res) {
	console.log("assignComplete");

	Order.update({"o_id" : req.o_id}, {"$set" : {"status" : "complete"}}, function(err, results) {
		console.log("err :: " + err);
		console.log(results);
		if(err) {
			console.log("err :: " + err);
			json_responses = {"status" : 401, "error" : "error occurred while executing update query"};
			res(null, JSON.stringify(json_responses));
		} else {
			if(results !=null) {
				console.log("In Progress Order Updated to Complete!");
				json_responses = {"status" : 200};
				res(null, JSON.stringify(json_responses));
			}
		}
	});
}

exports.getComplete = function(req, res) {
	console.log("complete orders");

	Order.find({status : "complete"}, function(err, results) {
		if(err) {
			console.log("err :: " + err);
			json_responses = {"status" : 401, "error" : "error occurred while executing find query"};
			res(null, JSON.stringify(json_responses));
		} else {
			console.log(results);
			if(results != null && results.length > 0) {
				console.log("All Complete Orders Found!");
				json_responses = {"status" : 200, "data" : results};
				res(null, JSON.stringify(json_responses));

			} else {
				json_responses = {"status" : 401, "error" : "no data found"};
				res(null, JSON.stringify(json_responses));
			}
		}
	});

}

exports.getCancel = function(req, res) {
	console.log("cancel orders");

	Order.find({status : "cancel"}, function(err, results) {
		if(err) {
			console.log("err :: " + err);
			json_responses = {"status" : 401, "error" : "error occurred while executing find query"};
			res(null, JSON.stringify(json_responses));
		} else {
			console.log(results);
			if(results != null && results.length > 0) {
				console.log("All cancel Orders Found!");
				json_responses = {"status" : 200, "data" : results};
				res(null, JSON.stringify(json_responses));

			} else {
				json_responses = {"status" : 401, "error" : "no data found"};
				res(null, JSON.stringify(json_responses));
			}
		}
	});
	
}