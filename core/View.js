
var Bounds = require( './bounds/Bounds' );

var View = function( layout, config ){

	if( !layout || !config ){
		throw new Error( 'All arguments for Views must be specified' );
	}

	if( !config.pool || !config.proxy || !config.container ){
		throw new Error( 'Missing configuration arguments for View.' );
	}

	this.needsUpdate = true;

	this.layout 	 = layout;
	this.container   = config.container;
	this.proxy 		 = config.proxy;
	this.pool		 = config.pool;

	this._viewport	 = new Bounds();

	this.margin = {
		left: 0,
		top: 0,
		right: 0,
		bottom: 0
	};

	this.visibleData 	  = [];
	this.visibleRenderers = [];
};

var helperPoint = { x: 0, y: 0 };
var helperSize  = { width: 0, height: 0 };

module.exports = View;

View.prototype = {

	constructor: View,

	viewport: function( x, y, width, height ){
		
		this._viewport.x = x;
		this._viewport.y = y;
		this._viewport.width = width;
		this._viewport.height = height;

		this.needsUpdate = true;
	},

	update: function(){

		if( this.needsUpdate ){

			this.needsUpdate = false;

			this.visibleData.splice(0);
			this.layout.find( this._viewport, this.visibleData );

			var renderer,layoutItem,data;

			var layoutProxy = this.layout.proxy;
			var rendererProxy = this.proxy;
			var container = this.container;

			for( var i = 0; i<this.visibleData.length; i++ ){

				layoutItem = this.visibleData[i];

				data = layoutProxy.data_get( layoutItem );
				layoutProxy.position_get( layoutItem, helperPoint );
				layoutProxy.size_get( layoutItem, helperSize );

				renderer = this.pool.get(data);
				rendererProxy.data_set( renderer, data );
				rendererProxy.position_set( renderer, helperPoint.x, helperPoint.y );
				rendererProxy.size_set( renderer, helperSize.width, helperSize.height );

				rendererProxy.child_add( container, renderer );

			}
			/**
			var newIdx = result.idx;
			// adjust creation index base on index returned from find() method.

			var rendererIndex = 0;
			var data,renderer;

			for( var i = 0; i<this.visibleData.length; i++ ){

				data = this.visibleData[i];

				if( this.layout._dataIsRenderer ){
					renderer = data;
				}else{
					renderer = this._proxy.create( data );

					// layout find should return startIndex as well as data items?
					// this way we can auto  pool renderers when they change.

					renderer = this._rendererPool[rendererIndex];
					if( !renderer ){
						renderer = this.proxy.create( data );
						this._rendererPool.push( renderer );
					}

					this.proxy.data_set( renderer, data );
				}

				this.proxy.add( renderer, this.container );

				this._layout._proxy.position_get( data, helperPoint );
				this._layout._proxy.size_get( data, helperSize );

				helperPoint.x -= this._viewport.x;
				helperPoint.y -= this._viewport.y;

				// should probably change proxy set to use an object.
				this.proxy.position_set( renderer, helperPoint.x, helperPoint.y );


				this.proxy.size_set( renderer, size.width, size.height );

			}

			// free up renderers
			for( i = rendererIndex; i<this._rendererPool.length; i++ ){
				renderer = this._rendererPool[i];
				this.proxy.remove( renderer, this.container );
			}**/

		}

	}

};