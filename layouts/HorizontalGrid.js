
var objectAssign  = require( 'object-assign' );

var Layout 		  = require( '@jux/core/Layout' );
var RendererProxy = require( '@jux/core/RendererProxy' );
var RendererPool  = require( '@jux/core/RendererPool' );
var AxisIndex	  = require( '../indexing/AxisIndex' );

var defaultOpts = {

	gridHeight: 3,
	itemWidth: 100,
	itemHeight: 20,
	itemSpacing: 1

};

var HorizontalGridLayout = function( data, opts ){

	opts = objectAssign( {}, defaultOpts, opts );

	var config = {
		axis: 'x',
		indexer: new AxisIndex(),
		proxy: new RendererProxy(),
		pool: new RendererPool()
	};

	data = data || [];

	Layout.call( this, data, opts, config,

		function layout( i, data, obj, prevObj, proxy, opts ){

			var col = Math.floor( i / opts.gridHeight );
			var row = i % opts.gridHeight;

			proxy.position_set( obj,
				opts.itemWidth * col + ( col * opts.itemSpacing ),
				opts.itemHeight * row + ( row * opts.itemSpacing ) );

			proxy.size_set( obj, opts.itemWidth, opts.itemHeight )

		}

	)

};

HorizontalGridLayout.prototype = Object.create( Layout.prototype );
HorizontalGridLayout.prototype.constructor = HorizontalGridLayout;

module.exports = HorizontalGridLayout;