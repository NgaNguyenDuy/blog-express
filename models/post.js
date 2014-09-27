'use strict';

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema,
    ObjectId     = mongoose.Schema.Types.ObjectId;


var PostSchema   = new Schema({
    title : {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    
    slug: {
        type: String,
        required: true
    },
    
    Author: {
        type: ObjectId,
        ref: 'users',
        required: true
    },
    
    createAt : {
        type: Date,
        default: Date.now()
    },
    
    category: {
        type: ObjectId,
        ref: 'categories',
        required: true
    }
    
    
    
});

module.exports = mongoose.model('posts', PostSchema);
