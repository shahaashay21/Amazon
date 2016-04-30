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

//creating admin model for mysql connection using sequelize

//mysql
//var mysql = require('mysql');
//var Sequelize = require('sequelize');
//var sequelize = mysql.Sequelize;
var mysql = require('../mysql');
var sequelize = mysql.sequelize;
var Sequelize = require('sequelize');

var admin = sequelize.define('admin', {
	a_id : {
		type : Sequelize.INTEGER(9).ZEROFILL,
		field : 'a_id',
		//autoIncrement : true,
		primaryKey : true
	},
	fname : {
		type : Sequelize.STRING,
		field : 'fname',
		allowNull : false
	},
	lname : {
		type : Sequelize.STRING,
		field : 'lname',
		allowNull : true
	},
	email : {
		type : Sequelize.STRING,
		field : 'email',
		allowNull : false,
		unique : true
	},
	pass : {
		type : Sequelize.STRING,
		field : 'pass',
		allowNull : false
	},
	address : {
		type : Sequelize.TEXT,
		field : 'address',
		allowNull : true
	},
	city : {
		type : Sequelize.STRING,
		field : 'city',
		required : false
	},
	state : {
		type : Sequelize.STRING,
		field : 'state',
		required : false
	},
	zipCode : {
		type : Sequelize.INTEGER(11),
		field : 'zipCode',
		required : false
	},
	createdAt : {
		type : Sequelize.DATE,
		field : 'createdAt',
		defaultValue : Sequelize.fn('now')
	},
	updatedAt : {
		type : Sequelize.DATE,
		field : 'updatedAt',
		defaultValue : Sequelize.fn('now')
	}
}, {
	timestamps : false,
	freezeTableName : true
});



module.exports = admin;