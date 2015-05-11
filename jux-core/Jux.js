
var Jux = function(){

    this.factories = [];
};

Jux.prototype = {

    registerFactory: function( factory ){

        this.factories.push( factory );
    },

    proxy: function( element ){

        var len = this.factories.length;

        if( len === 0 ){
            throw new Error( '[Jux] No factories registered. Cannot create proxy objects for Elements.' );
        }else
        if( this.factories.length === 1 ){

            var factory = this.factories[0];
            if( factory.handles( element ) ){

                var proxy = factory.proxy( element );
                return proxy;
            }
        }
    }

};

var singleton = new Jux();
module.exports = singleton;

module.__exports = function(){

    var singleton = new Jux();

    return function(){
        return singleton;
    }
}();