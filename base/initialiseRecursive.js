
var ElementContainer = require( './ElementContainer' );


var initialiseRecursive = function( context, element ){

    if( !element.__inited && context ){

        element.__view = context.viewFactory.createView( element );

        if( element.__parent ){
            element.signals.added.dispatch( element.__parent );
        }

        element.initialise();
        element.__inited = true;
        element.invalidate();

        if( element instanceof ElementContainer ){

            for( var i = 0; i<element.children.length; i++ ){
                initialiseRecursive( context, element.children[ i ] );
            }
        }
    }

};

module.exports = initialiseRecursive;
