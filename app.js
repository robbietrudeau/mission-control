var express = require('express')
  , routes = require('./routes')
	, passport = require('passport')
	, FacebookStrategy = require('passport-facebook').Strategy;

var app = module.exports = express.createServer();

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.cookieParser());
  app.use(express.session({secret: 'MatthewSmith'}));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
	app.use(passport.initialize());
	app.use(passport.session());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

passport.use(new FacebookStrategy({
    clientID: "440105096035530",
    clientSecret: "e45befc93a524072011a4ce920b8bee6",
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate(..., function (err, user) {
      if (err) { return done(err); }
      done(null, user);
    });
  }
));
app.get('/', routes.index);

app.get('/auth/provider', passport.authenticate('provider'));

app.get('/auth/provider/callback', 
  passport.authenticate('provider', { successRedirect: '/',
                                      failureRedirect: '/login' }));

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});