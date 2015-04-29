
var jsxMergeParse = function(){

    if( arguments.length === 0 ){
        return {};
    }
    var obj = {};
    var merge,p;

    for( var i = 0; i<arguments.length; i++ ) {
        merge = arguments[i];
        for( p in merge ){
            obj[p] = merge[p];
        }
    }

    return obj;
};


module.exports = jsxMergeParse;