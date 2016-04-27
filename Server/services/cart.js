// var Product = require('./model/product');
var Cart = require('./model/cart');


exports.cartItems = function(req, callback){
	c_id = req.c_id;

	Cart.find({c_id: c_id}, function(err, items){
		
	});

	// Cart.find({c_id: c_id}).populate('p_id').exec(function(err, items){
	// 	console.log(err);
	// 	console.log(items);
	// 	callback(null, JSON.stringify(items));
	// });

	// Cart.populate({path: 'p_id', model: 'Product'}, function(err, items){
	// 	console.log(err);
	// 	console.log(items);
	// })
}

exports.addItem = function(req, callback){
	p_id = req.p_id;
	quantity = req.quantity;
	c_id = req.c_id;

	find_query = {p_id: p_id, c_id: c_id};
	Cart.findOne(find_query, function(err, available){
		console.log(available);
		if(available){
			newQuantity = Number(Number(available.qty) + Number(quantity));
			available.qty = newQuantity;
			available.save(function(err){
				if(err) throw err;
				callback(null, JSON.stringify('True'));	
			});
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
};