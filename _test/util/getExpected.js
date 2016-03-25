
// build a list of expected values for a layout method
// just to test things are running through the Layout class correctly.

// could poss not require this and create custom..
var RendererProxy = require( '../../core/RendererProxy' );
var RendererPool  = require( '../../core/RendererPool' );

var getExpected = function( layout, dataItems ){

	var defaultOpts = layout.opts;

	if( !defaultOpts ){
		throw Error( 'No default opts defined on layout method.' );
	}

	var proxy = new RendererProxy();
	var pool  = new RendererPool();

	var data = [];
	var sizes = [];
	var positions = [];

	var prevObj = null;
	var obj, dat;
	var point = {};
	var bounds = {};

	for( var i = 0; i<dataItems.length; i++ ){

		dat = dataItems[i];
		obj = pool.create();

		layout.layout( i, dat, obj, prevObj, proxy, defaultOpts );

		proxy.position_get( obj, point );
		proxy.size_get( obj, bounds );

		data.push( dat );
		positions.push( point.x, point.y );
		sizes.push( bounds.width, bounds.height );

		prevObj = obj;
	}

	return {
		data: data,
		positions: positions,
		sizes: sizes
	}

};

module.exports = getExpected;