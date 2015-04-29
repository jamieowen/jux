
// generate uid using base62
// limit to just 3 chars for use in CSS etc. / max id = 238,327

var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
var uid  = 0;

var max = (62*62*62)-1;

var generateUID = function(){

    var id = uid;
    var idx;
    var result = '';
    while( id !== 0 ){
        idx = id % chars.length;
        id = Math.floor( id / chars.length );
        result = chars[ idx ] + result;
    }
    uid++;

    if( uid >= max )
        throw new Error( 'Max exceeded for 3 chars @ base 62. Way too many elements..' );

    return ( '000' + result ).slice( -3 );
};

module.exports = generateUID;