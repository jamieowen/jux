
var parsePercent = require( './parsePercent' );

var jsxParsePosition = {

    x: function( element, value ){

        var parse = parsePercent( value );
        if( !parse ){
            throw new Error( 'Error parsing x property with value :' + value );
        }else
        if( parse.percent ){
            element.position.xPercent = parse.value;
        }else{
            element.position.x = parse.value;
        }
    },

    y: function( element, value ){

        var parse = parsePercent( value );
        if( !parse ){
            throw new Error( 'Error parsing y property with value :' + value );
        }else
        if( parse.percent ){
            element.position.yPercent = parse.value;
        }else{
            element.position.y = parse.value;
        }

    },

    z: function( element, value ){

        var parse = parsePercent( value );
        if( !parse ){
            throw new Error( 'Error parsing z property with value :' + value );
        }else
        if( parse.percent ){
            element.position.zPercent = parse.value;
        }else{
            element.position.z = parse.value;
        }

    }
};

module.exports = jsxParsePosition;