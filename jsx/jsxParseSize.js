
var parsePercent = require( './parsePercent' );
var parseExpression = require( './parseExpression' );

var jsxParseSize = {

    width: function( element, value ){

        var parse = parseExpression( value );
        //var parse = parsePercent( value );
        if( !parse ){
            throw new Error( 'Error parsing width property with value :' + value );
        }else
        if( parse.expression ){
            element.size.widthExp = parse.value;
        }else{
            element.size.width = parse.value;
        }
    },

    height: function( element, value ){

        var parse = parseExpression( value );
        if( !parse ){
            throw new Error( 'Error parsing height property with value :' + value );
        }else
        if( parse.expression ){
            element.size.heightExp = parse.value;
        }else{
            element.size.height = parse.value;
        }

    },

    depth: function( element, value ){

        var parse = parseExpresion( value );
        if( !parse ){
            throw new Error( 'Error parsing depth property with value :' + value );
        }else
        if( parse.expression ){
            element.size.depthExp = parse.value;
        }else{
            element.size.depth = parse.value;
        }

    }
};

module.exports = jsxParseSize;