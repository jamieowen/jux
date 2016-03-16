var test = require( 'tape' );

var Bounds = require( '../src/bounds/Bounds' );

var contains   = require( '../src/bounds/contains' );
var intersects = require( '../src/bounds/intersects' );

test( 'intersect & contains', function( t ){

	var b1 = new Bounds();
	b1.set( 10,10,50,50 );

	var b2 = new Bounds();
	b2.set( 40,40,50,50 );

	var b3 = new Bounds();
	b3.set( 20,20,20,20 );

	var b4 = new Bounds();
	b4.set( 100,100,10,10 );

	t.equals( contains( b2, b1 ) , false, 'does not contain bounds - only intersects.' );
	t.equals( contains( b3, b1 ) , true, 'fully contains bounds' );
	t.equals( contains( b4, b1 ) , false, 'completely outside' );

	t.equals( intersects( b2, b1 ) , true, 'intersects bounds' );
	t.equals( intersects( b3, b1 ) , true, 'fully intersects bounds' );
	t.equals( intersects( b4, b1 ) , false, 'completely outside' );

	t.end();

});