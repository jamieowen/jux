
var test = require( 'tape' );
var between = require( '../between' );


test( 'test-between', function(t){

    t.equals( between( 0, -5, 10 ), true, 'YES' );
    t.equals( between( 100, -5, 10 ), false, 'NO' );
    t.equals( between( -100, -5, 10 ), false, 'NO' );

    t.equals( between( -7, -5, -10 ), true, 'YES' );
    t.equals( between( -11, -5, -10 ), false, 'NO' );
    t.equals( between( -4, -5, -10 ), false, 'NO' );

    t.equals( between( 3, 1, 10 ), true, 'YES' );
    t.equals( between( 0, 1, 10 ), false, 'NO' );
    t.equals( between( 11, 1, 10 ), false, 'NO' );

    t.end();
});