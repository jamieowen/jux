
var DomElementProxy = require( './DomElement' );


var DomFactory = function(){

    this.elementMap = new WeakMap();
};


module.exports = DomFactory;

// TODO: Ignored for now dues to singleton problems possibly only with browserify
/**
module.exports = function(){

    var registered = false;

    return function() {

        if( registered ){
            return;
        }

        registered = true;
        var singleton = new DomFactory();
        //Jux.registerFactory( singleton );

        //console.log( 'JUX : ', Jux );
        return singleton;
    };

}();**/


DomFactory.prototype = {

    handles: function( element ){

        if( element instanceof HTMLElement ){
            return true;
        }else{
            return false;
        }
    },

    proxy: function( JuxClass, domElement, depth ) {

        var cached = this.elementMap.get( domElement );

        if( cached ){
            return cached;
        }else{

            if( depth === undefined ){
                depth = 1;
            }

            var proxy = new DomElementProxy( domElement );
            var element = new JuxClass( proxy );

            if( depth > 0 ){
                var children = proxy.getChildren();
                for( var i = 0; i<children.length; i++ ){
                    element.add( this.proxy( JuxClass, children[i], depth-1 ) );
                }
            }

            this.elementMap.set( domElement, element );
            return element;
        }
    },

    create: function(){
        // not used. - later
    }
};