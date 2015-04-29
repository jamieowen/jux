
// Core
var Context = require( '../Context' );

// Elements
var Sprite = require( '../elements/Sprite' );
var ElementContainer = require( '../base/ElementContainer' );

// Views
var HtmlContainer = require( './html/HtmlContainer' );
var HtmlSprite    = require( './html/HtmlSprite' );


var HtmlContext = function()
{
    Context.call( this );

    // initialise the context straight away.
    this.initialise();
    this.__inited = true;
    this.invalidate();
};


module.exports = HtmlContext;


HtmlContext.prototype = Object.create( Context.prototype );
HtmlContext.prototype.constructor = HtmlContext;

HtmlContext.prototype.initialise = function()
{
    this.createView();

    console.log( 'context initialise' );

};

/**
 * Handle the createView method on Elements.
 * @param element
 * @returns {*}
 */

HtmlContext.prototype.__createViewImpl = function( element )
{
    console.log( '[HtmlContext] createView :', element.uid );
    if( element instanceof Sprite )
        return new HtmlSprite( element );
    else if( element instanceof ElementContainer )
        return new HtmlContainer( element );
    else if( element instanceof HtmlContext )
        return new HtmlContainer( element );
    else
        return null;
};

