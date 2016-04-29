var Cart = require('./model/cart.js');

exports.home = function(req, res){
	user = req.session.user.c_id;

	if(typeof req.session.user != 'undefined'){
		// console.log(req.session.user);
		res.render('order', { user: req.session.user });
	}else{
		res.redirect('/');
	}
}