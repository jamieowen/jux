
var objectAssign  = require( 'object-assign' );

var Layout 		  = require( '@jux/core/Layout' );
var BinarySearch  = require( '@jux/core/indexing/BinarySearch' );
var RendererProxy = require( '@jux/core/RendererProxy' );

var defaultOpts = {
	itemWidth: 100,
	itemHeight: 88,
	itemSpacing: 1
};

var VerticalLayout = function( data, opts, config ){

	objectAssign( opts, defaultOpts );
	objectAssign( config || {}, { axis: 'y'} );

	config.indexer = config.indexer || new BinarySearch();
	config.proxy   = config.proxy || new RendererProxy();

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