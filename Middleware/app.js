/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , farmer = require('./routes/farmer')
  , product = require('./routes/product')
  , login = require('./routes/login')
  , cart = require('./routes/cart')
  , order = require('./routes/order')
  //ADMIN
  , admin = require('./routes/admin');

//JUST FOR PASSPORT LOGIN
var passport = require('passport');
require('./routes/passport')(passport);


var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/amazon");

var mongoURL = "mongodb://localhost:27017/amazon";
var expressSession = require("express-session");
var mongoStore = require("connect-mongo")(expressSession);

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());


//EXPRESS SESSION CONFIG
app.use(expressSession({
	key: 'amazon_cookie',
    secret: 'amazon',
    resave: false,
    saveUninitialized: false,
    cookie: {},
    store: new mongoStore({
		url: mongoURL
	})
}));
app.use(passport.initialize());
// app.use(passport.session());


app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


//GET REQUEST
app.get('/', routes.index);
app.get('/users', user.list);
app.get('/PreviewOrder', isAuthenticated, order.home);


//ADMIN API
app.get('/admin/home',admin.home);
app.get('/admin/login',admin.login);
app.get('/admin/logout', admin.logout);
app.post('/admin/checkLogin', admin.checkLogin);
app.get('/admin/farmers/list',admin.farmersList);
app.get('/admin/products/list',admin.productsList);
app.get('/admin/trucks/list',admin.trucksList);
app.get('/admin/drivers/list',admin.driversList);
app.get('/admin/customers/list',admin.customersList);
app.get('/admin/orders/list',admin.ordersList);
//app.post('/admin/addFarmer', admin.addFarmer);;

//ORDERS API
app.post('/order/create', order.createOrder);

app.get('/farmer/all',farmer.getFarmers);
app.post('/farmer/create',farmer.createFarmer);
app.delete('/farmer/delete',farmer.deleteFarmer);
app.post('/farmer/edit',farmer.editFarmer);

app.get('/product/all',product.getProducts);
app.post('/product/create',product.createProduct);
app.delete('/product/delete',product.deleteProduct);
app.post('/product/edit',product.editProduct);
//app.get('/prod_details', user.prod_details);
app.get('/product', product.prod_details);
app.post('/create_review',product.create_review);
app.post('/f_create_review',product.f_create_review); 
app.get('/farmer_page',product.farmer_page);

app.get('/frame', function(req,res){
  res.render('frame');
})
app.get('/login', login.signIn);
app.get('/signup', login.signUp);
app.get('/logout', function(req,res) {
  req.session.destroy(function(err){
    res.redirect('/');
  })
});


app.get('/search', function(req, res){

  if(typeof req.session.user != 'undefined'){
    console.log(req.session.user);
    res.render('ProductSearch', { user: req.session.user });
  }else{
    res.render('index');
  }
});




app.get('/customerAccount', function(req, res){

  if(typeof req.session.user != 'undefined'){
    console.log(req.session.user);
    res.render('customerAccount', { user: req.session.user });
  }else{
    res.render('index');
  }
});

app.get('/help', function(req, res){

  if(typeof req.session.user != 'undefined'){
    console.log(req.session.user);
    res.render('help', { user: req.session.user });
  }else{
    res.render('index');
  }
});

app.get('/addressDetails', function(req, res){
  if(typeof req.session.user !== 'undefined'){
    console.log(req.session.user);
    res.render('addressDetails', { user: req.session.user });
  }else{
    res.render('index');
  }
  });

app.get('/conditions', function(req, res){
  if(typeof req.session.user !== 'undefined'){
    console.log(req.session.user);
    res.render('conditions', { user: req.session.user });
  }else{
    res.render('conditions');
  }
  });

app.get('/carrers', function(req, res){
  if(typeof req.session.user !== 'undefined'){
    console.log(req.session.user);
    res.render('carrers', { user: req.session.user });
  }else{
    res.render('carrers');
  }
  });

app.get('/privacy', function(req, res){
  if(typeof req.session.user !== 'undefined'){
    console.log(req.session.user);
    res.render('privacy', { user: req.session.user });
  }else{
    res.render('privacy');
  }
  });

app.get('/paymentOptions', function(req, res){
  if(typeof req.session.user !== 'undefined'){
    console.log(req.session.user);
    res.render('creditCardDetails', { user: req.session.user });
  }else{
    res.render('index');
  }
  });

app.get('/myReviews', function(req, res){
  if(typeof req.session.user !== 'undefined'){
    console.log(req.session.user);
    res.render('myReviews', { user: req.session.user });
  }else{
    res.render('index');
  }
  });







function isAuthenticated(req, res, next) {
  if(req.session.user) {
     return next();
  }
  res.redirect('/login');
};

// passport.serializeUser(function(user, done) {
//   done(null, user);
// });

// passport.deserializeUser(function(id, done) {
//     done(null, id);
// });



//POST REQUEST
app.post('/login', function(req, res, next) {
  passport.authenticate('login', function(err, user, info) {
    if(err) {
      return next(err);
    }

    if(!user) {
      req.session.wrongSignIn = true;
      res.redirect('/login');
    }
    else{
      req.logIn(user, {session: false}, function(err) {
        if(err) {
          return next(err);
        }
        req.session.user = user;
        return res.redirect('/');
      })
    }
  })(req, res, next);
});


app.post('/reg', login.regUser);
app.post('/additem', cart.addItem);
app.post('/cart', cart.cartItems);
app.post('/suggest', product.suggest);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
