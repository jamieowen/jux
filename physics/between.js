
var between = function( x, a, b ){
    //return ( a - val ) + ( b - val ) === ( b - a );
    return (x-a)*(x-b)<=0;
};
module.exports = between;
