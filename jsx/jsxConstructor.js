
var jsxConstructor = function( cls, clsName, jsxParsers ){

    var construct = function( props, children ){

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
                element.add( child );
            }
        }

        return element;
    };

    return construct;
};

module.exports = jsxConstructor;
