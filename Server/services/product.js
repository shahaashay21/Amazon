var Product = require('./model/product');
var resGen = require('./commons/responseGenerator');


exports.getProducts = function(req, res){

	Product.find({isActive:true},function(err,results){
		if(err)
		{
			resGen.error(err,res);
		}
		else
		{
			if(results.length > 0){
				console.log("all products found");
				console.log(results[0]);
				res(null,resGen.responseGenerator(200, results));
			}
			else
			{
				console.log("no data");
				resGen.error("null",res);
			}
		}
	});
}


exports.createProduct = function(req, res){

	var product = Product({
		p_id : req.p_id,
		name : req.name,
		cat_id: req.cat_id,
		price : req.price,
		weight : req.weight,
		details : req.details,
		unit : req.unit,
		description : req.description
	});
	product.save(function(err,results){
		if(err)
		{
			resGen.error(err,res);
		}
		else
		{
			if(results){
				console.log("product created");
				console.log(results);
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

exports.editProduct = function(req, res){

	Product.findOne({p_id:req.p_id},{pass:0},function(err,result){
		if(err)
		{
			resGen.error(err,res);
		}
		else
		{
			if(result){
				result.name = req.name ? req.name : result.name;
				result.cat_id = req.cat_id ? req.cat_id : result.cat_id;
				result.price = req.price ? req.price : result.price;
				result.weight = req.weight ? req.weight : result.weight;
				result.details = req.details ? req.details : result.details;
				result.unit = req.unit ? req.unit : result.unit;
				result.description = req.description ? req.description : result.description;
				result.save(function(err,res){
					if(err){
						resGen.error(err,res);
					} else {
						console.log("product edited");
						console.log(res);
						res(null,resGen.responseGenerator(200, res));						
					}
				});
			}
			else
			{
				resGen.error(null,res);
			}
		}
	});
}

exports.deleteProduct = function(req, res){

	Product.find({p_id:req.p_id},function(err,result){
		if(err)
		{
			resGen.error(err,res);
		}
		else
		{
			if(results){
				console.log("all products found");
				console.log(result);
				result.isActive = false;
				result.save(function(err,doc){
					if(err){
						resGen.error(err,res);
					} else {
						console.log("product inactive now");
						console.log(doc);
						res(null,resGen.responseGenerator(200, doc));						
					}
				});
			}
			else
			{
				console.log("no data delete product");
				resGen.error(null,res);
			}
		}
	});
}
