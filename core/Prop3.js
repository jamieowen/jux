
var Signal = require( './Signal' );

var Prop3 = function() {

    this.changedSignal = new Signal();
    this.hasChanged = false;

    this.__x = 0.0;
    this.__y = 0.0;
    this.__z = 0.0;

    this.__xPercent = NaN;
    this.__yPercent = NaN;
    this.__zPercent = NaN;

    // expression functions.
    this.__xExp = null;
    this.__yExp = null;
    this.__zExp = null;
};

var percentExpression = function( value, mult ){
    return value * mult;
};

module.exports = Prop3;


Prop3.prototype = {

    constructor: Prop3,

    set: function( x, y, z )
    {
        var c = false;

        if( this.__x !== x ){
            c = true;
            this.__xPercent = NaN;
            this.__x = x;
        }

        if( this.__y !== y ){
            c = true;
            this.__yPercent = NaN;
            this.__y = y;
        }

        if( this.__z !== z ){
            c = true;
            this.__zPercent = NaN;
            this.__z = z;
        }

        if( c ){
            this.hasChanged = true;
            this.changedSignal.dispatch();
        }
    },

    // set as value from 0 - 1
    setPercent: function( x, y, z )
    {
        var c = false;

        if( this.__xPercent !== x ){
            c = true;
            this.__xPercent = x;
        }

        if( this.__yPercent !== y ){
            c = true;
            this.__yPercent = y;
        }

        if( this.__zPercent !== z ){
            c = true;
            this.__zPercent = z;
        }

        if( c ){
            this.hasChanged = true;
            this.changedSignal.dispatch();
        }
    },

    setExpression: function( x, y, z ) {

        var c = false;

        if( x !== this.__xExp ){
            c = true;
            this.__xExp = x;
        }

        if( y !== this.__yExp ){
            c = true;
            this.__yExp = y;
        }

        if( z !== this.__zExp ){
            c = true;
            this.__zExp = z;
        }

        if( c ){
            this.hasChanged = true;
            this.changedSignal.dispatch();
        }
    },

    // update percentages.
    update: function( forceUpdate, parentProp3 ){

        if( this.hasChanged || forceUpdate ){
            this.hasChanged = false;

            // update expression based values.
            if( parentProp3 ){
                if( this.__xExp ){
                    this.__x = this.__xExp( parentProp3.x );
                }

                if( this.__yExp ){
                    this.__y = this.__yExp( parentProp3.y );
                }

                if( this.__zExp ){
                    this.__z = this.__zExp( parentProp3.z );
                }
            }
            return true;

        }else{
            return false;
        }
    }

};

// reused for alternate namings below.
var properties = {

    x: {
        get: function(){
            return this.__x;
        },

        set: function( value ){
            if( this.__x === value )
                return;

            this.__x = value;
            this.__xPercent = NaN;
            this.__xExp = null;

            this.hasChanged = true;
            this.changedSignal.dispatch();
        }
    },

    y: {
        get: function(){
            return this.__y;
        },

        set: function( value ){
            if( this.__y === value )
                return;

            this.__y = value;
            this.__yPercent = NaN;
            this.__yExp = null;

            this.hasChanged = true;
            this.changedSignal.dispatch();
        }
    },

    z: {
        get: function(){
            return this.__z;
        },

        set: function( value ){
            if( this.__z === value )
                return;

            this.__z = value;
            this.__zPercent = NaN;
            this.__zExp = null;

            this.hasChanged = true;
            this.changedSignal.dispatch();
        }
    }
};

var percentProperties = {

    xPercent: {
        get: function(){
            return this.__xPercent;
        },

        set: function( value ){
            if( this.__xPercent === value )
                return;

            this.__xPercent = value;
            var value = value;
            this.__xExp = function( xExpArg ){
                return value * xExpArg;
            };

            this.hasChanged = true;
            this.changedSignal.dispatch();
        }
    },

    yPercent: {
        get: function(){
            return this.__yPercent;
        },

        set: function( value ){
            if( this.__yPercent === value )
                return;

            this.__yPercent = value;
            var value = value;
            this.__yExp = function( yExpArg ){
                return value * yExpArg;
            };

            this.hasChanged = true;
            this.changedSignal.dispatch();
        }
    },

    zPercent: {
        get: function(){
            return this.__zPercent;
        },

        set: function( value ){
            if( this.__zPercent === value )
                return;

            this.__zPercent = value;
            var value = value;
            this.__zExp = function( zExpArg ){
                return value * zExpArg;
            };

            this.hasChanged = true;
            this.changedSignal.dispatch();
        }
    }
};

var expProperties = {

    xExp: {
        get: function(){
            return this.__xExp;
        },

        set: function( value ){
            if( this.__xExp === value )
                return;

            this.__xExp = value;
            this.hasChanged = true;
            this.changedSignal.dispatch();
        }
    },

    yExp: {
        get: function(){
            return this.__yExp;
        },

        set: function( value ){
            if( this.__yExp === value )
                return;

            this.__yExp = value;
            this.hasChanged = true;
            this.changedSignal.dispatch();
        }
    },

    zExp: {
        get: function(){
            return this.__zExp;
        },

        set: function( value ){
            if( this.__zExp === value )
                return;

            this.__zExp = value;
            this.hasChanged = true;
            this.changedSignal.dispatch();
        }
    }
};



Object.defineProperties( Prop3.prototype,
{
    x: properties.x,
    y: properties.y,
    z: properties.z,

    width: properties.x,
    height: properties.y,
    depth: properties.z,

    xPercent: percentProperties.xPercent,
    yPercent: percentProperties.yPercent,
    zPercent: percentProperties.zPercent,

    widthPercent: percentProperties.xPercent,
    heightPercent: percentProperties.yPercent,
    depthPercent: percentProperties.zPercent,

    xExp: expProperties.xExp,
    yExp: expProperties.yExp,
    zExp: expProperties.zExp,

    widthExp: expProperties.xExp,
    heightExp: expProperties.yExp,
    depthExp: expProperties.zExp

});