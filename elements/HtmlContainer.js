
// Classes.
var ElementContainer = require( '../base/ElementContainer' );

// Functions.
var jsxConstructor   = require( '../jsx/jsxConstructor' );
var jsxMergeParse    = require( '../jsx/jsxMergeParse' );
var jsxParseSize     = require( '../jsx/jsxParseSize' );
var jsxParsePosition = require( '../jsx/jsxParsePosition' );

// Constructor
var HtmlContainer = function(){

    ElementContainer.call( this );

    //this.domElement = ''
};

var jsxParsers = jsxMergeParse( jsxParseSize, jsxParsePosition, {
});

module.exports = jsxConstructor( HtmlContainer, 'HtmlContainer', jsxParsers, function( element, child ){
    console.log( 'unhandled child', element, child );


});

module.exports.create = function( elementType, props, children )
{
    var domElement = document.createElement( elementType );

    if( children ){
        var child;
        for( var i = 0; i<children.length; i++ ){
            child = children[i];
            if( typeof child === 'string' ){
                domElement.innerText = child;
            }else
            if( child instanceof HTMLElement ){
                domElement.appendChild( child );
            }else{
                throw new Error( 'Unhandled child in jsx/html parsing.' );
            }
        }
    }

    return domElement;
};



HtmlContainer.prototype = Object.create(ElementContainer.prototype);
HtmlContainer.prototype.constructor = HtmlContainer;
HtmlContainer.prototype.viewClass   = 'HtmlContainer';


Object.defineProperties( HtmlContainer.prototype, {

    domElement: {
        get: function(){

        },

        set: function(){

        }
    }
});
