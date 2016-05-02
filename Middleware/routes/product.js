//

var ejs = require("ejs");
var mq = require('../rpc/client');

//var multer = require('multer');
//var mysql = require('./mysql');
var resGen = require('./commons/responseGenerator');

var Product = require('./model/product');


/*uploadFilename = "";

var storage = multer.diskStorage({ //multers disk storage settings
	destination: function (req, file, cb) {
        cb(null, '/public/uploads');
    },
    filename: function (req, file, cb) {
        //console.log("File name"+file.fieldname + '-' + Date.now());
        cb(null, file.fieldname + '-' + Date.now());
    }
})

var upload = multer({ //multer settings
                    storage: storage
                }).single('file')

exports.fileUpload = function(req,res){
	upload(req,res,function(err){
        if(err){
            console.log("code has some errors");
            res.send(err);
            return err;
        }
        else{
         	console.log("upload done")
        	res.send("done");
        }
    });
};*/

exports.getProducts = function(req, res){
	var msg_payload = {"service":"getProducts", "sid":req.sessionID};
  	mq.make_request('product_queue', msg_payload, function(err,doc){
		if(err)
		{
		    console.log(err);
			res.send(resGen.responseGenerator(401, null));
		}
		else
		{
			doc = JSON.parse(doc);
			if(doc.status == 200){
				console.log("reply from getProducts");
				res.send(doc);
			}
			else
			{
				res.send(resGen.responseGenerator(401, null));
			}
		}
	});
};


exports.getCategory = function(req,res){
	mq.make_request('product_queue', {'service' : 'getCategory'}, function(err,doc){
		if(err){
			res.send(500);
		}else{
			res.send(doc);
		}
	});
}



exports.suggest = function(req, res){
	//Without REDIS
	q = req.param('q');
	var msg_payload = {'service': 'suggest', 'q': q};
	console.log(q);
	mq.make_request('product_queue', msg_payload, function(err, done){
		res.send(done);
	})


 /*   //With REDIS
    var msg_payload = {
        "q" : request.param("q"),
        "service" : "suggest",
        "reqtype": "/reddis/search",
        "httpreqtype" : "GET",
        "data" : {
            searchparam: q,
            operation:'suggest'
        }
    };
    console.log("Requsted to Reddis");
    mq_client.make_request('product_queue', msg_payload, function(err,results) {
        console.log(results);
        if (err) {
            console.log(err);
        } else {
            res.send(results);
        }
    });*/

}

exports.createProduct = function(req,res){
	//if(req.product_img){
	
	if(true){
		//var file = req.product_img.path;
		console.log(req.product_img);
		//product_img_filename = file.substr((file.indexOf('\\img\\')+5));
		var msg_payload = {
			"service" : "createProduct",
			//"p_id" : req.param("p_id"),
			"name" : req.param("name"),
			"f_id" : req.param("f_id"),
			//"f_name": req.param("f_name"),
			"cat_id" : req.param("cat_id"),
			"price" : req.param("price"),
			"weight" : req.param("weight"),
			"unit" : req.param("unit"),
			"quantity": req.param("quantity"),
			"details" : req.param("details"),
			"description" : req.param("description"),
			"features": req.param("features"),
			"product_img": req.param("product_img"),
			"image1": req.param("image1"),
			"sid":req.sessionID
		};

	  	mq.make_request('product_queue', msg_payload, function(err,doc){
			if(err)
			{
			    console.log(err);
				res.send(resGen.responseGenerator(401, null));
			}
			else
			{

				doc = JSON.parse(doc);
				if(doc.status == 200){
					console.log("reply from createProduct" + doc);

					res.send(doc);
				}
				else
				{
					res.send(resGen.responseGenerator(401, null));
				}
			}
		});
	}
};

exports.fileUpload = function(req,res){
	console.log("fileUpload");
	//console.log(req.files);
	if(req.files.product_img){
		var file = req.files.product_img.path;
		filename = file.substr((file.indexOf('\\img\\')+5));
		//console.log(file);
		console.log(filename);
		//console.log(req.product_img);
		/*if(!(isEmpty(req.files))){
			if(!(isEmpty(req.files.myFile.path))){
				var file = req.files.myFile.path;
				filename = file.substr((file.indexOf('\\img\\')+5));
				Users.update({id: req.session.uid}, {dp:filename}, function(err, update){
					if(!err){
						res.json('Ok');
					}
				});
			}
		}*/
		res.send(resGen.responseGenerator(200,filename));
	}
}

exports.deleteProduct = function(req,res){
	
	if(req.param("p_id").length!=6){
		res.send(500);
	}

	var msg_payload = {
		"service" : "deleteProduct",
		"p_id" : req.param("p_id"),
		"sid":req.sessionID
	};

  	mq.make_request('product_queue', msg_payload, function(err,doc){
		if(err)
		{
		    console.log(err);
			res.send(resGen.responseGenerator(401, null));
		}
		else
		{

			doc = JSON.parse(doc);
			if(doc.status == 200){
				console.log("reply from deleteProduct" + doc);
				res.send(doc);
			}
			else
			{
				res.send(resGen.responseGenerator(401, null));
			}
		}
	});
};

exports.editProduct = function(req,res){

	var msg_payload = {
		"service" : "editProduct",
		"p_id" : req.param("p_id"),
		"name" : req.param("name"),
		"f_id": req.param("f_id"),
		"cat_id" : req.param("cat_id"),
		"price" : req.param("price"),
		"weight" : req.param("weight"),
		"unit": req.param("unit"),
		"details" : req.param("details"),
		"description" : req.param("description"),
		"features" : req.param("features"),
		"quantity" : req.param("quantity"),
		"sid":req.sessionID
	};

  	mq.make_request('product_queue', msg_payload, function(err,doc){
		if(err)
		{
		    console.log(err);
			res.send(resGen.responseGenerator(401, null));
		}
		else
		{

			doc = JSON.parse(doc);
			if(doc.status == 200){
				console.log("reply from editProduct" + doc);
       			res.send(doc);
			}
			else
			{
				res.send(resGen.responseGenerator(401, null));
			}
		}
	});
};

exports.prod_details = function(req,res){
	console.log("In middlewares prod.js");
	var msg_payload = {
		"service" : "get_prod",
		"p_id" : req.param("id"),
		"sid":req.session.user
	};
var avg_rating=0;var total_rating=0;var t_length=0;
	console.log(msg_payload);
  	mq.make_request('product_queue', msg_payload, function(err,prod){
		if(err)
		{
		    console.log(err);
			res.send(resGen.responseGenerator(401, null));
		}
		else
		{
			if(prod.code == 200){
				t_length=prod.object[0].reviews.length;
				avg_rating = total_rating/t_length;
				 for (var i = 0; i < t_length; i++) {
				total_rating = Number(total_rating) + Number(prod.object[0].reviews[i].rating);
				} 
				avg_rating = Number(total_rating)/Number(t_length);
				if(typeof req.session.user != 'undefined'){
				console.log("session is active yipppy");
					res.render('product_page', { user: req.session.user, products: prod, session: true, avg_rating: avg_rating , value: true ,t_length: t_length});
				}else{
					console.log("No session on");
					res.render('product_page', { products: prod, session: false, avg_rating: avg_rating, t_length:t_length, value: true });
				}
			}
			else
			{
				res.send("The product you are looking for does not exist.");
			}
		}
	});
};

exports.prod_search = function(req,res){
	console.log("In middlewares prod.js");
	var msg_payload = {
		"service" : "prod_search",
		"cat_id" : req.param("id"),
		"search": req.param("search"),
		"sid":req.session.user
	};
	
	cat_id = req.param("id");
	name = req.param("search");

	//CREATE BY AASHAY
	searchData = {};
	if(typeof cat_id != 'undefined'){

		searchData.cat_id = cat_id;
	}
	if(typeof name != 'undefined'){
		regexp = new RegExp('(^|\\s+)'+name,'i')
		searchData.name = regexp;	
	}
	
	console.log(searchData);

	Product.find(searchData, function(err, product){

		if(typeof req.session.user != 'undefined'){
			res.render('ProductSearch', { user: req.session.user, products: product, session: true });
		}else{
			console.log("No session on");
			console.log(product);
			res.render('ProductSearch', { products: product, session: false });
		}
		// callback(null, res);
	});


};

exports.f_create_review = function(req,res){
	var msg_payload = {
		"service" : "f_create_review",
		"f_id" : req.param("p_id"),
		"star" : req.param("vue"),
		"title": req.param("title"),
		"review": req.param("review"), 
		"name":req.session.user.fname,
		"id": req.session.user.c_id
	};
  	mq.make_request('product_queue', msg_payload, function(err,prod){
		if(err)
		{
		    console.log(err);
			res.send(resGen.responseGenerator(401, null));
		}
		else
		{
			if(prod.code == 200){
				res.redirect("/farmer_page?id="+req.param("p_id"));
		}
			else
			{
				res.send(resGen.responseGenerator(401, null));
			}
		}
	});
};

exports.create_review = function(req,res){
	
	var msg_payload = {
		"service" : "create_review",
		"p_id" : req.param("p_id"),
		"star" : req.param("vue"),
		"title": req.param("title"),
		"review": req.param("review"), 
		"name":req.session.user.fname,
		"id": req.session.user.c_id
	};
  	mq.make_request('product_queue', msg_payload, function(err,prod){
		if(err)
		{
		    console.log(err);
			res.send(resGen.responseGenerator(401, null));
		}
		else
		{
			if(prod.code == 200){
				res.redirect("/product?id="+req.param("p_id"));
				
				console.log(prod);
					console.log(req.session.user);	
		}
			else
			{
				res.send(resGen.responseGenerator(401, null));
			}
		}
	});
};

exports.myReviews = function(req,res){
	console.log("In middlewares prod.js");
	var msg_payload = {
		"service" : "myReviews",
		"sid":req.session.user.fname
	};
	console.log(msg_payload);
  	mq.make_request('product_queue', msg_payload, function(err,prod){
		if(err)
		{
		    console.log(err);
			res.send(resGen.responseGenerator(401, null));
		}
		else
		{
			if(prod.farmer.code == 200){
				if(typeof req.session.user != 'undefined'){
				console.log(req.session.user.fname);
				console.log("Prod revuews");
				console.log(prod.product[0].reviews);
				console.log("Farmer reviews");
				console.log(prod.farmer.object[0].reviews);
				
				res.render('myReviews', { user: req.session.user, products: prod.product, farmer: prod.farmer, session: true });
				}else{
					console.log("No session on");
					//res.send(prod);
					res.render('myReviews', { user: null, products: prod, session: false });
				}
			}
			else
			{
				res.send("Sorry the product that you are searching for does not exist.");
			}
		}
	});
};




exports.farmer_page = function(req,res){
	console.log("In middlewares prod.js");
	var msg_payload = {
		"service" : "farmer_page",
		"f_id" : req.param("id"),
		"sid":req.session.user
	};
	console.log(msg_payload);
  	mq.make_request('product_queue', msg_payload, function(err,prod){
		if(err)
		{
		    console.log(err);
			res.send(resGen.responseGenerator(401, null));
		}
		else
		{
			if(prod.farmer.code == 200){
				//console.log(Object.keys(prod.reviews));
				if(typeof req.session.user != 'undefined'){
				//console.log("1");
				//console.log(prod.farmer);
				//console.log("2");
				//console.log(prod.product);
				//for (var i = 0; i < arrayLength; i++) {
				//console.log("star value"+prod.reviews.rating);
				//console.log("star value1"+prod.reviews[0].rating);
				//console.log("In array should run once");
				//}
				console.log(req.session.user);
				res.render('farmer_page', { user: req.session.user, products: prod.product, farmer: prod.farmer, session: true });
				}else{
					console.log("No session on");
					//res.send(prod);
					console.log(prod.farmer.object[0].fname);
					res.render('farmer_page', { user: null, products: prod.product, farmer: prod.farmer, session: false });
				}
			}
			else
			{
				res.send("Sorry the product that you are searching for does not exist.");
			}
		}
	});
};