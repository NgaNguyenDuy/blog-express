'use strict';

var express = require('express'),
    app = express(),
    RouterRoot,
    routes = require('./routes');
    // users = require('./routes/users'),
    // posts = require('./routes/posts');


// Config express
app.set('port', process.env.PORT || 9009);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));


// Using Router
RouterRoot = express.Router();


RouterRoot.get('/', routes.index);
RouterRoot.post('/login', routes.users.login);

RouterRoot.post('/posts', routes.posts.create);
RouterRoot.get('/posts', routes.posts.read);
RouterRoot.put('/posts/:post_id', routes.posts.update);
RouterRoot.delete('/posts/:post_id', routes.posts.del);

RouterRoot.all('*', function(req, res) {
    res.status(404).end();
});


// Declare router
app.use('/', RouterRoot);


app.listen(app.get('port'), function() {
    console.log('Express server running at ' + app.get('port'));
});
