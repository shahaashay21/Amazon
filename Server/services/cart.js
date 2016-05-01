var Product = require('./model/product');
var Cart = require('./model/cart');
var Farmer = require('./model/farmer');


exports.cartItems = function(req, callback){
	c_id = req.c_id;
	// console.log(c_id);
	Cart.find({c_id: c_id}).sort('p_id').exec(function(err, cartItemDetails){
		p_id_array = [];
		for(var i=0; i<cartItemDetails.length; i++){
			p_id_array[i] = cartItemDetails[i].p_id;
		}

		// console.log(p_id_array);
		//console.log(cartItemDetails);
		Product.find({'p_id': { $in: p_id_array }}).sort('p_id').exec(function(err, items){

			totalItems = 0;
			totalEachitem = [];
			grandTotal = 0;
			// console.log(items);
			for(var i=0; i<items.length; i++){
				totalEachitem[i] = {};
				totalItems += cartItemDetails[i].qty;
				totalEachitem[i].total = (Number(cartItemDetails[i].qty) * Number(items[i].price)).toFixed(2);
				grandTotal += Number(totalEachitem[i].total);
			}
			grandTotal = (parseFloat(grandTotal)).toFixed(2);
			returnData = { 'cartItemDetails': cartItemDetails, 'items': items, 'qty': totalItems, 'totalEachitem': totalEachitem, 'grandTotal': grandTotal };
			otherCharge(returnData, function(err, dataToReturn){
				finalTotal = (Number(grandTotal) + Number(dataToReturn.tax) + Number(dataToReturn.delivery_charge));
				finalTotal = finalTotal.toFixed(2);
				returnData = { 
					'cartItemDetails': cartItemDetails,
					'items': items, 'qty': totalItems,
					'totalEachitem': totalEachitem,
					'grandTotal': grandTotal,
					'tax': dataToReturn.tax,
					'delivery_charge': dataToReturn.delivery_charge,
					'finalTotal': finalTotal
				};
				callback(null, JSON.stringify(returnData));
			});
		});
	});
}


function otherCharge(req, callback){
	items = req.items;
	totalEachitem = req.totalEachitem;
	totalTax = 0;
	function taxChargeLoop(i, callAgain){
		if(i < items.length){
			f_id = items[i].f_id;
			Farmer.findOne({f_id: f_id}, 'tax', function(err, tax){
				// console.log(tax);
				// console.log(totalEachitem[i].total);

				taxEachItem = Number(( Number(totalEachitem[i].total) * Number(tax.tax) ) / 100 );
				// console.log(taxEachItem);
				totalTax += taxEachItem;
				taxChargeLoop( i+1, callAgain);
				
			})
		}else{
			callAgain();
		}
	}
	taxChargeLoop(0, function(){
		totalTax = totalTax.toFixed(2);
		delivery_charge = '5.00';
		returnData = { tax: totalTax, delivery_charge: delivery_charge };
		callback(null, returnData);
	});
}

exports.addItem = function(req, callback){
	p_id = req.p_id;
	quantity = req.quantity;
	c_id = req.c_id;
	quantity = Number(quantity);
	find_query = {p_id: p_id, c_id: c_id};

	//IF QUANTITY IS 0 THEN REMOVE ITEM
	// console.log(Number(quantity));
	if(Number(quantity) == 0){
		deleteItem(find_query, function(err, ans){
			callback(null, JSON.stringify('True'));
		});
	}else{
		Cart.findOne(find_query, function(err, available){
			// console.log(available);
			if(available){
				newQuantity = Number(Number(available.qty) + Number(quantity));
				//AFTER EVALUATION IF QUANTITY IS 0 THEN REMOVE ITEM
				if(newQuantity == 0){
					deleteItem(find_query, function(err, ans){
						callback(null, JSON.stringify('True'));
					});
				}else{
					available.qty = newQuantity;
					available.save(function(err){
						if(err) throw err;
						callback(null, JSON.stringify('True'));	
					});
				}
			}else{
				cart = new Cart();
				cart.c_id = c_id;
				cart.p_id = p_id;
				cart.qty = quantity;
				cart.save(function(err){
					if(err) throw err;
					callback(null, JSON.stringify('True'));
				})
			}
		})
	}
};

function deleteItem(req, callback){
	// p_id = req.p_id;
	// c_id = req.c_id;
	// find_query = {p_id: p_id, c_id: c_id};
	// console.log('remove item');
	Cart.remove(req, function(err){
		callback(null, 'done');
	});
}

exports.deleteItem = deleteItem;
exports.otherCharge = otherCharge;