
exports.home = function(req, res){
  res.render('admin-index');
};

exports.farmersList = function(req, res){
  res.render('farmers-list');
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