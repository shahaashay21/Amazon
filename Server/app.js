
/**
 * Module dependencies.
 */

var express = require('express')
  //, routes = require('./routes')
  , user = require('./services/user')
  , farmer = require('./services/farmer')
  , product = require('./services/product')
  , admin = require('./services/admin')
  , cart = require('./services/cart')
  , http = require('http')
  , path = require('path')
  , amqp = require('amqp')
  , util = require('util')
  , mongoose = require('mongoose');

var app = express();

// all environments
app.set('port', process.env.PORT || 3001);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//app.get('/', routes.index);
app.get('/users', user.list);


var mongoConnectURL = "mongodb://localhost:27017/amazon";
var cnn = amqp.createConnection({host:'127.0.0.1'});

// connect to the mongo collection session and then createServer
mongoose.connect(mongoConnectURL, function() {
  console.log('Connected to mongo at: ' + mongoConnectURL);
});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


cnn.on('ready', function(){

	console.log("listening on farmer_queue");

	cnn.queue('farmer_queue', function(q){
		q.subscribe(function(message, headers, deliveryInfo, m){
			util.log(util.format( deliveryInfo.routingKey, message));
			//util.log("Message: "+JSON.stringify(message));
			//util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));

			switch (message.service) {
				case "getFarmers":
					util.log("getFarmers");
					farmer.getFarmers(message, function(err,res){
						//util.log("Correlation ID: " + m.correlationId);
						// return index sent
						cnn.publish(m.replyTo, JSON.stringify(res), {
							contentType: 'application/json',
							contentEncoding: 'utf-8',
							correlationId: m.correlationId
						});
					});
					break;

				case "createFarmer":
					util.log("createFarmer");
					farmer.createFarmer(message, function(err,res){
						//util.log("Correlation ID: " + m.correlationId);
						// return index sent
						cnn.publish(m.replyTo, JSON.stringify(res), {
							contentType: 'application/json',
							contentEncoding: 'utf-8',
							correlationId: m.correlationId
						});
					});
					break;

				case "deleteFarmer":
					util.log("deleteFarmer");
					farmer.deleteFarmer(message, function(err,res){
						//util.log("Correlation ID: " + m.correlationId);
						// return index sent
						cnn.publish(m.replyTo, JSON.stringify(res), {
							contentType: 'application/json',
							contentEncoding: 'utf-8',
							correlationId: m.correlationId
						});
					});
					break;

				case "editFarmer":
					util.log("editFarmer");
					farmer.editFarmer(message, function(err,res){
						//util.log("Correlation ID: " + m.correlationId);
						// return index sent
						cnn.publish(m.replyTo, JSON.stringify(res), {
							contentType: 'application/json',
							contentEncoding: 'utf-8',
							correlationId: m.correlationId
						});
					});
					break;
			}
		});
	});

	cnn.queue('product_queue', function(q){
		q.subscribe(function(message, headers, deliveryInfo, m){
			util.log(util.format( deliveryInfo.routingKey, message));
			//util.log("Message: "+JSON.stringify(message));
			//util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));

			switch (message.service) {
				case "get_prod":
					util.log("getProducts");
					product.get_prod(message, function(err,res){
						//util.log("Correlation ID: " + m.correlationId);
						// return index sent
						cnn.publish(m.replyTo, JSON.stringify(res), {
							contentType: 'application/json',
							contentEncoding: 'utf-8',
							correlationId: m.correlationId
						});
					});
					break;
				case "getProducts":
					util.log("getProducts");
					product.getProducts(message, function(err,res){
						//util.log("Correlation ID: " + m.correlationId);
						// return index sent
						cnn.publish(m.replyTo, JSON.stringify(res), {
							contentType: 'application/json',
							contentEncoding: 'utf-8',
							correlationId: m.correlationId
						});
					});
					break;

				case "createProduct":
					util.log("createProduct");
					product.createProduct(message, function(err,res){
						//util.log("Correlation ID: " + m.correlationId);
						// return index sent
						cnn.publish(m.replyTo, JSON.stringify(res), {
							contentType: 'application/json',
							contentEncoding: 'utf-8',
							correlationId: m.correlationId
						});
					});
					break;

				case "deleteProduct":
					util.log("deleteProduct");
					product.deleteProduct(message, function(err,res){
						//util.log("Correlation ID: " + m.correlationId);
						// return index sent
						cnn.publish(m.replyTo, JSON.stringify(res), {
							contentType: 'application/json',
							contentEncoding: 'utf-8',
							correlationId: m.correlationId
						});
					});
					break;

				case "editProduct":
					util.log("editProduct");
					product.editProduct(message, function(err,res){
						//util.log("Correlation ID: " + m.correlationId);
						// return index sent
						cnn.publish(m.replyTo, JSON.stringify(res), {
							contentType: 'application/json',
							contentEncoding: 'utf-8',
							correlationId: m.correlationId
						});
					});
					break;
			}
		});
	});
	
	console.log("listening on admin_queue");

	cnn.queue('admin-queue', function(q) {
		q.subscribe(function(message, headers, deliveryInfo, m){
			util.log(util.format( deliveryInfo.routingKey, message));

			switch(message.service) {
				case "checkLogin":
					util.log("checkLogin");
					admin.checkLogin(message, function(err, res){
						cnn.publish(m.replyTo, JSON.stringify(res), {
							contentType: 'application/json',
							contentEncoding: 'utf-8',
							correlationId: m.correlationId
						})
					});
					break;
			}
		});
	});

	cnn.queue('cart', function(q){
		q.subscribe(function(message, headers, deliveryInfo, m){
			switch(message.route){
				case "addItem":
					cart.addItem(message, function(err, res){
						cnn.publish(m.replyTo, JSON.stringify(res), {
							contentType: 'application/json',
							contentEncoding: 'utf-8',
							correlationId: m.correlationId
						});
					});
					break;

				case "cartItems":
					cart.cartItems(message, function(err, res){
						cnn.publish(m.replyTo, JSON.stringify(res), {
							contentType: 'application/json',
							contentEncoding: 'utf-8',
							correlationId: m.correlationId
						});
					})
			}
		});
	});

});
