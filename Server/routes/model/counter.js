var mongoose = require('mongoose');

var counterSchema = mongoose.Schema({
	table_name: String,
	lastid: Number
},{collection: 'counter'});

var Counter = mongoose.model('Counter',counterSchema);

module.exports = Counter