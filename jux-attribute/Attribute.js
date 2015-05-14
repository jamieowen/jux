
var Signal = require( 'jux-signal' );

var Attribute = function(){

    this.__x = 0;
    this.__y = 0;
    this.__z = 0;

    // if this attribute has been modified internally.
    // ( not from the view. e.g dom element )
    this.modified = false;

    this.changed = new Signal();
};


module.exports = Attribute;


var properties = {

    x: {
        get: function(){
            return this.__x;
        },
        set: function( value ){
            if( value === this.__x ){
                return;
            }
            this.modified = true;
            this.__x = value;
        }
    },

    y: {
        get: function(){
            return this.__y;
        },
        set: function( value ){
            if( value === this.__y ){
                return;
            }
            this.modified = true;
            this.__y = value;
        }
    },

    z: {
        get: function(){
            return this.__z;
        },
        set: function( value ){
            if( value === this.__z ){
                return;
            }
            this.modified = true;
            this.__z = value;
        }
    }
};

Object.defineProperties( Attribute.prototype, {

    x: properties.x,
    y: properties.y,
    z: properties.z,

    width: properties.x,
    height: properties.y,
    depth: properties.z

});

