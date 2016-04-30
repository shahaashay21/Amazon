var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection("mongodb://localhost/amazon");
autoIncrement.initialize(connection);

var contactsSchema = mongoose.Schema({
	number: {type: String, required: true},
	default_card: {type:String, required:true, default: 'false'}
});

var cardDetailsSchema = mongoose.Schema({
	card_number: {type: Number, required: true},
	name_on_card: {type: String, required: true},
	exp_month: {type:Number, required:true},
	exp_year: {type:Number, required:true},
	cvv: {type:Number, required:true},
	default_card: {type:String, required:true, default: 'false'}
});

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
	contacts: [contactsSchema],
	cardDetails: [cardDetailsSchema],
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