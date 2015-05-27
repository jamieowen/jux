
var test      = require( 'tape' );
var Attribute = require( '../Attribute' );


test( 'get/set values x,y,z', function(t)
{
    var a = new Attribute();

    t.equal( a.x, 0, 'check x at startup' );
    t.equal( a.y, 0, 'check y at startup' );
    t.equal( a.z, 0, 'check z at startup' );

    a.x = 10;
    a.y = 100.5;
    a.z = 199;

    t.equal( a.x, 10, 'check x set correctly' );
    t.equal( a.y, 100.5, 'check y set correctly' );
    t.equal( a.z, 199, 'check z set correctly' );

    t.end();
});


test( 'get/set values width,height,depth', function(t)
{
    var a = new Attribute();

    t.equal( a.width, 0, 'check width at startup' );
    t.equal( a.height, 0, 'check height at startup' );
    t.equal( a.depth, 0, 'check depth at startup' );

    a.width = 10.5;
    a.height = 100;
    a.depth = 199.5;

    t.equal( a.width, 10.5, 'check width set correctly' );
    t.equal( a.height, 100, 'check height set correctly' );
    t.equal( a.depth, 199.5, 'check depth set correctly' );

    t.end();
});

test( 'get/set components', function(t)
{
    var a = new Attribute();

    t.equal( a.values[0], 0, 'check values[0] at startup' );
    t.equal( a.values[1], 0, 'check values[1] at startup' );
    t.equal( a.values[2], 0, 'check values[2] at startup' );

    a.values[0] = 5;
    a.values[1] = 15;
    a.values[2] = 25;

    t.equal( a.values[0], 5, 'check values[0] set correctly' );
    t.equal( a.values[1], 15, 'check values[1] set correctly' );
    t.equal( a.values[2], 25, 'check values[2] set correctly' );

    t.end();
});


/**test( 'check changed flags ', function(t){
    t.end();
});


test( 'check signals', function(t){
    t.end();
});**/


