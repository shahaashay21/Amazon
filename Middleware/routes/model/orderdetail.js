var mongoose = require('mongoose');

var orderDetailSchema = mongoose.Schema({
	o_id: {type: Number, required: true, index: true},
	p_id: {type: Number, required: true},
	f_id: {type: Number, required: true},
	qty: Number,
	price: Number,
},{collection: 'orderdetails'});

var OrderDetail = mongoose.model('OrderDetail', orderDetailSchema);

module.exports = OrderDetail;
