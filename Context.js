

var Invalidation     = require( './managers/Invalidation' );
var Signal           = require( './core/Signal' );

// Classes.
var Element          = require( './base/Element' );

// Functions.
var initialiseRecursive = require( './base/initialiseRecursive' );


/**
 *
 *  Contexts should not inherit from any base Element class.
 *  This allows a root element to be specified of any type.
 *
 *  Also this ties in with not allowing the context to be created through jsx.
 *
 */
var Context = function( viewFactory )
{
    if( viewFactory === undefined ){
        throw new Error( 'Specify a view factory.' );
    }

    this.viewFactory = viewFactory;

    // managers..
    // invalidation manager
    // or rename dirty manager
    // metrics manager?

    //this.invalidation = new Invalidation();

    this.rootElement = null;
};

module.exports = Context;

Context.prototype =
{
    constructor: Context,

    create: function( rootElement ) {

        // set a root view element.
        if( rootElement instanceof Element ){

            this.rootElement = rootElement;

            initialiseRecursive( this, this.rootElement );

        }else{
            throw new Error( 'Context must have a rootElement set.')
        }

    },

    update: function()
    {
        if( this.rootElement ){
            this.rootElement.update();
        }
    }

};