var mongoose = require('mongoose');

var orderDetailSchema = mongoose.Schema({
	o_id: {
		type: Number, 
		required: true, 
		index: true
		//ref: 'Order.o_id'
	},
	p_id: {
		type: Number, 
		required: true
		//ref: 'Product.p_id'
	},
	f_id: {
		type: Number, 
		required: true
		//ref: 'Farmer.f_id'
	},
	qty: Number,
	price: Number,
},{
	collection: 'orderdetails',
    versionKey: false
});

var OrderDetail = mongoose.model('OrderDetail', orderDetailSchema);

module.exports = OrderDetail;
