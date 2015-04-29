
// 125
// 57%
// 100%-60
// 100

var matchPercent = /^([-\.\d]*)(%?)$/;

var parsePercent = function( value ){

    var match = value.match( matchPercent );
    if( match ) {

        var num = match[1];
        var percent = match[2];

        if( percent === '%' ){
            return { percent: true, value: parseFloat( num ) / 100 };
        }else{
            return { percent: false, value: parseFloat( num) };
        }
    }else{
        return null;
    }

};

module.exports = parsePercent;