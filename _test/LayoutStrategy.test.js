
var test 			= require( 'tape' );
var LayoutStrategy 	= require( '../core/LayoutStrategy' );

test( 'Layout Strategy Construction', function( t ){

	var TestLayout = LayoutStrategy( 'Test', 'y', {

			testProperty1: 10,
			testProperty2: 20,
			testProperty3: 'test'

		},
		function layout( i, data, obj, prevObject, proxy ){

			console.log( 'HELLLO:', this );

		});

	var testLayout = new TestLayout();
	testLayout.onChanged.add( function( key ){
		console.log( 'CHANGED : ', key );
	});

	console.log( 'VALUE : ' );
	console.log( testLayout.testProperty1 );
	console.log( testLayout.testProperty2 );

	testLayout.testProperty1 = 99;


	testLayout.triggerChange();

	t.end();
});