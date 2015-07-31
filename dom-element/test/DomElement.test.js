
var test = require( 'tape' );
var DomElement = require( '../DomElement' );

test( 'sets 2d x,y position.', function(t){

    var ele = new DomElement();

    console.log( document );

    ele.x = 10;
    ele.y = 15;
    ele.z = 20;

    t.equals( ele.x, 10, 'sets x ' );
    t.equals( ele.x, 15, 'sets y ' );
    t.equals( ele.x, 20, 'sets z ' );

    t.end();

} );

test( 'sets 2d x,y rotation.', function(t){

    t.end();
} );

test( 'sets 2d x,y scale.', function(t){

    t.end();
} );

test( 'sets 2d width,height dimensions.', function(t){
    t.end();

} );



