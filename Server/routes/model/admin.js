var mongoose = require('mongoose');

var adminSchema = mongoose.Schema({
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
	createdAt: Date,
	updatedAt: Date,
},{collection: 'admin'});

var Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;