var Cart = require('./model/cart.js');
var User = require('./model/user');

exports.home = function(req, res){
	User.find({c_id: req.session.user.c_id, 'cardDetails.default_card': 'true'}, 'cardDetails', function(err, ans){
		User.findOne({c_id: req.session.user.c_id}, 'address', function(err, address){
			
			console.log(typeof address.address);
			if(typeof address.address != 'undefined'){
				isAddress = 'yes';
				console.log(address.address);
			}else{
				isAddress = 'no';
			}
			if(ans.length > 0){
				isCard = 'yes';
			}else{
				isCard = 'no';
			}
			console.log(isAddress);
			if(ans.length > 0){
				cardinfo = ans[0].cardDetails[0];

				x = cardinfo.card_number.toString();
				lastFourDigit = x.substring(x.length - 4);

				res.render('order', { user: req.session.user, 'cardDetails':  cardinfo, 'lastFourDigit': lastFourDigit, 'isCard': isCard, 'isAddress': isAddress});	
			}else{
				res.render('order', { user: req.session.user, 'isCard': isCard, 'isAddress': isAddress});	
			}
		})
	})
	
}