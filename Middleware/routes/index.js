
/*
 * GET home page.
 */
var Product = require('./model/product');
exports.index = function(req, res){
	// req.session.uid = '123';
	// req.session.destroy(function(err) {
	// 	if(req.session){
	// 		res.render('index', { title: 'Express', uid: req.session.uid });
	// 	}else{
	// 		res.render('index');
	// 	}
	// });

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
	
	Product.find({}).limit(10).exec(function(err, products){
		// console.log(products);
		if(typeof req.session.user != 'undefined'){
			// console.log(req.session.user);
			res.render('index', { user: req.session.user, products: products });
		}else{
			res.render('index', { products: products });
		}
	});
};
