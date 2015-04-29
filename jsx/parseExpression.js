
// match basic expression -
// 44 ||
// 50%
// 50% - 80
var matchExp = /^([\.\d]*)(%?)([-])?([\.\d]*)$/;
var replaceS = /\s*/g;

var parseExpression = function( value ) {

    value = value.replace( replaceS, '' );

    // match the most basic - e.g. 125(px) or 50% ( 0.5 * parent.width )
    var match = value.match( matchExp );

    if( match ) {

        var num = parseFloat( match[1] );
        var percent = match[2];
        var operator = match[3];
        var operand = parseFloat( match[4] );

        if( percent === '%' && ( operator !== '-' && isNaN(operand) ) ){

            num *= 0.01;
            return { expression: true, value: function( expArg ){
                return num * expArg;
            } };
        }else
        if( percent === '%' && operator === '-' && !isNaN(operand) ){

            num *= 0.01;
            return { expression: true, value: function( expArg ){
                return ( num * expArg ) - operand;
            } };
        }else{

            return { expression: false, value: num };
        }
    }else{
        // TODO :  handle anything else with eval.
        return null;
    }

};

module.exports = parseExpression;