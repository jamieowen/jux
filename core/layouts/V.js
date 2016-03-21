
var objectAssign  = require( 'object-assign' );

var Layout 		  = require( '@jux/core/Layout' );
var BinarySearch  = require( '@jux/core/indexing/BinarySearch' );
var RendererProxy = require( '@jux/core/RendererProxy' );

var config = {
	axis: 'y',
	indexer: BinarySearch,
	proxy: RendererProxy
};

var defaultOpts = {
	itemWidth: 100,
	itemHeight: 88,
	itemSpacing: 1
};

var VerticalLayout = function( data, opts ){

	objectAssign( opts, defaultOpts );

	Layout.call( data, config, opts,
		function( i, data, obj, prevObj, proxy, opts ){

			proxy.position_set( 0, opts.itemHeight * i + ( i * opts.itemSpacing ) );
			proxy.size_set( opts.itemWidth, opts.itemHeight )

		}
	)

};

VerticalLayout.prototype = Object.create( Layout.prototype );
VerticalLayout.prototype.constructor = VerticalLayout;

module.exports = VerticalLayout;