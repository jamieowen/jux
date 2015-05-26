
var Signal = require( 'jux-signal' );


var Attribute = function(){

    this.values = [0,0,0];

    // if this attribute has been modified internally.
    // ( not from the view. e.g dom element )
    this.modified = false;

    this.changed = new Signal();
};


module.exports = Attribute;


var properties = {

    x: {
        get: function(){
            return this.values[0];
        },
        set: function( value ){
            if( value === this.values[0] ){
                return;
            }
            this.modified = true;
            this.values[0] = value;
        }
    },

    y: {
        get: function(){
            return this.values[1];
        },
        set: function( value ){
            if( value === this.values[1] ){
                return;
            }
            this.modified = true;
            this.values[1] = value;
        }
    },

    z: {
        get: function(){
            return this.values[2];
        },
        set: function( value ){
            if( value === this.values[2] ){
                return;
            }
            this.modified = true;
            this.values[2] = value;
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

