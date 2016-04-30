var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection("mongodb://localhost/amazon");
autoIncrement.initialize(connection);

var reviewSchema = mongoose.Schema({
	rating: {type: Number, required: true},
	review_title: {type: String, required: true},
	review_desc: {type:String, required:true}
});


var productSchema = mongoose.Schema({
	p_id: {type: Number, required: true, index: true},
	f_id: {type: Number, required: true},
	f_name: {type: String, required: true},
	cat_id: {
		type: Number
	},
	name: {type: String, required: true},
	price: {type: String, required: true},
	weight: Number,
	price_unit: String,
	unit: {type: String, required: true},
	product_img: String,
	images: [{type: String}],
	reviews: [reviewSchema],
	details: {type: String},
	description: String,
	features: {type: String, required: true},
	quantity: {type: Number, required: true},
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
