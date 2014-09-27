'use strict';

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema,
    ObjectId     = mongoose.Schema.Types.ObjectId;

var UserSchema   = new Schema({
    fullname : {
        type: String,
        required : true
    },
    
    username : {
        type: String,
        required: true
    },
    
    password : {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('users', UserSchema);
