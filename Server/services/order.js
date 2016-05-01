var Order = require('./model/order');
var OrderDetail = require('./model/orderdetail');
var Product = require('./model/product');
var User = require('./model/user');
var cart = require('./cart');

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
			// console.log(itemAvailFlag);
			if(itemAvailFlag == 'false'){
				// console.log('baddhu barabar');
				//ALL QUANTITY IS AVAILABLE, NOW WE CAN DO FURTHER
				//EVERY LOGIC FOR ORDER
				User.findOne({c_id: c_id.c_id}, 'address city zipcode state contact', function(err, u){
					console.log(u);
					console.log(u.contact);

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
						console.log(dataToStore);
					})
					// order_detail = 
				})
				returnData = { 'suc': 'true'};
				callback(null, JSON.stringify(returnData));
			}else{

			}
		})
	});
};
