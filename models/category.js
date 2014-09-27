'use strict';

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CatSchema   = new Schema({
	cat_name: {
        type : String,
        required: true
    }
});

module.exports = mongoose.model('categories', CatSchema);
