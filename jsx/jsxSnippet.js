

// TODO !!!!! ( IF EVEN NEEDED )

var jsxConstructor   = require( './jsxConstructor' );
var jsxMergeParse    = require( './jsxMergeParse' );
var jsxParsePosition = require( './jsxParsePosition' );


var jsxSnippet = function( jsxCreateFunction, jsxParsers ) {

    jsxParsers = jsxParsers === undefined ? {} : jsxParsers;
    jsxParsers = jsxMergeParse( jsxParsePosition, jsxParsers );

    var create = function( props, children ){
        var obj = jsxCreateFunction();

        jsxConstructor( obj, jsxParsers );
    };

    return create;
};