
exports.home = function(req, res){
  res.render('admin-index');
};

exports.farmersList = function(req, res){
  res.render('farmers-list');
};

exports.productsList = function(req,res){
	res.render('products-list');
};