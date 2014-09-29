'use strict';

module.exports = function() {
    
    var Cate = require('../models/category');
    
    var add = function(req, res) {
        var cat = new Cate();
        // cat.cat_name = req.body.cate_name;
        
        cat.cat_name =  req.body.cat_name;
        
        cat.save(function(err) {
            if (err) {
                res.send(err);
            } else {
                res.json({message: 'Added category successeful!'});
            }
        });
    };
    
    return {
        add: add
    };
}();
