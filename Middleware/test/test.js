/**
 * New node file
 */
var request = require('request')
, express = require('express')
,assert = require("assert")
,http = require("http");

describe('http tests', function(){

	it('should return the login if the url is correct', function(done){
		http.get('http://localhost:3000/', function(res) {
			assert.equal(200, res.statusCode);
			done();
		})
	});

	it('should return product page', function(done) {
		http.get('http://localhost:3000/product?id=500000012', function(res) {
			assert.equal(200, res.statusCode);
			done();
		})
	  });

	it('should open search page', function(done){
		http.get('http://localhost:3000/search', function(res) {
			assert.equal(200, res.statusCode);
			done();
		})
	});

	it('should return on user registration', function(done){
		request.post('http://localhost:3000/reg',
			{form: {'email': 'shah.aashay21@gmail.com', 'fname': 'aashay', 'lname': 'shah', 'pass': 'test'}}, 
			function(error, response, body) {
			assert.equal(200, response.statusCode);
			done();
		})
	});

	it('should return suggestions based on potato', function(done){
		request.post('http://localhost:3000/suggest',
			{form: {'q': 'potato'}}, 
			function(error, response, body) {
			assert.equal(200, response.statusCode);
			done();
		})
	});
});