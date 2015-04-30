
// Classes.
var ElementContainer = require( './base/ElementContainer' );
var DomViewFactory   = require( './dom/DomViewFactory' );

// Functions
var initialiseRecursive = require( './base/initialiseRecursive' );

// Jsx Functions.
var jsxConstructor   = require( './jsx/jsxConstructor' );
var jsxMergeParse    = require( './jsx/jsxMergeParse' );
var jsxParseSize     = require( './jsx/jsxParseSize' );
var jsxParsePosition = require( './jsx/jsxParsePosition' );


var DomContext = function(){

    ElementContainer.call( this );

    console.log( 'CREATE DOM CONTEXT' );

    this.domElement = document.body;//document.createElement( 'div' );
    this.viewFactory = new DomViewFactory();

    this.__context = this; // TODO : look at this?

    this.isContext = true;

    initialiseRecursive(this.__context, this, ElementContainer );

};

DomContext.prototype = Object.create( ElementContainer.prototype );
DomContext.prototype.constructor = DomContext;
DomContext.prototype.viewClass = 'Container';


var jsxParsers = jsxMergeParse( jsxParseSize, jsxParsePosition, {
});


module.exports = jsxConstructor( DomContext, 'DomContext', jsxParsers );


DomContext.prototype.initialise = function() {

    console.log('DOM CONTEXT INITIALISE');
};
