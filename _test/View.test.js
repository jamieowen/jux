
var test 	 = require( 'tape' );

var Proxy	 = require( '../core/bounds/BoundsProxy' );
var Layout 	 = require( '../core/Layout' );
var View 	 = require( '../core/View' );


test( 'Renderer', function( t ){

	var data = [0,1,2,3,4,5,6,7,8,9];
	var layout = new Layout( data, {
		layoutOpts:{
			itemWidth: 100,
			itemHeight: 100,
			itemSpacing: 0
		}
	});

	layout.update();

	var proxy = new Proxy(); // use fake bounds proxy for testing.
	var renderer = new View( layout, proxy, null );

	//console.log( proxy );

	// TODO :
	/**
	proxy.extend( {

		create: function( data ){

		},
		data_set: function( object, data ){

		},
		add:function( container, object ){

		},
		remove: function( container, object ){

		},
		position_set: function( object, x, y ){

		},
		size_set: function( object, width, height ){

		}
	});**/

	t.end();

});