
var Bounds = require( './bounds/Bounds' );

var Renderer = function( layout, proxy, container ){


	this._layout 	= layout || null;
	this._proxy 	= proxy || null;
	this._container = container || null;
	this._viewport 	= new Bounds();

	this.needsUpdate = true;

	this.visibleData 	  = [];
	this.visibleRenderers = [];
};

var helperPoint = { x: 0, y: 0 };
var helperSize  = { width: 0, height: 0 };

module.exports = Renderer;

Renderer.prototype = {

	constructor: Renderer,

	viewport: function( x, y, width, height ){
		
		this._viewport.x = x;
		this._viewport.y = y;
		this._viewport.width = width;
		this._viewport.height = height;

		this.needsUpdate = true;
	},

	render: function(){

		if( this.needsUpdate ){

			this.needsUpdate = false;

			this.visibleData.splice(0);

			var result = this.layout.find( this._viewport, this.visibleData );

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


				this.proxy.size_set( rendeer, size.width, size.height );

			}

			// free up renderers
			for( i = rendererIndex; i<this._rendererPool.length; i++ ){
				renderer = this._rendererPool[i];
				this.proxy.remove( renderer, this.container );
			}

		}

	}

};

Object.defineProperties( Renderer.prototype, {

	layout: {
		get: function(){
			return this._layout
		},
		set: function( layout ){
			if( layout === layout ){
				return;
			}
			this._layout = layout;
			this.needsUpdate = true;
		}
	},

	proxy: {
		get: function(){
			return this._proxy
		},
		set: function( proxy ){
			if( proxy === proxy ){
				return;
			}
			this._proxy = proxy;
			this.needsUpdate = true;
		}
	},	

	viewport: {
		get: function(){
			return this._viewport
		}
	}	
});