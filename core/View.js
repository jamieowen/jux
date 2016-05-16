
var Bounds = require( './bounds/Bounds' );
var ObservableOpts = require( './util/ObservableOpts' );

var View = function( layout, config ){

	if( !config ){
		throw new Error( 'Config needs specifying' );
	}

	if( !config.pool || !config.adaptor || !config.container ){
		throw new Error( 'Missing configuration arguments for View.' );
	}

	this.needsUpdate = true;

	this.layout 	 = layout;
	this.container   = config.container;
	this.adaptor 	 = config.adaptor;
	this.pool		 = config.pool;


	if( this.layout ){

		this.layout.onLayoutUpdated.add( function(){
			console.log( 'LAYOUT UPDATED' );
			this.needsUpdate = true;
			this.layoutHasChanged = true;
		}.bind(this));

	}


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

			var rendererAdaptor = this.adaptor;
			var layoutAdaptor;
			var container = this.container;

			if( this.layout ){
				this.layout.find( helperViewport, this.results );
				layoutAdaptor = this.layout.adaptor;
			}

			//var lastLength = this.results.length;

			while( this.results.length ){

				layoutItem = this.results.shift();
				data = layoutAdaptor.data_get( layoutItem );

				// create renderer and position.
				layoutAdaptor.position_get( layoutItem, helperPoint );
				layoutAdaptor.size_get( layoutItem, helperSize );

				renderer = this.pool.get( layoutItem );
				rendererAdaptor.data_set( renderer, data );
				rendererAdaptor.position_set( renderer,
					helperPoint.x - helperViewport.x - this.margin.left,
					helperPoint.y - helperViewport.y - this.margin.top
				);
				rendererAdaptor.size_set( renderer, helperSize.width, helperSize.height );

				// check if the renderer has already been added.
				// if it has remove it from previousData
				// it will be removed from container below.

				previousIdx = previousData.indexOf( layoutItem );

				if( previousIdx >= 0 ){
					previousData.splice( previousIdx,1 );
				}else{
					rendererAdaptor.child_add( container, renderer );
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

				rendererAdaptor.data_set( renderer,null );
				rendererAdaptor.child_remove( container, renderer );

			}

		}

	}

};