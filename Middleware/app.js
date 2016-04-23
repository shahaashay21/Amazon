
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , admin = require('./routes/admin')
  , login = require('./routes/login');

//JUST FOR PASSPORT LOGIN
var passport = require('passport');
require('./routes/passport')(passport);


var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/amazon?poolSize=5");

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

app.get('/admin/home',admin.home);
app.get('/admin/farmers/list',admin.farmersList);
app.get('/admin/products/list',admin.productsList);
app.get('/admin/trucks/list',admin.trucksList);
app.get('/admin/drivers/list',admin.driversList);
app.get('/admin/customers/list',admin.customersList);
app.get('/admin/orders/list',admin.ordersList);
app.get('/frame', function(req,res){
  res.render('frame');
})
app.get('/login', login.signIn);
app.get('/signup', login.signUp);
app.get('/logout', function(req,res) {
  req.session.destroy();
  res.redirect('/');
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
      return res.redirect('/login');
    }

    req.logIn(user, {session: false}, function(err) {
      if(err) {
        return next(err);
      }
      req.session.user = user;
      return res.redirect('/');
    })
  })(req, res, next);
});


app.post('/reg', login.regUser);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
