
// Classes.
var Element = require( '../base/Element' );
var Signal  = require( '../core/Signal' );

// Functions.
var jsxConstructor   = require( '../jsx/jsxConstructor' );
var jsxMergeParse    = require( '../jsx/jsxMergeParse' );
var jsxParseSize     = require( '../jsx/jsxParseSize' );
var jsxParsePosition = require( '../jsx/jsxParsePosition' );

// Constructor
var HtmlContainer = function(){

    Element.call( this );

    this.domElements = [];
    this.signals.domElementAdded = new Signal();
    this.signals.domElementRemoved = new Signal();
};

var jsxParsers = jsxMergeParse( jsxParseSize, jsxParsePosition, {
});

module.exports = jsxConstructor( HtmlContainer, jsxParsers, function( element, child ){

    if( element instanceof HtmlContainer && child instanceof HTMLElement ){
        element.addDomElement( child );
    }else{
        throw new Error( 'Error parsing jsx/html children of HtmlContainer' );
    }
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


HtmlContainer.prototype = Object.create(Element.prototype);
HtmlContainer.prototype.constructor = HtmlContainer;
HtmlContainer.prototype.viewClass   = 'HtmlContainer';


HtmlContainer.prototype.addDomElement = function( domElement ){

    var idx = this.domElements.indexOf( domElement );
    if( idx === -1 ){
        this.domElements.push( domElement );
        this.signals.domElementAdded.dispatch( domElement );
    }
};

HtmlContainer.prototype.removeDomElement = function( domElement ){

    var idx = this.domElements.indexOf( domElement );
    if( idx > -1 ){
        this.domElement.splice( idx, 1 );
        this.signals.domElementRemoved.dispatch( domElement );
    }
};

Object.defineProperties( HtmlContainer.prototype, {

    domElement: {
        get: function(){

        },

        set: function(){

        }
    }
});
