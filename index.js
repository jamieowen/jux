
// temp feel for import

// default core
var Jux         = require( 'jux-core' );
var DomFactory  = require( 'jux-dom' );

// this may be should go in the factory module.
Jux.registerFactory( new DomFactory() );

// interaction
Jux.Pointer     = require( 'jux-pointer' );
//Jux.Wheel     = require( 'jux-wheel' );
//Jux.Keys      = require( 'jux-keys' );

// parts
Jux.Element     = require( 'jux-element' );
Jux.Attribute   = require( 'jux-attribute' );
Jux.ScrollAxis  = require( 'jux-scroll-axis' );

// components
Jux.Scroller    = require( 'jux-scroller' );

// layouts
//Jux.Stack     = require( 'jux-stack' );

// etc...


module.exports = Jux;