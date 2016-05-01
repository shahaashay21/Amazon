var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection("mongodb://localhost/amazon");
autoIncrement.initialize(connection);

var reviewSchema = mongoose.Schema({
	username: {type: String, required: true},
	rating: {type: Number, required: true},
	review_title: {type: String, required: true},
	review_desc: {type:String, required:true}
});

var farmerSchema = mongoose.Schema({
	f_id: {type: Number, required: true, index: true},
	isActive : {type: Boolean, default: false},
	fname: {type: String, required: true},
	lname: {type: String, required: true},
	email: {type: String, required: true},
	pass: {type: String, required: true},
	intro: {type: String, required: true, default: "Hello!"},
	video: String,
	tax: {type: Number, required: true, default: 5},
	contacts: Number,
	address: {type: String, required: true, default: "Type Address Here"},
	city: {type: String, required: true, default: "Your City"},
	state: {type: String, required: true, default: "Your State"},
	zipcode: {type: Number, required:true, default: 12345},
	reviews: [reviewSchema],
	isAvailable: {type: Boolean, default:true}
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