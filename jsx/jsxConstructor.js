
var Element = require( '../base/Element' );
var ElementContainer = require( '../base/ElementContainer' );

//

var jsxConstructor = function( cls, jsxParsers, unhandledChild ){

    // TODO : clsName probably not needed..

    var construct = function( props, children ){

        var element = new cls();
        var i,child,prop;

        console.log( 'CONSTRUCT : ', props, children, cls instanceof Function );
        var parse;
        for( prop in props ){

            parse = jsxParsers[ prop ];

            if( parse ){
                parse( element, props[prop] )
            }else{
                element[ prop ] = props[prop];
            }

        }

        // handle children.
        if( children && children.length ){

            for( i = 0; i<children.length; i++ ){
                child = children[i];
                if( child instanceof Element && element instanceof ElementContainer ){
                    element.add( child );
                }else
                if( unhandledChild ){ // this can happen when html elements are used.

                    if( child instanceof Array ){
                        for( var j = 0; j<child.length; j++ ){
                            unhandledChild( element, child[j] );
                        }
                    }else{
                        unhandledChild( element, child );
                    }
                }else{
                    throw new Error( 'Unhandled child or element in jsx parsing.' );
                }
            }
        }

        return element;
    };

    return construct;
};

module.exports = jsxConstructor;
