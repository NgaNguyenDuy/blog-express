'use strict';

module.exports = function() {
    var create = function() {
        console.log('create');
    };
    
    var read = function() {
        console.log('read');
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
