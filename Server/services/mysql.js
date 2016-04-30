var ejs= require('ejs');
var mysql = require('mysql');
var Sequelize = require('sequelize');


//Put your mysql configuration settings with the help of sequelize - user, password, database and port
var sequelize = new Sequelize('amazon', 'root', 'neel', {
	host : 'localhost',
	dialect : 'mysql',
	//collection pooling
	pool : {
		max : 50,
		idle : 10000
	}
});

exports.sequelize = sequelize;

/*//Put your mysql configuration settings - user, password, database and port
function getConnection(){
	var connection = mysql.createConnection({
	    host     : 'localhost',
	    user     : 'root',
	    password : 'root',
	    database : 'amazon',
	    port	 : 3306
	});
	return connection;
}

exports.fetchData = function(callback,sqlQuery){
	
	console.log("\nSQL Query::"+sqlQuery);
	
	var connection=getConnection();
	
		connection.query(sqlQuery, function(err, rows, fields) {
			if(err){
				console.log("ERROR: " + err.message);
			}
			else 
			{	// return err or result
				console.log("DB Results:");
				console.log(rows);
				callback(err, rows);
			}
		});
	console.log("\nConnection closed..");
	connection.end();
}	

exports.storeData = function(sqlQuery, callback){
	console.log('---SQL Query ::' + sqlQuery + '---');
	var connection = getConnection();
		connection.query(sqlQuery, function(err, results){
			//render on success
			if(!err){
				console.log('Database Results :: ' + results);
				callback(err, results);
			}
			//render or error
			else{
				console.log('Error in getting results');
				callback(err, results);
			}
		});
	console.log('Store Connection Closed');
	connection.end();
}

exports.deleteData = function(sqlQuery, callback){
	console.log('---SQL Query ::' + sqlQuery + '---');
	var connection = getConnection();
	
		connection.query(sqlQuery, function(err, results){
			//render on success
			if(!err){
				console.log('Database Results :: ');
				console.log(results);
				callback(err, results);
			}
			//render or error
			else{
				console.log('Error in getting results');
				callback(err, results);
			}
		});
	console.log('Store Connection Closed');
	connection.end();
}*/