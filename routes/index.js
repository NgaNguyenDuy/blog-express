'use strict';


exports.users = require('./users');
exports.posts = require('./posts');

exports.index = function(req, res) {
    var user = {};
    if (req.session.user) {
        res.locals.isLogin = true;
        user = req.session.user.username;
    } else {
        res.locals.isLogin = false;
    }
    
    res.render('index', {
        data: [],
        user: user
    });

};
