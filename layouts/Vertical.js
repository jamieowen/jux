
var objectAssign  = require( 'object-assign' );

var Layout 		  = require( '@jux/core/Layout' );
var BinarySearch  = require( '@jux/core/indexing/BinarySearch' );
var RendererProxy = require( '@jux/core/RendererProxy' );
var RendererPool  = require( '@jux/core/RendererPool' );

var defaultOpts = {
	itemWidth: 100,
	itemHeight: 88,
	itemSpacing: 1
};

var VerticalLayout = function( data, opts ){

	objectAssign( opts, defaultOpts );

	var config = {
		axis: 'y',
		indexer: new BinarySearch(),
		proxy: new RendererProxy(),
		pool: new RendererPool()
	};

	Layout.call( this, data, opts, config,
		function layout( i, data, obj, prevObj, proxy, opts ){

			proxy.position_set( 0, opts.itemHeight * i + ( i * opts.itemSpacing ) );
			proxy.size_set( opts.itemWidth, opts.itemHeight )

		}
	)

};

VerticalLayout.prototype = Object.create( Layout.prototype );
VerticalLayout.prototype.constructor = VerticalLayout;

module.exports = VerticalLayout;