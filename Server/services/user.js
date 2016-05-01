var User = require('./model/user');
var resGen = require('./commons/responseGenerator');


exports.list = function(req, res){
  res.send("respond with a resource");
};



exports.getAddress = function(req, res){
	
	console.log("cid :: "+ req.c_id);
	//var cid = req.c_id;
	
	User.find({c_id:req.c_id},function(err,results){
		console.log(results);

		if(err)
		{

			resGen.error(err,res);
		}
		else
		{
			console.log(results);
			
			if(results){
				console.log("address found");
				res(null,resGen.responseGenerator(200, results));
			}
			else
			{
				console.log("no data");
				resGen.error(null,res);
			}
		}
	});
}




exports.editAddress = function(req, res){
	//console.log(req);

	User.findOne({c_id:req.c_id},{pass:0},function(err,result){
		if(err)
		{
			resGen.error(err,res);
		}
		else
		{
			if(result){
				//console.log(result);
				
				result.address = req.address;
				result.city = req.city;
				result.state = req.state;
				result.zipcode = req.zipcode;
				//result.description = req.description;
				console.log(result);
				result.save(function(err,doc){
					if(err){
						//console.log(err);
					} else {
						//console.log("Address edited");

						console.log(doc);
						res(null,JSON.stringify(doc));
					}
				});
			}
			else
			{
				resGen.error(null,res);
			}
		}
	});
};





exports.editCard = function(req, res){
	//console.log(req);

	User.findOne({c_id:req.c_id},{pass:0},function(err,result){
		if(err)
		{
			resGen.error(err,res);
		}
		else
		{
			if(result){
				console.log(result);
				
				result.card_number = req.card_number;
				result.name_on_card = req.name_on_card;
				result.exp_month = req.exp_month;
				result.exp_year = req.exp_year;
				result.cvv = req.cvv;
				//result.description = req.description;
				//console.log(result);
				result.save(function(err,doc){
					if(err){
						//console.log(err);
					} else {
						//console.log("Address edited");

						console.log(doc);
						res(null,JSON.stringify(doc));
					}
				});
			}
			else
			{
				resGen.error(null,res);
			}
		}
	});
};
