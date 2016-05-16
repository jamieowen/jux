
var objectAssign  = require( 'object-assign' );

var Layout 		  = require( '@jux/core/Layout' );
var RendererProxy = require( '@jux/core/RendererProxy' );
var RendererPool  = require( '@jux/core/RendererPool' );
var AxisIndex	  = require( '../indexing/AxisIndex' );

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
		proxy: new RendererProxy(),
		pool: new RendererPool()
	};

	data = data || [];

	Layout.call( this, data, opts, config,

		function layout( i, data, obj, prevObj, proxy, opts ){

			var col = i % opts.gridWidth;
			var row = Math.floor( i / opts.gridWidth );

			proxy.position_set( obj,
				opts.itemWidth * col + ( col * opts.itemSpacing ),
				opts.itemHeight * row + ( row * opts.itemSpacing ) );

			proxy.size_set( obj, opts.itemWidth, opts.itemHeight )

		}

	)

};

VerticalGridLayout.prototype = Object.create( Layout.prototype );
VerticalGridLayout.prototype.constructor = VerticalGridLayout;

module.exports = VerticalGridLayout;