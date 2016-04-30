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

var farmerSchema = mongoose.Schema({
	f_id: {type: Number, required: true, index: true},
	isActive : {type: Boolean, default: true},
	fname: {type: String, required: true},
	lname: {type: String, required: true},
	email: {type: String, required: true},
	pass: {type: String, required: true},
	address: {type: String, required: true},
	city: {type: String, required: true},
	state: {type: String, required: true},
	zipcode: {type: Number, required:true},
	contacts: [Number],
	reviews: [reviewSchema],
	intro: {type: String, required: true},
	video: String,
	tax: {type: Number, required: true}
},{
	collection: 'farmers',
    timestamps: true,
    versionKey: false
});


farmerSchema.plugin(autoIncrement.plugin, {
	model: 'Farmer',
    field: 'f_id',
    startAt: 200000001,
    incrementBy: 1});

var Farmer = mongoose.model('Farmer', farmerSchema);

module.exports = Farmer;