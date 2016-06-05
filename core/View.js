
var Bounds = require( './bounds/Bounds' );
var ObservableOpts = require( './util/ObservableOpts' );

var View = function( layout, config ){

	if( !config ){
		throw new Error( 'Config needs specifying' );
	}

	if( !config.pool || !config.adapter || !config.container ){
		throw new Error( 'Missing configuration arguments for View.' );
	}

	this.needsUpdate = true;

	this.layout 	 = layout;
	this.container   = config.container;
	this.adapter 	 = config.adapter;
	this.pool		 = config.pool;

	//console.log( 'CREATE VIEW', this.adapter, this.layout );

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

	if( this.layout ){

		this.layout.onLayoutUpdated.add( function( key ){

			this.needsUpdate = true;

			this.layoutDataChanged = true;

			// Do we trigger a clean up of previous renderers here?

		}.bind(this) );

	}
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

	position: function( x, y ){

		this._viewport.x = x;
		this._viewport.y = y;

		this.needsUpdate = true;

	},

	size: function( w, h ){

		this._viewport.width = w;
		this._viewport.height = h;

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

			var renderer,layoutItem,data,previousIdx;

			var rendererAdapter = this.adapter;
			var layoutAdapter;
			var container = this.container;

			if( this.layout ){
				this.layout.find( helperViewport, this.results );
				layoutAdapter = this.layout.adapter;
			}

			//var lastLength = this.results.length;

			//console.log( 'VIEW RENDER:', rendererAdapter, this.pool );
			while( this.results.length ){

				layoutItem = this.results.shift();
				data = layoutAdapter.data_get( layoutItem );

				// create renderer and position.
				layoutAdapter.position_get( layoutItem, helperPoint );
				layoutAdapter.size_get( layoutItem, helperSize );

				renderer = this.pool.get( layoutItem );

				// TODO :
				// Best order and document.. ( set : data, add, position, size )
				// TODO : don't reset the data again.
				rendererAdapter.data_set( renderer, data );

				// check if the renderer has already been added.
				// if it has remove it from previousData
				// it will be removed from container below.

				previousIdx = previousData.indexOf( layoutItem );

				if( previousIdx >= 0 ){
					previousData.splice( previousIdx,1 );
				}else{
					rendererAdapter.child_add( container, renderer );
				}

				rendererAdapter.position_set( renderer,
					helperPoint.x - helperViewport.x - this.margin.left,
					helperPoint.y - helperViewport.y - this.margin.top
				);
				rendererAdapter.size_set( renderer, helperSize.width, helperSize.height );

				this.visibleData.push( layoutItem ); // TODO : and this should be data objects..
				this.visibleRenderers.push( renderer );

			}

			//console.log( 'update view' );
			//console.log( 'UPDATE :', lastLength, this.visibleData.length, previousData.length );


			// remove old renderers.
			for( var i = 0; i<previousData.length; i++ ){

				layoutItem = previousData[i];
				renderer = this.pool.release( layoutItem );

				rendererAdapter.data_set( renderer,null );
				rendererAdapter.child_remove( container, renderer );

			}

		}

	}

};