
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
  , order = require('./services/order')
  , truck = require('./services/truck')
  , driver = require('./services/driver')
  , farmerLogin = require('./services/farmerLogin')
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
						util.log("Correlation ID: " + m.correlationId);
						// return index sent
						util.log(JSON.stringify(res));
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

				case "farmerSignUp":
					util.log("farmerSignUp");
					farmerLogin.farmerSignUp(message, function(err,res){
						util.log("Correlation ID: " + m.correlationId);
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

	console.log("listening on product_queue");

	cnn.queue('product_queue', function(q){
		q.subscribe(function(message, headers, deliveryInfo, m){
			// util.log(util.format( deliveryInfo.routingKey, message));
			//util.log("Message: "+JSON.stringify(message));
			//util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));

			switch (message.service) {
				case "suggest":
					product.suggest(message, function(err,res){
						cnn.publish(m.replyTo, JSON.stringify(res), {
							contentType: 'application/json',
							contentEncoding: 'utf-8',
							correlationId: m.correlationId
						});
					});
					break;
				case "get_prod":
					util.log("Product Page");
					product.get_prod(message, function(err,res){
						cnn.publish(m.replyTo, JSON.stringify(res), {
							contentType: 'application/json',
							contentEncoding: 'utf-8',
							correlationId: m.correlationId
						});
					});
					break;
					case "prod_search":
					// util.log("Product Search Page");
					product.prod_search(message, function(err,res){
						cnn.publish(m.replyTo, JSON.stringify(res), {
							contentType: 'application/json',
							contentEncoding: 'utf-8',
							correlationId: m.correlationId
						});
					});
					break;
				case "farmer_page":
					util.log("getFarmers");
					product.farmer_page(message, function(err,res){
						cnn.publish(m.replyTo, JSON.stringify(res), {
							contentType: 'application/json',
							contentEncoding: 'utf-8',
							correlationId: m.correlationId
						});
					});
					break;
					case "myReviews":
					util.log("My reviews page");
					product.myReviews(message, function(err,res){
						cnn.publish(m.replyTo, JSON.stringify(res), {
							contentType: 'application/json',
							contentEncoding: 'utf-8',
							correlationId: m.correlationId
						});
					});
					break;
				case "create_review":
					util.log("Create_review");
					product.create_review(message, function(err,res){
						cnn.publish(m.replyTo, JSON.stringify(res), {
							contentType: 'application/json',
							contentEncoding: 'utf-8',
							correlationId: m.correlationId
						});
					});
					break;
					case "f_create_review":
					util.log("Farmer page Create_review");
					product.f_create_review(message, function(err,res){
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
						util.log("Correlation ID: " + m.correlationId);
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

				case "getCategory":
					util.log("getCategory");
					product.getCategory(message, function(err,res){
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
						});
					});
					break;

				case "getAdminProfile":
					util.log("getAdminProfile");
					admin.getAdminProfile(message, function(err, res){
						cnn.publish(m.replyTo, JSON.stringify(res), {
							contentType: 'application/json',
							contentEncoding: 'utf-8',
							correlationId: m.correlationId
						});
					});
					break;

				case "saveAdminProfile":
					util.log("saveAdminProfile");
					admin.saveAdminProfile(message, function(err, res){
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




// 	cnn.queue('user_queue', function(q){
// 	q.subscribe(function(message, headers, deliveryInfo, m){
// 		util.log(util.format( deliveryInfo.routingKey, message));
// 		//util.log("Message: "+JSON.stringify(message));
// 		//util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));

// 		switch (message.service) {
// 			case "getAddress":
// 				//util.log("getOrders");
// 				user.getAddress(message, function(err,res){
// 					//util.log("Correlation ID: " + m.correlationId);
// 					// return index sent
// 					cnn.publish(m.replyTo, JSON.stringify(res), {
// 						contentType: 'application/json',
// 						contentEncoding: 'utf-8',
// 						correlationId: m.correlationId
// 					});
// 				});
// 				break;
// 		}
// 	});
// });


	console.log("listening on user_queue");
	
	cnn.queue('user_queue', function(q){
	q.subscribe(function(message, headers, deliveryInfo, m){
		//util.log(util.format( deliveryInfo.routingKey, message));
		//util.log("Message: "+JSON.stringify(message));
		//util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));

		switch (message.service) {
			

			case "editCard":
					//util.log("getFarmers");
					user.editCard(message, function(err,res){
						cnn.publish(m.replyTo, JSON.stringify(res), {
							contentType: 'application/json',
							contentEncoding: 'utf-8',
							correlationId: m.correlationId
						});
					});
					break;


			case "editAddress":
				//util.log("editAddress");
				user.editAddress(message, function(err,res){
					//util.log("Correlation ID: " + m.correlationId);
					// return index sent
					cnn.publish(m.replyTo, JSON.stringify(res), {
						contentType: 'application/json',
						contentEncoding: 'utf-8',
						correlationId: m.correlationId
					});
				});

				break;

				case "getAddress":
				//util.log("getOrders");
				user.getAddress(message, function(err,res){
					//util.log("Correlation ID: " + m.correlationId);
					// return index sent
					cnn.publish(m.replyTo, JSON.stringify(res), {
						contentType: 'application/json',
						contentEncoding: 'utf-8',
						correlationId: m.correlationId
					});
				});
				break;

				//Admin related oprations
				case 'getCustomers' :
					util.log("getCustomers");
					user.getCustomers(message, function(err, res){
						cnn.publish(m.replyTo, JSON.stringify(res), {
							contentType: 'application/json',
							contentEncoding: 'utf-8',
							correlationId: m.correlationId
						});
					});
					break;	

				case 'createCustomer' :
					util.log("createCustomer");
					user.createCustomer(message, function(err, res){
						cnn.publish(m.replyTo, JSON.stringify(res), {
							contentType: 'application/json',
							contentEncoding: 'utf-8',
							correlationId: m.correlationId
						});
					});
					break;

				case 'editCustomer':
					util.log("editCustomer");
					user.editCustomer(message, function(err, res){
						cnn.publish(m.replyTo, JSON.stringify(res), {
							contentType: 'application/json',
							contentEncoding: 'utf-8',
							correlationId: m.correlationId
						});
					});
					break;

				case 'deleteCustomer':
					util.log("deleteCustomer");
					user.deleteCustomer(message, function(err, res){
						cnn.publish(m.replyTo, JSON.stringify(res), {
							contentType: 'application/json',
							contentEncoding: 'utf-8',
							correlationId: m.correlationId
						});
					});
					break;
				//Admin realated oprations end
		}
	});
});


	

	console.log("listening on cart_queue");

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
					break;
			}
		});
	});

	console.log("listening on order_queue");

	cnn.queue('order_queue', function(q) {
		q.subscribe(function(message, headers, deliveryInfo, m) {
			switch(message.service) {
				case 'createOrder':
					// util.log("createOrder");
					order.createOrder(message, function(err, res){
						cnn.publish(m.replyTo, JSON.stringify(res), {
							contentType: 'application/json',
							contentEncoding: 'utf-8',
							correlationId: m.correlationId
						});
					});
					break;

					case 'orderDetails':
					//util.log("createOrder");
					order.orderDetails(message, function(err, res){
						cnn.publish(m.replyTo, JSON.stringify(res), {
							contentType: 'application/json',
							contentEncoding: 'utf-8',
							correlationId: m.correlationId
						})
					});
					break;

				case 'getPending':
					util.log("getPending");
					order.getPending(message, function(err, res){
						cnn.publish(m.replyTo, JSON.stringify(res), {
							contentType: 'application/json',
							contentEncoding: 'utf-8',
							correlationId: m.correlationId
						});
					});
					break;

				case 'assignDriverId':
					util.log("assignDriverId");
					order.assignDriverId(message, function(err, res){
						cnn.publish(m.replyTo, JSON.stringify(res), {
							contentType: 'application/json',
							contentEncoding: 'utf-8',
							correlationId: m.correlationId
						});
					});
					break;

				case 'getInProgress':
					util.log("getInProgress");
					order.getInProgress(message, function(err, res){
						cnn.publish(m.replyTo, JSON.stringify(res), {
							contentType: 'application/json',
							contentEncoding: 'utf-8',
							correlationId: m.correlationId
						});
					});
					break;
					
				case 'assignComplete':
					util.log("assignComplete");
					order.assignComplete(message, function(err, res){
						cnn.publish(m.replyTo, JSON.stringify(res), {
							contentType: 'application/json',
							contentEncoding: 'utf-8',
							correlationId: m.correlationId
						});
					});
					break;

				case 'getComplete':
					util.log("getComplete");
					order.getComplete(message, function(err, res){
						cnn.publish(m.replyTo, JSON.stringify(res), {
							contentType: 'application/json',
							contentEncoding: 'utf-8',
							correlationId: m.correlationId
						});
					});
					break;



				case 'getCancel':
					util.log("getCancel");
					order.getCancel(message, function(err, res){
						cnn.publish(m.replyTo, JSON.stringify(res), {
							contentType: 'application/json',
							contentEncoding: 'utf-8',
							correlationId: m.correlationId
						});
					});
					break;

				case 'getRevenue':
					util.log("getRevenue");
					order.getRevenue(message, function(err, res){
						cnn.publish(m.replyTo, JSON.stringify(res), {
							contentType: 'application/json',
							contentEncoding: 'utf-8',
							correlationId: m.correlationId
						});
					});
					break;


			}
		})
	});

	console.log("listening on truck_queue");

	cnn.queue('truck-queue', function(q){
		q.subscribe(function(message, headers, deliveryInfo, m) {
			switch(message.service) {
				case 'createTruck' :
					util.log("createTruck");
					truck.createTruck(message, function(err, res){
						cnn.publish(m.replyTo, JSON.stringify(res), {
							contentType: 'application/json',
							contentEncoding: 'utf-8',
							correlationId: m.correlationId
						});
					});
					break;

				case 'getTrucks' :
					util.log("getTrucks");
					truck.getTrucks(message, function(err, res){
						cnn.publish(m.replyTo, JSON.stringify(res), {
							contentType: 'application/json',
							contentEncoding: 'utf-8',
							correlationId: m.correlationId
						});
					});
					break;	

				case 'editTruck':
					util.log("editTruck");
					truck.editTruck(message, function(err, res){
						cnn.publish(m.replyTo, JSON.stringify(res), {
							contentType: 'application/json',
							contentEncoding: 'utf-8',
							correlationId: m.correlationId
						});
					});
					break;

				case 'deleteTruck':
					util.log("deleteTruck");
					truck.deleteTruck(message, function(err, res){
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

	console.log("listening on driver_queue");

	cnn.queue('driver-queue', function(q){
		q.subscribe(function(message, headers, deliveryInfo, m) {
			switch(message.service) {
				
				case 'getDrivers' :
					util.log("getDrivers");
					driver.getDrivers(message, function(err, res){
						cnn.publish(m.replyTo, JSON.stringify(res), {
							contentType: 'application/json',
							contentEncoding: 'utf-8',
							correlationId: m.correlationId
						});
					});
					break;	

				case 'createDriver' :
					util.log("createDriver");
					driver.createDriver(message, function(err, res){
						cnn.publish(m.replyTo, JSON.stringify(res), {
							contentType: 'application/json',
							contentEncoding: 'utf-8',
							correlationId: m.correlationId
						});
					});
					break;

				case 'editDriver':
					util.log("editDriver");
					driver.editDriver(message, function(err, res){
						cnn.publish(m.replyTo, JSON.stringify(res), {
							contentType: 'application/json',
							contentEncoding: 'utf-8',
							correlationId: m.correlationId
						});
					});
					break;

				case 'deleteDriver':
					util.log("deleteDriver");
					driver.deleteDriver(message, function(err, res){
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
});
