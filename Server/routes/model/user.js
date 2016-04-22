var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	c_id: {type: Number, index: true},
	fname: {type: String, required: true},
	lname: {type: String, required: true},
	email: {type: String, required: true},
	pass: {type: String, required: true},
	address: {type: String},
	city: String,
	state: String,
	zipCode: Number,
	contacts: [String],
	cardDetails: [String],
	createdAt: Date,
	updatedAt: Date,
},{collection: 'users', _id: false});

var User = mongoose.model('User', userSchema);

module.exports = User;