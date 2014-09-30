'use strict';

var crypto = require('crypto');

module.exports = function() {
    
    var User = require('../models/user'),
        Post = require("../models/post");

    // Get method
    var userLogin = function(req, res) {
        res.render('login', {message : ''});
    };
    
    var userLogout = function(req, res) {
        req.session.destroy(function(){
            res.redirect('/');
        });
    };
    
    
    var adminArea = function(req, res) {
        var user = {};
        if (req.session.user) {
            res.locals.isLogin = true;
            user = req.session.user.username;
        } else {
            res.locals.isLogin = false;
        }
        
        Post.find(function(err, data) {
            if(err) throw err;

            res.render('admin', {
                user: user,
                data: data,
                messages: '<p class="alert alert-danger">Access denied. Admin Area.</p>'
            });
        });
    };
    
    
    // Get method
    var register = function(req, res) {
        res.render('register');
    };
    
    // Post method
    var reguser = function(req, res) {
        var user = new User();
        user.fullname = req.body.fullname;
        user.username = req.body.username;
        user.password =  crypto.createHash('md5').update(req.body.password).digest('hex');
        
        // Save user and check error
        user.save(function(err) {
            if(err) {
                res.send(err);
            } else {
                res.json({ message: 'User register successeful!'});
            }
        });
    };
    
    var authenticate = function(req, res, next) {
        if (!req.body.username || !req.body.password) {
            res.render('login', { 
                message: 'Please enter your username or password'
            });
        } else {
            User.findOne({
                username: req.body.username,
                password: crypto.createHash('md5').update(req.body.password).digest('hex')
            },function(err, user) {
                if(err) return next(err);
                if(!user) return res.render('login', {message : '<p class="alert alert-danger">Incorrect email&password combination</p>'});
                // console.log(user);
                req.session.user = user;
                // res.json('Success');
                res.redirect('/');
            });
        };
    };
    
    return {
        login: userLogin,
        logout: userLogout,
        authen: authenticate,
        register: register,
        reguser: reguser,
        admin: adminArea
    };
}();
