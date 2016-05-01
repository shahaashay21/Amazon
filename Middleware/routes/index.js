
/*
 * GET home page.
 */
var Product = require('./model/product');
var User = require('./model/user');
var Farmer = require('./model/farmer');
exports.index = function(req, res){
	// req.session.uid = '123';
	// req.session.destroy(function(err) {
	// 	if(req.session){
	// 		res.render('index', { title: 'Express', uid: req.session.uid });
	// 	}else{
	// 		res.render('index');
	// 	}
	// });

	//INSER NEW PRODUCT
	// var p = new Product();
	// p.name = 'red onions, medium';
	// p.price = '2.99';
	// p.weight = '2';
	// p.price_unit = '1.50';
	// p.unit = 'lb';
	// p.product_img = 'img/onion.jpg';
	// p.save(function(err){
	// 	console.log(err);
	// });

	// UPDATE PRODUCT -- ADD F_ID
	// Product.update()

	//ADD FARMER
	// var f = new Farmer();
	// f.fname = 'Chandubhai';
	// f.lname = 'kaiNai';
	// f.email = 'chandi@farmer.com';
	// f.pass = "Potato";
	// f.address = '532 abcd Ln';
	// f.city = 'San Jose';
	// f.state = 'Ca';
	// f.zipCode = '95131';
	// f.tax = '8';
	// f.intro = 'Navo j 6u etle koi intro rahyo j nathi.';

	// f.save(function(err){
	// 	console.log(err);
	// });

	// UPDATE PRODUCT
	// Product.update({'p_id': 500000012}, {'f_id': 200000002, 'farmer_name': 'Babubhai'}, function(err,ans){
	// 	console.log(err);
	// });


	//INSERT CARD DETAILS IN USERS
	// card = {
	// 	'card_number': 764862345654,
	// 	'name_on_card': 'aashay',
	// 	'exp_month': 06,
	// 	'exp_year': 2022,
	// 	'cvv': 864,
	// 	'default_card': 'true'
	// };
	// User.update({'fname': 'aashay'}, { $pull: {'cardDetails': {'name_on_card': 'aashay'}}}, function(err, ans){
	// 	console.log(err);
	// 	console.log(ans);
	// });

	// User.update({'fname': 'aashay'}, {$push: {cardDetails: card}}, function(a,b){
	// });



	Product.find({'isActive': true}).limit(10).exec(function(err, products){
			console.log('products');
			// if(typeof req.session.user != 'undefined'){
			if(typeof req.session.user != 'undefined'){
				// console.log(req.session.user);
				res.render('index', { user: req.session.user, products: products });
			}else{
				res.render('index', { products: products });
			}
		});	

	
};
