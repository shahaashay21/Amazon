var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection("mongodb://localhost/amazon");
autoIncrement.initialize(connection);

var userSchema = mongoose.Schema({
	c_id: {type: Number, required: true, index: true},
	fname: {type: String, required: true},
	lname: {type: String, required: true},
	email: {type: String, required: true},
	pass: {type: String, required: true},
	address: {type: String},
	zipCode: Number,
	city: String,
	state: String,
	contacts: [String],
	cardDetails: [String],
},
{
	collection: 'users',
    timestamps: true,
    versionKey: false
});


userSchema.plugin(autoIncrement.plugin, {
	model: 'User',
    field: 'c_id',
    startAt: 100000001,
    incrementBy: 1});

var User = connection.model('User', userSchema);

module.exports = User;