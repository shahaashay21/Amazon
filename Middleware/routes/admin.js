
exports.home = function(req, res){
  res.render('admin-index');
};

exports.farmersList = function(req, res){
	res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
	res.render("farmers-list");
};

exports.productsList = function(req,res){
	res.render('products-list');
};

exports.trucksList = function(req,res){
    res.render('trucks-list');
};

exports.driversList = function(req,res){
    res.render('drivers-list');
};

exports.customersList = function(req,res){
    res.render('customers-list');
};

exports.ordersList = function(req,res){
    res.render('orders-list');
};