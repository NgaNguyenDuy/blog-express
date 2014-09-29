'use strict';


var Post = require('../models/post');

exports.users = require('./users');
exports.posts = require('./posts');
exports.cates = require('./categories');


exports.index = function(req, res) {
    var user = {};
    if (req.session.user) {
        res.locals.isLogin = true;
        user = req.session.user.username;
    } else {
        res.locals.isLogin = false;
    }
    
    Post.find(function(err, data) {
        if(err) throw err;
        // console.log(data);
        res.render('index', {
            data: data,
            user: user
        });
    });
    


};
