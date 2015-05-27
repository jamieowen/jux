
var test = require( 'tape' );
var ease = require( '../ease' );


test( 'test-ease-initialised', function(t){

    // current, to, ease, speed, happy
    var myEase = ease.to( 0, 10, 0.5, 0, 0.1 );

    t.equals( myEase[0], 0, 'test current position initialised' );
    t.equals( myEase[1], 10, 'test to position initialised' );
    t.equals( myEase[2], 0.5, 'test ease value initialised' );
    t.equals( myEase[3], 0, 'test speed value initialised' );
    t.equals( myEase[4], 0.1, 'test happy value initialised' );
    t.equals( myEase[5], false, 'test ease done value initialised' );

    t.end();

});

test( 'test-ease-complete', function(t){

    // current, to, ease, speed
    var myEase = ease.to( 0, 20, 1, 0 );

    var result = ease.update( myEase );

    t.equals( result, 20, 'test return result.' );
    t.equals( myEase[0], 20, 'test current position changed.' );

    result = ease.done( myEase );
    t.equals( result, true, 'test ease done' );

    t.end();

});

test( 'test-ease-forward', function(t){

    // current, to, ease, speed
    var myEase = ease.to( 0, 10, 0.5, 0, 0.5 );

    var result = ease.update( myEase );
    t.equals( result, 5, 'test ease update.' );
    t.equals( ease.done( myEase ), false, 'test ease not complete' );


    result = ease.update( myEase );
    t.equals( result, 7.5, 'test ease update.' );
    t.equals( ease.done( myEase ), false, 'test ease not complete' );


    result = ease.update( myEase );
    t.equals( result, 8.75, 'test ease update.' );
    t.equals( ease.done( myEase ), false, 'test ease not complete' );


    result = ease.update( myEase );
    t.equals( result, 9.375, 'test ease update.' );
    t.equals( ease.done( myEase ), false, 'test ease not complete' );


    result = ease.update( myEase );
    t.equals( result, 9.6875, 'test ease update.' );
    t.equals( ease.done( myEase ), false, 'test ease not complete' );


    // this should complete now..
    result = ease.update( myEase );
    // this value would be within the 0.5 happy distance.
    t.equals( result, 10, 'test ease update.' );
    t.equals( ease.done( myEase ), true, 'test ease complete' );

    t.end();

});
