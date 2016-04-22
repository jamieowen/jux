
var Bounds = require( './bounds/Bounds' );
var ObservableOpts = require( './util/ObservableOpts' );

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

	this.margin = new ObservableOpts( {
		left: 0,
		top: 0,
		right: 0,
		bottom: 0
	} );

	this.margin.onChanged.add( function(){
		this.needsUpdate = true;
	}.bind(this) );

	this.visibleData 	  = [];
	this.visibleRenderers = [];
	this.results 		  = [];
};

var helperPoint 	= { x: 0, y: 0 };
var helperSize  	= { width: 0, height: 0 };
var helperViewport  = new Bounds();

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

			this.visibleRenderers.splice(0);
			var previousData = this.visibleData.splice(0);

			helperViewport.x = this._viewport.x - this.margin.left;
			helperViewport.y = this._viewport.y - this.margin.top;

			helperViewport.width = this._viewport.width + this.margin.right + this.margin.left;
			helperViewport.height = this._viewport.height + this.margin.bottom + this.margin.top;

			this.layout.find( helperViewport, this.results );

			var renderer,layoutItem,data,previousIdx;

			var layoutProxy = this.layout.proxy;
			var rendererProxy = this.proxy;
			var container = this.container;

			//var lastLength = this.results.length;


			while( this.results.length ){

				layoutItem = this.results.shift();
				data = layoutProxy.data_get( layoutItem );

				// create renderer and position.
				layoutProxy.position_get( layoutItem, helperPoint );
				layoutProxy.size_get( layoutItem, helperSize );

				renderer = this.pool.get( layoutItem );
				rendererProxy.data_set( renderer, data );
				rendererProxy.position_set( renderer,
					helperPoint.x - helperViewport.x - this.margin.left,
					helperPoint.y - helperViewport.y - this.margin.top
				);
				rendererProxy.size_set( renderer, helperSize.width, helperSize.height );

				// check if the renderer has already been added.
				// if it has remove it from previousData
				// it will be removed from container below.

				previousIdx = previousData.indexOf( layoutItem );

				if( previousIdx >= 0 ){
					previousData.splice( previousIdx,1 );
				}else{
					rendererProxy.child_add( container, renderer );
				}

				this.visibleData.push( layoutItem );
				this.visibleRenderers.push( renderer );

			}

			//console.log( 'update view' );
			//console.log( 'UPDATE :', lastLength, this.visibleData.length, previousData.length );

			// remove old renderers.
			for( var i = 0; i<previousData.length; i++ ){

				layoutItem = previousData[i];
				renderer = this.pool.release( layoutItem );
				rendererProxy.data_set( renderer,null );
				rendererProxy.child_remove( container, renderer );

			}

		}

	}

};