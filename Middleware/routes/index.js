
/*
 * GET home page.
 */

exports.index = function(req, res){
	// req.session.uid = '123';
	// req.session.destroy(function(err) {
	// 	if(req.session){
	// 		res.render('index', { title: 'Express', uid: req.session.uid });
	// 	}else{
	// 		res.render('index');
	// 	}
	// });
	if(typeof req.session.uid != 'undefined'){
		res.render('index', { uid: req.session.uid });
	}else{
		res.render('index');
	}
};
