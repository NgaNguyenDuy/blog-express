'use strict';

var express = require('express'),
    app = express(),
    RouterRoot,
    config = require('./config'),
    routes = require('./routes'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    mongoose = require('mongoose');


mongoose.connect(config.mongo_url, function(err) {
    if (err) throw err;
    console.log('Connect database successeful!!! ');
});


// Using middleware
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(session({
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret: 'Secret key'
}));


// Config express
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));


// Using Router
RouterRoot = express.Router();


RouterRoot.get('/', routes.index);
RouterRoot.get('/login', routes.users.login);
RouterRoot.post('/login', routes.users.authen);


RouterRoot.get('/register', routes.users.register);
RouterRoot.post('/register', routes.users.reguser);

RouterRoot.get('/logout', routes.users.logout);


RouterRoot.post('/posts', routes.posts.create);
RouterRoot.get('/posts', routes.posts.read);
RouterRoot.put('/posts/:post_id', routes.posts.update);
RouterRoot.delete('/posts/:post_id', routes.posts.del);

RouterRoot.all('*', function(req, res) {
    res.status(404).end();
});


// Declare router
app.use('/', RouterRoot);


app.listen( config.port, function() {
    console.log('Express server running at ' + config.port);
});
