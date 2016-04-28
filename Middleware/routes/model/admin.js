var mongoose = require('mongoose');

var autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection("mongodb://localhost/amazon");
autoIncrement.initialize(connection);

var adminSchema = mongoose.Schema({
	a_id: {type: Number, required: true, index: true},
	fname: {type: String, required: true},
	lname: {type: String, required: true},
	email: {type: String, required: true},
	pass: {type: String, required: true},
	address: {type: String},
	zipcode: Number,
	city: String,
	state: String,
	contacts: [Number]
},{
	collection: 'admin',
    timestamps: true,
    versionKey: false
});

adminSchema.plugin(autoIncrement.plugin, {
	model: 'Admin',
    field: 'a_id',
    startAt: 300000001,
    incrementBy: 1});

var Admin = connection.model('Admin', adminSchema);

module.exports = Admin;