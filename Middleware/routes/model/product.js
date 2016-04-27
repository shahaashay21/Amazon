var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection("mongodb://localhost/amazon");
autoIncrement.initialize(connection);

var productSchema = mongoose.Schema({
	p_id: {type: Number, required: true, index: true},
	name: {type: String, required: true},
	cat_id: {
		type: Number,
		ref: 'Category.cat_id'
	},
	price: {type: String, required: true},
	weight: {type: String, required: true},
	details: {type: String},
	price_unit: String,
	unit: String,
	product_img: String,
	short_description: String,
	description: String,
	ratings: [Schema.Types.Mixed],
	reviews: [Schema.Types.Mixed],
	isActive: {type: Boolean, default: true}
},{
	collection: 'products',
    timestamps: true,
    versionKey: false
});

productSchema.plugin(autoIncrement.plugin, {
	model: 'Product',
    field: 'p_id',
    startAt: 500000001,
    incrementBy: 1});

var Product = connection.model('Product', productSchema);

module.exports = Product;
