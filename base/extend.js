
var extend = function( cls, methods ){

    var def = Object.create( cls.prototype );

    for( var m in methods ){
        def[m] = methods[m];
    }

    return def;
};

module.exports = extend;
