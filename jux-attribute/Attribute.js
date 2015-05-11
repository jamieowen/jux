

var Attribute = function(){

    this.__x = 0;
    this.__y = 0;
    this.__z = 0;

    this.modified = false;

};


module.exports = Attribute;


var properties = {

    x: {
        get: function(){
            return this.__x;
        },
        set: function( value ){
            this.modified = true;
            this.__x = value;
        }
    },

    y: {
        get: function(){
            return this.__y;
        },
        set: function( value ){
            this.modified = true;
            this.__y = value;
        }
    },

    z: {
        get: function(){
            return this.__z;
        },
        set: function( value ){
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

