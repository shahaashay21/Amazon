var mongoose = require('mongoose');

var farmerSchema = mongoose.Schema({
	f_id: {type: Number, index: true},
	fname: {type: String, required: true},
	lname: {type: String, required: true},
	email: {type: String, required: true},
	pass: {type: String, required: true},
	address: {type: String},
	city: String,
	state: String,
	zipCode: Number,
	contacts: [String],
	ratings: [Schema.Types.Mixed],
	reviews: [Schema.Types.Mixed],
	intro: String,
	createdAt: Date,
	updatedAt: Date,
},{collection: 'farmers', _id: false});

var Farmer = mongoose.model('Farmer', farmerSchema);

module.exports = Farmer;