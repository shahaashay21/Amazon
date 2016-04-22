
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