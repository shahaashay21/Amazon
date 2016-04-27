var mq = require('../rpc/client');


exports.cartItems = function(req, res){
	c_id = req.session.user.c_id;
	var msg_payload = {"route":"cartItems", "c_id": c_id};

	mq.make_request('cart', msg_payload, function(err, done){
		res.send(done);
	})
}
exports.addItem = function(req, res){
	p_id = req.param('id');
	quantity = req.param('quantity');
	c_id = req.session.user.c_id;

	var msg_payload = {"route":"addItem", 'p_id':p_id, 'quantity': quantity, "c_id": c_id};
  	mq.make_request('cart', msg_payload, function(err, done){
  		res.send(done);
  	});
}