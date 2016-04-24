
var mongoose = require('mongoose');

var orderSchema = mongoose.Schema({
	o_id: {type: Number, required: true, index: true},
	c_id: {type: Number, required: true},
	driver_id: {type: Number, required: true},
	address: {type: String},
	contacts: [String],
	date: Date,
	sub_total: Number,
	tax: Number,
	ship_cost: Number,
	estimate_delivery_time: Number,
	pickup_time: Date,
	drop_time: Date,
	distance: Number,
	order_time: Number,
},{collection: 'orders'});

var Order = mongoose.model('Order', orderSchema);

module.exports = Order;
