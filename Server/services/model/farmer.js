var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection("mongodb://localhost/amazon");
autoIncrement.initialize(connection);

var farmerSchema = mongoose.Schema({
	f_id: {type: Number, required: true, index: true},
	isActive : {type: Boolean, default: true},
	fname: {type: String, required: true},
	lname: {type: String, required: true},
	email: {type: String, required: true},
	pass: {type: String, required: true},
	address: {type: String},
	city: String,
	state: String,
	zipCode: Number,
	contacts: [Number],
	ratings: [Schema.Types.Mixed],
	reviews: [Schema.Types.Mixed],
	intro: String,
},{
	collection: 'farmers'
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