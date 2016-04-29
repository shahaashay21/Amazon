var Cart = require('./model/cart.js');

exports.home = function(req, res){
	res.render('order', { user: req.session.user });
}