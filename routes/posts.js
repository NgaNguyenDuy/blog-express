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
                        post.Author = new mongoose.Types.ObjectId(data[i]._id);
                    }
                }
                
                Cat.find(function(err, data) {
                    if (err) throw err;
                    for(var i = 0, l = data.length; i < l; i++) {
                        if(req.body.categories == data[i].cat_name) {
                            // console.log('This id is: ' + data[i]._id);
                            post.category = new mongoose.Types.ObjectId(data[i]._id);

                        }
                    };
                    post.title = req.body.title;
                    post.slug =  req.body.slug;
                    post.content = req.body.text;
                    
                    post.save(function(err) {
                        if(err) {
                            res.send(err);
                        } else {
                            res.json({message: 'Added post successeful'});
                        }
                    });
                });
            });
            //  res.json(post);
        }
    };
    
    var read = function(req, res) {
        User.find(function(err, dataUser) {
            if (err) throw err;

            Cat.find(function(err, data) {
                if (err) {
                    res.send(err);
                } else {
                    res.render('post', {
                        // catname: catNames,
                        catname: data,
                        author: dataUser,
                        message: ''
                    });
                }
            });
        });
            
    };
    
    
    var update = function() {
        console.log('update');
    };
    
    var del = function() {
        console.log('delete');
    };
    
    return {
        create: create,
        read: read,
        update: update,
        del: del
    };
}();
