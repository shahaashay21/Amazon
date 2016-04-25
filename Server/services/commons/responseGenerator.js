/**
 * New node file
 */
var _ = require('underscore')
exports.success = 1;
exports.failure = 0;
var resGen = require('./responseGenerator');

exports.responseGenerator = function (status_code,data){

	var json_response={
			status: status_code,
			data : data
	};

	return JSON.stringify(json_response);
}

exports.responseGenerator = function (status_code,data1,data2){
	
	var data = _.extend(data1, data2);

	var json_response={
			status: status_code,
			data : data
	};

	return JSON.stringify(json_response);
}

exports.error = function(err,res){
	console.log(err);
	res(null,resGen.responseGenerator(401,null));
}