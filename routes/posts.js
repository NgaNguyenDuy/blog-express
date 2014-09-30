'use strict';

var mongoose = require('mongoose');

module.exports = function() {
    
    var Cat = require('../models/category'),
        User = require('../models/user'),
        Post = require('../models/post'),
        catNames = [],
        authors = [];
    
    var create = function(req, res) {
        
        if (!req.body.title || !req.body.slug || !req.body.text) {
            res.render('post', {
                catname: catNames,
                author: authors,
                message: '<p class="alert alert-danger">Please enter all field!</p>'
            });
        } else {
            var post = new Post();

            User.find(function(err, data) {
                if (err) throw err;
                for(var i = 0, l = data.length; i < l; i++) {
                    if(req.body.author == data[i].username) {
                        post.Author = data[i]._id;
                    }
                }
                
                Cat.find(function(err, data) {
                    if (err) throw err;
                    for(var i = 0, l = data.length; i < l; i++) {
                        if(req.body.categories == data[i].cat_name) {
                            // console.log('This id is: ' + data[i]._id);
                            post.category = data[i]._id;

                        }
                    };
                    post.title = req.body.title;
                    post.slug =  req.body.slug;
                    post.content = req.body.text;
                    
                    
                    post.save(function(err) {
                        if(err) {
                            res.send(err);
                        } else {
                            // res.json({message: 'Added post successeful'});
                            res.redirect('/admin');
                        }
                    });
                });
            });
            //  res.json(post);
        }
    };
    
    // Show detail article.
    var show = function(req, res, next) {
        // console.log(req.params.slug);
        if (req.session.user) {
            res.locals.isLogin = true;

            var user = req.session.user.username;
        } else {
            res.locals.isLogin = false;
        }
        
        if(!req.params.slug) return next(new Error('No article slug'));
        Post.findOne({slug: req.params.slug}, function(err, data) {
            // res.json(data.title);
            res.render('article', {
                user: user,
                title: data.title,
                content: data.content
            });
        });
    };
    
    
    // List all post
    var read = function(req, res) {
        if (req.session.user) {
            res.locals.isLogin = true;
            var user = req.session.user.username;
        } else {
            res.locals.isLogin = false;
        }
        User.find(function(err, dataUser) {
            if (err) throw err;
            
            for(var i = 0, l = dataUser.length; i < l; i++) {
                authors.push(dataUser[i]);
            }
            
            Cat.find(function(err, data) {
                if (err) {
                    res.send(err);
                } else {
                    
                    for(var i = 0, l = data.length; i < l; i++) {
                        catNames.push(data[i]);
                    }
                    
                    
                    res.render('post', {
                        user: user,
                        catname: data,
                        author: dataUser,
                        message: ''
                    });
                }
            });
        });
            
    };
    
    // update a post
    var updatePost = function(req, res) {
        if (!req.body.title || !req.body.slug || !req.body.text) {
            res.render('post', {
                catname: catNames,
                author: authors,
                message: '<p class="alert alert-danger">Please enter all field!</p>'
            });
        } else {
            console.log(req.body);
            
            Post.update({_id: req.params.id}, {title: req.body.title , slug: req.body.slug, content: req.body.text}, {multi: true}, function (err, data){
                if(err) {
                    console.log('Err : ', err);
                }else {
                    console.log('Update',data);
                }
            });
        }
    };
    
    
    // Get method edit post
    var update = function(req, res) {
        if (req.session.user) {
            res.locals.isLogin = true;
            var user = req.session.user.username;
        } else {
            res.locals.isLogin = false;
        }
        if(!req.params.post_id) return new Error('No post id');
        Post
            .findById(req.params.post_id)
            .populate('category', 'cat_name')
            .populate('Author', 'username')
            .exec(function(err, data) {
                if(err) throw err;
                // console.log(data);
                res.render('editpost', {
                    data_post: data,
                    user: data.user
                });
            });
        // Post.findById(req.params.post_id, function(err, data) {
        //     if(err) throw err;
        //     console.log(data.category);
        //     res.render('editpost', {
        //         data_post: data,
        //         user: data.user
        //     });
        // });
    };
    
    var del = function(req, res, next) {
        if(!req.params.post_id) return  next(new Error('No posts not found'));
        Post.remove({_id: req.params.post_id}, function(err, data) {
            if(err) throw err;
            // res.send('Delete success: ' + data);
            res.redirect('/admin');
        });
    };
    
    var api_posts = function(req, res) {
        Post.find(function(err, data) {
            res.json(data);
        });
    };
    
    
    return {
        create: create,
        read: read,
        update: update,
        del: del,
        show: show,
        updatePost: updatePost,
        api_posts: api_posts
    };
}();
