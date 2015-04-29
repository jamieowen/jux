
var Element = require( '../base/Element' );

var jsxConstructor = function( cls, clsName, jsxParsers, unhandledChild ){

    // TODO : clsName probably not needed..

    var construct = function( props, children ){

        console.log( 'CONSTRUCT : ',arguments );

        var element = new cls();
        var i,child,prop;

        var parse;
        for( prop in props ){

            parse = jsxParsers[ prop ];

            if( parse ){
                parse( element, props[prop] )
            }else{
                element[ prop ] = props[prop];
            }

        }

        // add children

        if( element.add && children ){

            for( i = 0; i<children.length; i++ ){

                child = children[i];
                if( child instanceof Element ){
                    element.add( child );
                }else
                if( unhandledChild ){ // html handling.
                    if( child instanceof Array ){
                        console.log( 'ARRAY' );
                        for( var j = 0; j<child.length; j++ ){
                            unhandledChild( element, child[j] );
                        }
                    }else{
                        console.log( [] instanceof Array, 'standard child' );
                        unhandledChild( element, child );
                    }

                }else{
                    throw new Error( 'Unhandled child in jsx parsing.' );
                }
            }
        }

        return element;
    };

    return construct;
};

module.exports = jsxConstructor;
