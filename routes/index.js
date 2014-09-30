'use strict';


var Post = require('../models/post');
var Category = require('../models/category');

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
        
        Category.find(function(err, cat) {
            if(err) throw err;
            
            res.render('index', {
                cats: cat,
                data: data,
                user: user
            });
        });
        

    });
    


};
