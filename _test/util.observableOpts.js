
var test = require( 'tape' );
var ObservableOpts = require( '../core/util/ObservableOpts' );

test( 'Test Observable Opts', function(){

	var opts = {
		'testKey1': 10,
		'testKey2': 15,
		'testKey3': 'hello',
		'testKey4': 'there'
	};

	var observable = ObservableOpts( opts );

	observable.onChanged.add( function( key ){
		console.log( 'CHANGED :', key );
	});

	console.log( observable );


	console.log( observable._testKey1 );

	console.log( observable.testKey2 );
	console.log( observable.testKey3 );

	observable.testKey1 = 999;
	observable.testKey2 = 'testing';

} );