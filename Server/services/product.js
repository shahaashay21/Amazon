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
exports.get_prod = function(msg, callback){
	var res = {};
	console.log("In servers get prod");
	console.log(msg);
	console.log(msg.p_id);
	Product.find({p_id: msg.p_id}, function(err, product) {
		if(product == "")
				{
				console.log(err);
				res.code = "401";
				res.value = "Failed to fetch Product";
				}
			else
				{
				console.log(product);
				res.code = "200";
				res.value = "Product Fetched";
				res.object = product;
				}
		callback(null, res);
	});
};


exports.create_review = function(msg, callback){
	var res = {};
	console.log("In servers create review");
	console.log(msg);
	Product.update({"p_id": msg.p_id}, {"$push": {"reviews": {"rating": msg.star,"review_title": msg.title,"review_desc": msg.review}}},{upsert:true},function(err){
        console.log("In prod update");
        if(err){
                console.log(err);res.code = "401";
				res.value = "Failed to create review";
        }else{	
        		res.code = "200";
				res.value = "Review Created";
                console.log("create_review successful");
        }
        callback(null, res);
});
};



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
				result.name = req.name;
				result.cat_id = req.cat_id;
				result.price = req.price;
				result.weight = req.weight;
				result.details = req.details;
				result.unit = req.unit;
				//result.description = req.description;
				result.save(function(err,doc){
					if(err){
						resGen.error(err,res);
					} else {
						console.log("product edited");
						console.log(doc);
						res(null,resGen.responseGenerator(200, doc));
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
						res(null,resGen.responseGenerator(200, doc.isActive));
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
