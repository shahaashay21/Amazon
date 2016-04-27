var mongoose = require('mongoose');

var cartSchema = mongoose.Schema({
	c_id: {
		type: Number, 
		required: true, 
		index: true
	},
	p_id: {
		type: Number, 
		ref: 'Product.p_id'
	},
	qty: Number,
},{
	collection: 'cart',
	versionKey: false
});

var Cart = mongoose.model('Admin', cartSchema);

module.exports = Cart;
