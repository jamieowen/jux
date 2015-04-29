
// Classes.
var ElementContainer = require( '../base/ElementContainer' );

// Functions.
var extend           = require( '../base/extend' );
var jsxConstructor   = require( '../jsx/jsxConstructor' );
var jsxMergeParse    = require( '../jsx/jsxMergeParse' );
var jsxParseSize     = require( '../jsx/jsxParseSize' );
var jsxParsePosition = require( '../jsx/jsxParsePosition' );


// Constructor
var Container = function(){

    ElementContainer.call( this );

    this.__layout = null;
    this.__layoutChanged = false;
};


var jsxParsers = jsxMergeParse( jsxParseSize, jsxParsePosition, {

    layout: function( element, value ){
        if( typeof value === 'string' ){

            // string lookup of known layout strings.
        }else{
            element.layout = value;
        }
    }
});

module.exports = jsxConstructor( Container, 'Container', jsxParsers );


Container.prototype = extend( ElementContainer, {

    viewClass: 'Container',
    constructor: Container,

    update: function( changed ){

        // check layout..
        if( this.__layoutChanged ){

            this.__layoutChanged = false;
            changed = true;

            if( this.__layout ){
                this.__layout.apply( this );
            }
        }

        // then update standard position,
        ElementContainer.prototype.update.call( this, changed );
    },

    updated: function(){
        // clean flags.
        this.updated.dispatch();
    }

});

Object.defineProperties( Container.prototype, {

    layout: {
        get: function(){
            return this.__layout;
        },

        set: function( layout ){

            if( this.__layout === layout ){
                return;
            }

            console.log( 'LAYOUT' );

            this.__layout = layout;
            this.__layoutChanged = true;
            this.invalidate();
        }
    }

});
