
var test = require( 'tape' );

var verticalLayout	= require( './fixtures/verticalLayout' );
var getExpected 	= require( './util/getExpected' );
var getActual 		= require( './util/getActual' );



test( 'Layout Vertical.', function( t ){

	var data = require( './fixtures/data' )();

	// Test layout
	var layout = verticalLayout();

	var w = layout.opts.itemWidth;
	var h = layout.opts.itemHeight;
	var s = layout.opts.itemSpacing;

	// Prepare expected results
	var expected = getExpected( layout, data );
	var expectedBounds = [
		0,0,w, ( data.length * h ) + ( s * (data.length-1) )
	];

	// Update & Test.

	t.equals( layout.needsLayoutUpdate, true, 'Layout is invalidated.' );
	layout.update();
	t.equals( layout.needsLayoutUpdate, false, 'Layout is validated.' );

	var b = layout.bounds;
	t.deepEquals( [b.x, b.y, b.width, b.height], expectedBounds, 'Layout bounds are set.' );
	t.equals( layout.objects.length, data.length, 'Layout objects are correct length.' );

	var actual = getActual( layout );

	t.deepEquals( actual.data, expected.data, 'Layout data is set.' );
	t.deepEquals( actual.positions, expected.positions, 'Layout positions are set.' );
	t.deepEquals( actual.sizes, expected.sizes, 'Layout sizes are set.' );

	t.end();
} );