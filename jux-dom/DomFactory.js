
var Attribute = require( 'jux-attribute' );

var DomFactory = function(){

    this.elementMap = new WeakMap();

    //window.addEventListener( 'resize', ... )
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

    proxy: function( element ){

        console.log( 'WEAK MAP SORT : PROXY : ', element );
        var cached = null;//this.elementMap[ element ];

        if( cached ){
            return cached;
        }else{
            cached = new DomElementProxy( element );
            this.elementMap[ element ] = cached;
            return cached;
        }
    },

    create: function(){
        // not used. - later
    }
};


// Standard handler.

var DomElementProxy = function( domElement ){

    this.view = domElement;
    //this.view.style.position = 'absolute';

    this.view.addEventListener( 'resize', function( event ){
        console.log( 'DOM RESIZE : ', this.view.getBoundingClientRect() );
    }, true);

    this.view.onresize = function(){
        console.log( 'dom resize' );
    };

    this.__calculateViewSize();

};

DomElementProxy.prototype = {

    __calculateViewSize: function(){

        var bounds = this.view.getBoundingClientRect();

        this.size.__x = bounds.right - bounds.left;
        this.size.__y = bounds.bottom - bounds.top;

        console.log( 'TODO : LAYOUT NOW - SET DOM ELEMENT SIZE : ', this.size );
    },

    update: function(){

        var transform = '';
        if( this.__position ){
            transform += 'translate(' + this.__position.x + 'px, ' + this.__position.y + 'px)';
        }
        if( this.__rotation ){
            transform += ' rotate(' + this.__rotation.x + 'deg)';
        }
        if( this.__scale ){
            transform += ' scale(' + this.__scale.x + ', ' + this.__scale.y + ')';
        }

        this.view.style.transform = transform;

        // only adjust the view size explicitly if we have changed internally. ( i.e. not from listening to changes in the view )
        if( this.__size && this.__size.modified ){
            this.view.style.width  = this.__size.width;
            this.view.style.height = this.__size.height;
        }
    },

    getChildren: function(){
        return this.view.childNodes;
    }
};

Object.defineProperties( DomElementProxy.prototype, {

    size: {
        get: function(){
            if( !this.__size ){
                this.__size = new Attribute();
            }
            return this.__size;
        }
    },

    position: {
        get: function(){
            if( !this.__position ){
                this.__position = new Attribute();
            }
            return this.__position;
        }
    },

    rotation: {
        get: function(){
            if( !this.__rotation ){
                this.__rotation = new Attribute();
            }
            return this.__rotation;
        }
    },

    scale: {
        get: function(){
            if( !this.__scale ){
                this.__scale = new Attribute();
            }
            return this.__scale;
        }
    }

} );

