
var objectAssign  = require( 'object-assign' );

var Layout = require( '../core/Layout' );
var Adapter = require( '../core/Adapter' );
var Pool  = require( '../core/Pool' );
var AxisIndex = require( '../indexing/AxisIndex' );

var defaultOpts = {

	gridWidth: 3,
	itemWidth: 100,
	itemHeight: 20,
	itemSpacing: 1

};

var VerticalGridLayout = function( data, opts ){

	opts = objectAssign( {}, defaultOpts, opts );

	var config = {
		axis: 'y',
		indexer: new AxisIndex(),
		adapter: new Adapter(),
		pool: new Pool()
	};

	data = data || [];

	Layout.call( this, data, opts, config,

		function layout( i, data, obj, prevObj, adapter, opts ){

			var col = i % opts.gridWidth;
			var row = Math.floor( i / opts.gridWidth );

			adapter.position_set( obj,
				opts.itemWidth * col + ( col * opts.itemSpacing ),
				opts.itemHeight * row + ( row * opts.itemSpacing ) );

			adapter.size_set( obj, opts.itemWidth, opts.itemHeight )

		}

	)

};

VerticalGridLayout.prototype = Object.create( Layout.prototype );
VerticalGridLayout.prototype.constructor = VerticalGridLayout;

module.exports = VerticalGridLayout;