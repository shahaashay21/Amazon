var Sequelize = require('sequelize');

var sequelize = new Sequelize('amazon', 'root', '', {
	  host: 'localhost',
	  dialect: 'mysql',

	  pool: {
	    max: 5,
	    min: 0,
	    idle: 10000
	  },
	  // pool: false,
});

module.exports.Users = sequelize.define('users',{
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			allowNull: false
		},
		fname: {
			type: Sequelize.STRING,
		},
		lname: {
			type: Sequelize.STRING,
		},
		email: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true
		},
		pass: {
			type: Sequelize.TEXT,
			allowNull: false
		},
		bday: {
			type: Sequelize.DATEONLY,
		},
		tweet_handle: {
			type: Sequelize.STRING,
			unique: true
		},
		contact: {
			type: Sequelize.STRING,
		},
		dp: {
			type: Sequelize.TEXT,
		},
		location: {
			type: Sequelize.STRING,
		}
	},{
		timestamps: true,
		freezeTableName: true,
		tableName: 'users'
	}
);

exports.sequelize = sequelize;