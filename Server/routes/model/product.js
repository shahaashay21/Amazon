var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
	p_id: {type: Number, required: true, index: true},
	name: {type: String, required: true},
	cat_id: Number,
	price: {type: String, required: true},
	weight: {type: String, required: true},
	details: {type: String},
	unit: String,
	description: String,
	ratings: [Schema.Types.Mixed],
	reviews: [Schema.Types.Mixed],
},{collection: 'products'});

var Product = mongoose.model('Product', productSchema);

module.exports = Product;
