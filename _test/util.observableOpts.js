
var test = require( 'tape' );
var ObservableOpts = require( '../core/util/ObservableOpts' );

test( 'Test Observable Opts', function( t ){

	var observable = ObservableOpts( {
		'testKey1': 10,
		'testKey2': 15,
		'testKey3': 'hello',
		'testKey4': 'there'
	} );

	var changed = [];

	observable.onChanged.add( function( key ){
		changed.push( key );
	});

	t.equals( observable.testKey1, 10 );
	t.equals( observable.testKey2, 15 );
	t.equals( observable.testKey3, 'hello' );
	t.equals( observable.testKey4, 'there' );

	observable.testKey1 = 99;
	observable.testKey2 = 100;
	observable.testKey3 = 'changed';
	observable.testKey4 = 'me';

	t.equals( observable.testKey1, 99 );
	t.equals( observable.testKey2, 100 );
	t.equals( observable.testKey3, 'changed' );
	t.equals( observable.testKey4, 'me' );

	t.deepEquals( changed, [ 'testKey1', 'testKey2', 'testKey3', 'testKey4'], 'Test events dispatched' );

	// should share the same keys and use the same underlying class.

	var observable2 = ObservableOpts( {
		'testKey1': 55,
		'testKey2': 66,
		'testKey3': 'value1',
		'testKey4': 'value2'
	} );

	t.equals( observable.constructor === observable2.constructor, true, 'Class used is the same due to key naming' );

	var different = ObservableOpts( {
		'different': 10
	});

	t.equals( different.constructor !== observable2.constructor, true, 'Class used is not the same due to key naming' );

	t.end();

} );